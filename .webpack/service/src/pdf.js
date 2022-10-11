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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chrome-aws-lambda */ \"chrome-aws-lambda\");\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/lib/styles.js\");\n\n\n\n/**\n  @param {{\n    url: string,\n    footerText?: string,\n    cookies?: Array,\n    jwt?: string\n    waitForFormio?: boolean\n }} options\n*/\nconst pdf = async ({\n  url,\n  footerText,\n  cookies = [],\n  jwt = '',\n  waitForFormio = false,\n}) => {\n  const executablePath = process.env.IS_OFFLINE ? null : await chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default.a.executablePath;\n\n  console.time('PAGETIME');\n\n  const browser = await chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default.a.puppeteer.launch({\n    headless: true,\n    args: chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default.a.args,\n    defaultViewport: chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default.a.defaultViewport,\n    executablePath,\n    ignoreHTTPSErrors: true,\n  });\n\n  try {\n    // create isolated browser that doesnt share cookies etc\n    // const context = await browser.createIncognitoBrowserContext();\n\n    console.log('BROWSER LOADED');\n    console.timeLog('PAGETIME');\n\n    const host = new URL(url).hostname;\n    const page = await browser.newPage();\n\n    if (jwt) {\n      await page.setCookie({\n        name: 'pmcv-rememberme',\n        value: jwt,\n        domain: host,\n      });\n    }\n\n    // await page.setRequestInterception(true);\n    // await page.setCacheEnabled(false);\n\n    await page.setUserAgent(\n      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',\n    );\n\n    page\n      // .on('request', (interceptedRequest) => {\n    // if (\n    //   (interceptedRequest.url().endsWith('.png') ||\n    // interceptedRequest.url().endsWith('.jpg'))\n    //   || interceptedRequest.url().includes('hotjar')\n    //   || interceptedRequest.url().includes('google')\n    // ) {\n    //   interceptedRequest.abort();\n    // } else {\n    //   interceptedRequest.continue();\n    // }\n      // })\n      .on('error', () => console.log('ERROR'))\n      .on('disconnected', () => console.log('DISCONNECTED'))\n      .on('pageerror', ({ message }) => console.log(message))\n      .on('requestfailed', async (request) => {\n        console.log(`${request.failure().errorText} ${request.url()}`);\n      });\n\n    await page\n      .goto(url, {\n        timeout: 15000,\n      })\n      .catch(async (e) => {\n        console.log('PAGE ERROR CATCH', e.message);\n\n        await browser.close();\n        console.time('PAGETIME');\n\n        throw new Error('failed');\n      });\n\n    await page.emulateMediaType('screen');\n\n    // if (waitForFormio) {\n    await page.waitForSelector('.formio-form .form-group', {\n      visible: true,\n    });\n\n    await page.waitFor(500);\n    // } else {\n    // await page.waitForNavigation({\n    //   waitUntil: 'networkidle0',\n    // });\n    // }\n\n    console.log('PAGE LOADED');\n    console.timeLog('PAGETIME');\n\n    if (cookies && cookies.length) {\n      const cookieArr = Object.keys(cookies).map((key) => {\n        const value = cookies[key];\n\n        return {\n          name: key,\n          value,\n          domain: host,\n        };\n      });\n\n      await page.setCookie(...cookieArr);\n    }\n\n    await page.$eval('body', (element) => element.classList.add('pdf-view'));\n    await page.addStyleTag({\n      content: _styles__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    });\n\n    console.log('START PDF');\n\n    const stream = await page.pdf({\n      format: 'A4',\n      margin: {\n        top: '50px',\n        left: '50px',\n        bottom: '50px',\n        right: '50px',\n      },\n      displayHeaderFooter: true,\n      headerTemplate: '<div/>',\n      footerTemplate: `<div style=\"font-size: 10px; font-family: arial; text-align: right; margin-right: 20px; width: 100%\"><span style=\"margin-right:40px;\">${\n        footerText || ''\n      }</span>Page <span class=\"pageNumber\"></span>/<span class=\"totalPages\"></span></div>`,\n    });\n\n    console.log('END PDF');\n    console.timeEnd('PAGETIME');\n\n    await browser.close();\n\n    return stream;\n  } catch (error) {\n    console.log('CRASHED', error);\n    console.timeEnd('PAGETIME');\n\n    await browser.close();\n\n    throw new Error('failed');\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (pdf);\n\n\n//# sourceURL=webpack:///./src/lib/pdf.js?");

/***/ }),

/***/ "./src/lib/styles.js":
/*!***************************!*\
  !*** ./src/lib/styles.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (`\n.pdf-visible { display: block; }\n.pmcv-page-white-bg { padding-top: 0; border: none !important; }\n\n.pmcv-box {\n  border: none!important;\n  padding: 0;\n  margin-bottom: 20px;\n}\n\n.pmcv-header-container, \n.pmcv-footer-container,\ndiv.relative-position,\n.pmcv-admin-header,\n.pmcv-service-header,\n.pmcv-header,\n#pmcv-global-nav,\n.global-footer { display: none; }\n\n.pmcv-font-section-heading { font-size: 18px !important; }\n.pmcv-section-title h4 { display: none; }\n\n.pmcv-notice,\n#_hj_feedback_container { \n  display: none!important;\n}\n\n.form-group.formio-component {\n  font-size: 12px;\n  line-height: normal;\n  margin-bottom: 15px;\n  padding: 0;\n}\n\n#candidate-cv-eligibility .ant-radio-wrapper-checked {\n  margin: 0;\n}\n\n#candidate-cv-referees .ant-row.mt-lg-2 {\n  margin: 0;\n}\n\n.pmcv-candidate-referees .ant-table-tbody .ant-tag.pmcv-tag { padding: 0; }\n.pmcv-candidate-referees .title-container span { font-size: 12px; }\n\n.ant-descriptions { border: none; padding: 0; }\n.ant-result-success { display: none; }\n.ant-form-item * {\n  line-height: normal;\n}\n\n.ant-form-item .ant-input.pmcv-input {\n  color: #002268;\n  font-size: 12px;\n  font-weight: 400;\n  font-style: normal;\n  line-height: normal;\n  padding: 0;\n  height: unset !important;\n  min-height: unset !important;\n}\n\n.ant-input[disabled] {\n  border: none!important;\n  background: none!important;\n  padding: 0!important;\n}\n\n.ant-input::placeholder {\n  opacity: 0;\n}\n\nlabel.pmcv-radio.ant-radio-wrapper { display: none; }\nlabel.pmcv-radio.ant-radio-wrapper.ant-radio-wrapper-checked {\n  display: flex;\n}\nlabel.pmcv-radio.ant-radio-wrapper .ant-radio + * {\n  font-size: 12px;\n  line-height: normal;\n  padding: 0;\n}\nspan.ant-radio.ant-radio-checked { display: none; }\n\n.pmcv-note,\n.pmcv-candidate-referees .ant-table-thead th:nth-child(n+3),\n.pmcv-candidate-referees .ant-table-tbody td:nth-child(n+3),\n.pmcv-candidate-referees .ant-table-body col:nth-last-child(-n+2), \n.formio-component-submit,\n.formio-component-datagrid label:first-child,\n.formio-component-name_title,\n.formio-component-first_name,\n.formio-component-last_name,\n.formio-component-preferred_name,\n.formio-component-residentialAddressManual,\n.formio-component-gender,\n.formio-component-dob,\n.formio-component-phone_number,\n.formio-component-file.formio-component-photo,\n.formio-component-referee_submit, \n.formio-component-referee_declaration,\n.glyphicon-question-sign,\n.help-block {\n  display: none !important;\n}\n\n.formio-component-photo { margin-bottom: 40px; }\n.formio-component-fieldset { margin-top: 0; }\n.formio-component-fieldset legend { font-size: 18px; }\n\n.formio-component-content {\n  color: #002268;\n  font-size: 8px;\n  font-weight: 400;\n  margin-bottom: 15px;\n  padding: 0;\n}\n\n.card-body .formio-component p, \n.formio-component-htmlelement { \n  color: #002268;\n  font-size: 12px;\n}\n\n.form-group {\n  -webkit-print-color-adjust: exact;\n  font-size: 12px;\n  line-height: normal;\n  margin: 0;\n  padding: 0;\n}\n.form-group .control-label {\n  color: #002268;\n  font-size: 12px;\n  margin-bottom: 0;\n}\n.form-group .control-label.field-required::after { display: none; }\n\n.form-group .choices__list { padding: 0; }\n.form-group .choices__item { height: unset; }\n\n.form-check.checkbox > label {\n  display: block;\n}\n.form-check.radio {\n  line-height: 3px;\n  height: auto !important;\n  margin: 0;\n}\n.form-check span,\n.form-check.radio span {\n  color: #002268;\n  line-height: normal;\n}\n\n.form-group .checkbox label,\n.form-group .radio label,\n.form-group .form-check-label {\n  padding-left: 0;\n}\n\n.form-check-input:not(:checked),\n.form-check-input:not(:checked) + span, \n.referees-placeholder {\n  display: none;\n  height: 0;\n}\n\n.formio-component .form-check span,\nlabel.control-label.form-check-label {\n  color: #002268;\n  font-size: 12px;\n  margin-bottom: 0;\n  padding: 0!important;\n}\n\nlabel.control-label.form-check-label {\n  min-height: 0;\n  padding-left: 0;\n}\n\n.list-group-item:first-child,\n.list-group-item:last-child,\n.table-bordered>tbody>tr>td,\n.table-bordered>tbody>tr>th,\n.table-bordered,\n.table-bordered>tfoot>tr>td,\n.table-bordered>tfoot>tr>th,\n.table-bordered>thead>tr>td,\n.table-bordered>thead>tr>th {\n  border: 0;\n}\n\n.formio-component-datagrid table.datagrid-table thead { color: #002268; font-size: 12px; }\n.formio-component-datagrid table.datagrid-table tbody .pmcv-dg-readonly { color: #002268; margin: 0; }\n\n.datagrid-table.table>tbody>tr>td,\n.datagrid-table.table>tbody>tr>th,\n.datagrid-table.table>tfoot>tr>td,\n.datagrid-table.table>tfoot>tr>th,\n.datagrid-table.table>thead>tr>td,\n.datagrid-table.table>thead>tr>th {\n  padding: 0 4px 4px 0;\n}\n\n.formio-component-textarea div.well {\n  color: #002268;\n  font-size: 12px;\n  background: none;\n  border: none;\n  min-height: unset;\n  margin: 0;\n  padding: 0;\n  box-shadow: none;\n}\n\n.table>caption+thead>tr:first-child>td,\n.table>caption+thead>tr:first-child>th,\n.table>colgroup+thead>tr:first-child>td,\n.table>colgroup+thead>tr:first-child>th,\n.table>thead:first-child>tr:first-child>td,\n.table>thead:first-child>tr:first-child>th {\n  border-top: none;\n  min-width: 120px;\n}\n`);\n\n\n//# sourceURL=webpack:///./src/lib/styles.js?");

/***/ }),

/***/ "./src/pdf.js":
/*!********************!*\
  !*** ./src/pdf.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_pdf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/pdf */ \"./src/lib/pdf.js\");\n\n\nconst handler = async (event, context) => {\n  context.callbackWaitsForEmptyEventLoop = false;\n\n  try {\n    const {\n      url,\n      footerText,\n      jwt,\n      waitForFormio,\n    } = event.queryStringParameters;\n\n    const stream = await Object(_lib_pdf__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n      url, footerText, jwt, waitForFormio,\n    });\n\n    const response = {\n      statusCode: 200,\n      isBase64Encoded: true,\n      headers: {\n        'Content-type': 'application/pdf',\n        'Access-Control-Allow-Origin': '*',\n        'x-header': 'test header',\n      },\n      body: stream.toString('base64'),\n    };\n\n    return context.succeed(response);\n  } catch (error) {\n    console.log('PDF LAMBDA CATCH:', error);\n\n    return context.fail(error);\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (handler);\n\n\n//# sourceURL=webpack:///./src/pdf.js?");

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