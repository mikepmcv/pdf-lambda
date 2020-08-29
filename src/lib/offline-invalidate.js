/* eslint-disable */
// @ts-nocheck
const HandlerRunner = require('serverless-offline/dist/lambda/handler-runner/index').default;

/** Fixes a bug in serverless framework offline where the CLI doesn't auto refresh */
class OfflineInvalidate {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.hooks = {
      'before:offline:start:init': (opts) => this.inject(),
    };
    this.lastRunner = {};
  }

  cacheInvalidation(filePath) {
    if (require.cache[require.resolve(filePath)]) {
      delete require.cache[require.resolve(filePath)];
    }
  }

  findPrivateProperty(obj, propName) {
    const props = Object.getOwnPropertyNames(obj);
    for (const prop of props) {
      if (prop.indexOf(`_${propName}`) > 0) {
        return prop;
      }
    }
    return null;
  }

  inject() {
    const that = this;
    const oldRun = HandlerRunner.prototype.run;
    const run = async function (event, context) {
      const runnerPropName = that.findPrivateProperty(this, 'runner');
      const funOptionsPropName = that.findPrivateProperty(this, 'funOptions');
      if (!runnerPropName || !funOptionsPropName) {
        return oldRun(event, context);
      }

      const runner = this[runnerPropName];
      const funOptions = this[funOptionsPropName];
      const internalRef = funOptions.handlerPath || funOptions.handler;

      if (that.lastRunner[internalRef]) {
        await that.lastRunner[internalRef].cleanup();
      }

      that.cacheInvalidation(internalRef);

      const runnerInstance = this[runnerPropName] = await this._loadRunner();

      that.lastRunner[internalRef] = runnerInstance;

      return runnerInstance.run(event, context);
    };
    HandlerRunner.prototype.run = run;
  }
}

module.exports = OfflineInvalidate;
