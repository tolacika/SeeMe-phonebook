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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

Application = function Application() {};

Application.prototype.initApp = function () {
    $(":input").attr('autocomplete', "off");
};

Application.prototype.post = function (settings, method) {
    var options = {
        url: settings.url,
        type: method || "POST",
        data: settings.data,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function success(response, textStatus, jqXHR) {

            if (response.fn) {
                eval(response.fn);
            }
            if (response.redirect) {
                window.location.href = response.redirect;
            }
            if (typeof settings.callback === 'function') {
                settings.callback(response, textStatus, jqXHR);
            }
        },
        error: function error(jqXHR, textStatus, errorThrown) {
            var response = $.parseJSON(jqXHR.responseText);
            if (response.status === "401") {
                window.location.reload(true);
                return;
            }
            if (response.message) {
                toastr.error(response.message, "Hiba történt!");
            } else {
                toastr.error("Kérem töltse újra a weblapot", "Hiba történt!");
            }
        }
    };
    if (typeof options.data === 'undefined') {
        options.data = {};
    }

    return $.ajax(options);
};

Application.prototype.flashMessage = function (level, message, title) {
    if (level === 'success') {
        toastr.success(message, title);
    }
    if (level === 'warning') {
        toastr.warning(message, title);
    }
    if (level === 'error') {
        toastr.error(message, title);
    }
};

window.app = new Application();

$(document).ready(function () {
    window.app.initApp();
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);