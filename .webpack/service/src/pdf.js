module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pdf.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/lib/pdf.js":
/*!************************!*\
  !*** ./src/lib/pdf.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chrome-aws-lambda */ \"chrome-aws-lambda\");\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/lib/styles.js\");\n\n\n\nasync function wait(ms) {\n  return new Promise((resolve) => {\n    setTimeout(resolve, ms);\n  });\n}\n\nconst pdf = async ({ url, footerText, cookies = [] }) => {\n  try {\n    const executablePath = process.env.IS_OFFLINE ? null : await chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default.a.executablePath;\n\n    const browser = await chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default.a.puppeteer.launch({\n      headless: true,\n      args: chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default.a.args,\n      defaultViewport: chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default.a.defaultViewport,\n      executablePath,\n      ignoreHTTPSErrors: true,\n    });\n\n    // create isolated browser that doesnt share cookies etc\n    // const context = await browser.createIncognitoBrowserContext();\n\n    const host = new URL(url).hostname;\n    const page = await browser.newPage();\n\n    await page.setCacheEnabled(false);\n\n    await page.setUserAgent(\n      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',\n    );\n\n    page\n      .on('console', (message) => console.log(\n        `PUPPETEER_LOG: ${message\n          .type()\n          .substr(0, 3)\n          .toUpperCase()} ${message.text()}`,\n      ))\n      // .on(\"request\", ({ message }) => console.log('REQUEST STARTED'))\n      .on('error', () => console.log('ERROR'))\n      .on('disconnected', () => console.log('DISCONNECTED'))\n      // .on(\"requestfinished\", () => console.log('REQ FINISHED'))\n      .on('pageerror', ({ message }) => console.log(message))\n      // .on(\"response\", response => console.log(`${response.status()} ${response.url()}`))\n      .on('requestfailed', async (request) => {\n        console.log(`${request.failure().errorText} ${request.url()}`);\n\n        // await page.reload();\n      });\n\n    await page\n      .goto(url, {\n        timeout: 15000,\n      })\n      .catch((e) => {\n        console.log(e.message);\n      });\n\n    await page.waitForSelector('.formio-form .form-group', {\n      visible: true,\n    });\n\n    console.log('PAGE LOADED');\n\n    if (cookies && cookies.length) {\n      const cookieArr = Object.keys(cookies).map((key) => {\n        const value = cookies[key];\n\n        return {\n          name: key,\n          value,\n          domain: host,\n        };\n      });\n\n      await page.setCookie(...cookieArr);\n    }\n\n    await wait(400);\n\n    // if (host === 'staging.allocations.pmcv.com.au') {\n    //   await page.setExtraHTTPHeaders({\n    //     authorization: `Basic ${Buffer.from('staging:pmcvstaging').toString('base64')}`,\n    //   });\n    // }\n\n    await page.$eval('body', (element) => element.classList.add('pdf-view'));\n\n    await page.addStyleTag({\n      content: _styles__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    });\n\n    await page.emulateMediaType('screen');\n\n    console.log('START PDF');\n\n    const stream = await page.pdf({\n      format: 'A4',\n      margin: {\n        top: '50px',\n        left: '50px',\n        bottom: '50px',\n        right: '50px',\n      },\n      displayHeaderFooter: true,\n      headerTemplate: '<div/>',\n      footerTemplate: `<div style=\"font-size: 10px; font-family: arial; text-align: right; margin-right: 20px; width: 100%\"><span style=\"margin-right:40px;\">${\n        footerText || ''\n      }</span>Page <span class=\"pageNumber\"></span>/<span class=\"totalPages\"></span></div>`,\n    });\n\n    console.log('END PDF');\n\n    await browser.close();\n\n    return stream;\n  } catch (error) {\n    console.log(error);\n\n    throw new Error('failed');\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (pdf);\n\n\n//# sourceURL=webpack:///./src/lib/pdf.js?");

/***/ }),

/***/ "./src/lib/styles.js":
/*!***************************!*\
  !*** ./src/lib/styles.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (`\n.pdf-visible { display: block; }\n.pmcv-notice { display: none; }\n.ant-descriptions, \n._hj_feedback_container {\n  border: none;\n  padding: 0\n}\n.pdf-logo {\n  width: 100px;\n  margin-bottom: 40px;\n}\n.ant-result-success {\n  display: none;\n}\nlabel.pmcv-radio.ant-radio-wrapper {\n  display: none;\n}\nlabel.pmcv-radio.ant-radio-wrapper.ant-radio-wrapper-checked {\n  display: flex;\n}\nspan.ant-radio.ant-radio-checked {\n  display: none;\n}\n.formio-component-referee_submit, .formio-component-referee_declaration { display: none;}\n.formio-component-photo {margin-bottom: 40px;}\n.ant-result-success { display: none }\n.pmcv-header-container, .pmcv-footer-container { display: none; }\n.form-group {\n  -webkit-print-color-adjust: exact;\n  margin-bottom: 5px;\n}\n.ant-input[disabled] {\n  border: 0!important;\n  background: none!important;\n  padding: 0!important;\n}\n.help-block { display: none!important; }\n.pmcv-box, .pmcv-page-white-bg {\n  border: 0!important;\n}\n.table>caption+thead>tr:first-child>td,\n.table>caption+thead>tr:first-child>th,\n.table>colgroup+thead>tr:first-child>td,\n.table>colgroup+thead>tr:first-child>th,\n.table>thead:first-child>tr:first-child>td,\n.table>thead:first-child>tr:first-child>th {\n  border-top: 0;\n  min-width: 120px;\n}\n.choices__list {\n    padding: 0!important;\n}\n.glyphicon-question-sign, .field-required:after { display: none!important;}\n.formio-component-textarea .well {\nborder: 0;\nbackground: none;\npadding: 10px 0;\n}\n.form-check-input[disabled] {\ndisplay: none;\npadding: 0;\nmargin: 0;\nheight: 0;\n}\n.form-check-input:not(:checked) + span, .referees-placeholder {\ndisplay: none;\nheight: 0;\n}\n.form-check-input + span,\nlabel.control-label.form-check-label {\npadding: 0!important;\nheight: 0!important;\n}\n.form-check.radio {\nheight: auto!important;\nline-height: 3px;\n}\nlabel.control-label.form-check-label {\nmin-height: 0;\n}\n.list-group-item:first-child, .list-group-item:last-child, .table-bordered>tbody>tr>td, .table-bordered>tbody>tr>th, .table-bordered, .table-bordered>tfoot>tr>td, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>thead>tr>th {\nborder: 0;\n}\n`);\n\n//# sourceURL=webpack:///./src/lib/styles.js?");

/***/ }),

/***/ "./src/pdf.js":
/*!********************!*\
  !*** ./src/pdf.js ***!
  \********************/
/*! exports provided: generate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generate\", function() { return generate; });\n/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @middy/core */ \"@middy/core\");\n/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_middy_core__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @middy/do-not-wait-for-empty-event-loop */ \"@middy/do-not-wait-for-empty-event-loop\");\n/* harmony import */ var _middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_pdf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/pdf */ \"./src/lib/pdf.js\");\n\n\n\n\nconst handler = async (event, context) => {\n  try {\n    const { url, footerText } = event.queryStringParameters;\n\n    const stream = await Object(_lib_pdf__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({ url, footerText });\n\n    const response = {\n      statusCode: 200,\n      isBase64Encoded: true,\n      headers: {\n        'Content-type': 'application/pdf',\n        'Access-Control-Allow-Origin': '*',\n      },\n      body: stream.toString('base64'),\n    };\n\n    // context.callbackWaitsForEmptyEventLoop = false;\n\n    return context.succeed(response);\n  } catch (error) {\n    console.log(error);\n\n    return context.fail(error);\n  }\n};\n\n// eslint-disable-next-line import/prefer-default-export\nconst generate = _middy_core__WEBPACK_IMPORTED_MODULE_0___default()(handler).use(_middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_1___default()());\n\n\n//# sourceURL=webpack:///./src/pdf.js?");

/***/ }),

/***/ "@middy/core":
/*!******************************!*\
  !*** external "@middy/core" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@middy/core\");\n\n//# sourceURL=webpack:///external_%22@middy/core%22?");

/***/ }),

/***/ "@middy/do-not-wait-for-empty-event-loop":
/*!**********************************************************!*\
  !*** external "@middy/do-not-wait-for-empty-event-loop" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@middy/do-not-wait-for-empty-event-loop\");\n\n//# sourceURL=webpack:///external_%22@middy/do-not-wait-for-empty-event-loop%22?");

/***/ }),

/***/ "chrome-aws-lambda":
/*!************************************!*\
  !*** external "chrome-aws-lambda" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"chrome-aws-lambda\");\n\n//# sourceURL=webpack:///external_%22chrome-aws-lambda%22?");

/***/ })

/******/ });