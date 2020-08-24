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
/******/ 	return __webpack_require__(__webpack_require__.s = "./functions/pdf.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./functions/pdf.js":
/*!**************************!*\
  !*** ./functions/pdf.js ***!
  \**************************/
/*! exports provided: generate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generate\", function() { return generate; });\n/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @middy/core */ \"@middy/core\");\n/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_middy_core__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chrome-aws-lambda */ \"chrome-aws-lambda\");\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var aws_lambda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aws-lambda */ \"aws-lambda\");\n/* harmony import */ var aws_lambda__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(aws_lambda__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @middy/do-not-wait-for-empty-event-loop */ \"@middy/do-not-wait-for-empty-event-loop\");\n/* harmony import */ var _middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nconst handler = async (event) => {\n  const { url } = event.queryStringParameters;\n  const cookies = event.headers.Cookie.split('; ').reduce((prev, current) => {\n    const [name, value] = current.split('=');\n    prev[name] = value;\n    return prev\n  }, {});\n\n  console.log(url, cookies)\n\n  const executablePath = process.env.IS_OFFLINE\n    ? null\n    : await chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_1___default.a.executablePath;\n    \n  const browser = await chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_1___default.a.puppeteer.launch({\n    headless: true,\n    args: chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_1___default.a.args,\n    defaultViewport: chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_1___default.a.defaultViewport,\n    executablePath\n  });\n  const page = await browser.newPage();\n\n  await page.goto(url, { waitUntil: 'networkidle0' });\n\n  const stream = await page.pdf({\n    format: 'A4',\n    margin: {\n      top: '50px',\n      left: '50px',\n      bottom: '50px',\n      right: '50px',\n    },\n    displayHeaderFooter: true,\n    headerTemplate: '<div/>',\n    footerTemplate: '<div style=\"font-size: 10px; font-family: arial; text-align: right; margin-right: 20px; width: 100%\">Page <span class=\"pageNumber\"></span></div>',\n  });\n\n  return {\n    statusCode: 200,\n    isBase64Encoded: true,\n    headers: {\n      \"Content-type\": \"application/pdf\",\n      'Access-Control-Allow-Origin': '*',\n      'Access-Control-Allow-Credentials': true,\n    },\n    body: stream.toString(\"base64\")\n  };\n};\n\nconst generate = _middy_core__WEBPACK_IMPORTED_MODULE_0___default()(handler).use(_middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_3___default()());\n\n\n//# sourceURL=webpack:///./functions/pdf.js?");

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

/***/ "aws-lambda":
/*!*****************************!*\
  !*** external "aws-lambda" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"aws-lambda\");\n\n//# sourceURL=webpack:///external_%22aws-lambda%22?");

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