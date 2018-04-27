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
module.exports = __webpack_require__(5);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_jquery_isvisible__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_jquery_isvisible___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_jquery_isvisible__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__application__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__application___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__application__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__admin_list__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__admin_list___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__admin_list__);




/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * Created by TothLaci on 2018. 01. 25..
 */

!function ($) {

        /**
         * Reduce the elements to those that are visible(in dimensions) in the browser current viewport
         *
         * @param partial bool [default: true] if true, 1px is enough for the element to detect
         * it as visible(in dimensions), else the all element must be visible(in dimensions)
         *
         * @param vertical bool [default: true] check vertical visibility
         * @param horizontal bool [default: true] check horizontal visibility
         * @param u undefined alias for undefined
         *
         * @returns {*} the filtered elements
         */
        $.fn.isvisible = function (partial, vertical, horizontal, u) {

                // check the length of the elements and the ...:), don't waste time with browsers viewport
                if ($(this).length !== 1 || vertical === false && horizontal === false) {
                        return $(this);
                }

                // browser current viewport
                var windowTop = $(window).scrollTop(),
                    windowBottom = windowTop + window.innerHeight,
                    windowLeft = $(window).scrollLeft(),
                    windowRight = windowLeft + window.innerWidth;

                // partial inspection
                if (partial === u) {
                        partial = true;
                }

                // vertically inspection
                if (vertical === u) {
                        vertical = true;
                }

                // horizontally inspection
                if (horizontal === u) {
                        horizontal = true;
                }

                // element current viewport
                var offsetTop = $(this).offset().top,
                    offsetBottom = offsetTop + $(this).height();
                offsetLeft = $(this).offset().left, offsetRight = offsetLeft + $(this).width();

                // check element is absolute invisible vertically (and|or) horizontally
                if (vertical && (offsetBottom <= windowTop || windowBottom <= offsetTop) || horizontal && (offsetRight <= windowLeft || windowRight <= offsetLeft)) {
                        return false;
                }

                // if element is not absolute invisible, and partial set true then return true
                if (partial) {
                        return true;
                }

                // check element is absolute visible vertically
                if (vertical && !horizontal) {
                        return windowTop <= offsetTop && offsetBottom <= windowBottom;
                }

                // check element is absolute visible horizontally
                if (!vertical && horizontal) {
                        return windowLeft <= offsetLeft && offsetRight <= windowRight;
                }

                // check element is absolute visible vertically and horizontally
                return windowTop <= offsetTop && offsetBottom <= windowBottom && windowLeft <= offsetLeft && offsetRight <= windowRight;
        };
}(jQuery);

/***/ }),
/* 3 */
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

Application.prototype.scroll = function (options) {
    options.name = options.name || 'scroll_name';
    options.bottom = options.bottom || function () {
        return $(document).height();
    };
    $(window).on('scroll.' + options.name, function (eventObject) {
        if (options.bottom() <= window.innerHeight + $(this).scrollTop() + 1) {
            options.callback(eventObject);
        }
    });
};

Application.prototype._getFormData = function ($form) {
    var _this = this,
        data = {};

    if ($form.length === 0) {
        return data;
    }

    $form.find(':input[name]').each(function () {
        var name = $(this).attr('name'),
            type = $(this).attr('type'),
            value = $(this).val();

        if (value && $(this).attr('data-value-important')) {
            value = $(this).attr('data-value-important');
        }

        // type checkbox
        if (type === 'checkbox') {
            if (typeof data[name] === 'undefined') {
                data[name] = [];
            }
            if ($(this).prop('checked')) {
                data[name].push(value);
            }
        }

        // type radio
        else if (type === 'radio') {
                if ($(this).prop('checked')) {
                    data[name] = value;
                }
            }
            // anything else
            else {
                    data[name] = value;
                }
    });

    return data;
};

Function.prototype.extends = function (parentClassOrObject) {
    if (parentClassOrObject.constructor === Function) {
        $.extend(this.prototype, new parentClassOrObject());
    } else {
        $.extend(this.prototype, parentClassOrObject);
    }
    return this;
};
window.app = new Application();

$(document).ready(function () {
    window.app.initApp();
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/**
 * Created by TothLaci on 2018. 01. 25..
 */

// import Application from './application';

window.AdminList = function ($form, $list, $head, $count) {
    var _this = this;

    this.$form = $form;
    this.$list = $list;
    this.__head = $head;
    this._head = [];
    this.$head = [];
    /*
        _this.$form.find(':input[name].datetime').each(function () {
            _this.setLocalDatetimeInput($(this));
        });
          _this.$form.find(':input[name].date').each(function () {
            _this.setLocalDateInput($(this));
        });
    */
    $head.find('[data-elem]').each(function () {
        _this.$head.push($(this));
        _this._head.push('_this.column' + $(this).attr('data-elem'));
    });

    this.initList();
};

AdminList.prototype.$form = null;
AdminList.prototype.$list = null;
AdminList.prototype.$head = null;
AdminList.prototype._head = null;

AdminList.prototype.page = 0;
AdminList.prototype.run = false;

AdminList.prototype.$row = null;
AdminList.prototype.columnEq = null;
AdminList.prototype.$currentHead = null;

AdminList.prototype.initList = function () {
    var _this = this;

    _this.initTableSorts();

    _this.$form.off('submit.search').on('submit.search', function (e) {
        e.preventDefault();
        _this.resetList();
    }).trigger('submit.search');

    _this.scroll({
        name: 'getListAction',
        callback: function callback() {
            _this.searchAction();
        }
    });
};

AdminList.prototype.initTableSorts = function ($head, $search) {

    $head = $head || $('table thead#head');
    $search = $search || $('form#search');

    $head.find('tr th[data-sort]').addClass('sorting');
    if ($head.find('tr th[data-sort].sorting_asc').length === 0 && $head.find('tr th[data-sort].sorting_desc').length === 0) {
        $head.find('tr th[data-sort]:eq(0)').addClass('sorting_asc');
    }

    $head.find('tr th.sorting').off('click.sort').on('click.sort', function () {

        if ($(this).hasClass('sorting_asc')) {
            $head.find('tr th.sorting_asc').removeClass('sorting_asc');
            $head.find('tr th.sorting_desc').removeClass('sorting_desc');
            $(this).addClass('sorting_desc');
        } else if ($(this).hasClass('sorting_desc')) {
            $head.find('tr th.sorting_asc').removeClass('sorting_asc');
            $head.find('tr th.sorting_desc').removeClass('sorting_desc');
            $(this).addClass('sorting_asc');
        } else {
            $head.find('tr th.sorting_asc').removeClass('sorting_asc');
            $head.find('tr th.sorting_desc').removeClass('sorting_desc');
            $(this).addClass('sorting_asc');
        }

        $search.length && $search.trigger('submit');
    });
};

AdminList.prototype.drawListAction = function (response) {
    var _this = this;

    for (var i in response.list) {
        var elem = response.list[i];

        _this.newLine({ id: elem.id || null });

        for (var j in _this._head) {
            _this.columnEq = j;
            _this.$currentHead = _this.$head[j];
            eval(_this._head[j]);
        }

        _this.writeLine();
    }
};

AdminList.prototype.resetList = function () {
    if (this.$list.parent().parent().find('.no-more-result').length) {
        this.$list.parent().parent().find('.no-more-result').remove();
    }
    this.$list.html('');
    this.page = 0;
    this.run = false;
    this.searchAction();
};

AdminList.prototype.searchAction = function () {
    if (this.run) {
        return;
    }

    this.run = true;

    var _this = this,
        data = _this._getFormData(_this.$form) || {};

    if (_this.__head.find('.sorting_desc').length) {
        data['order_by'] = 'desc';
        data['order_field'] = _this.__head.find('.sorting_desc').attr('data-sort');
    }
    if (_this.__head.find('.sorting_asc').length) {
        data['order_by'] = 'asc';
        data['order_field'] = _this.__head.find('.sorting_asc').attr('data-sort');
    }

    data['page'] = _this.page;

    _this.post({
        url: _this.$form.attr('action'), data: data,
        callback: function callback(response) {
            if (response.status !== 'success') {
                console.log(response);
                return; //dialog.error({message: response.message || '@fatal-error@'});
            }

            _this.page++;

            _this.drawListAction(response);

            if (response.end === false) {
                _this.run = false;
            } else {
                _this.$list.parent().after($('<p>').addClass('no-more-result').html('Nincs több találat'));
            }

            if (_this.$list.find('tr').first().isvisible() && _this.$list.find('tr').last().isvisible()) {
                _this.searchAction();
            }
        }
    });
};

AdminList.prototype.tooltip = function ($elem, tooltip) {
    $elem.attr('data-toggle', 'tooltip').attr('data-placement', 'top').attr('data-original-title', tooltip);
};

AdminList.prototype.column = function (html, tooltip, extraClass) {
    var $column = $('<td>'),
        hidden = this.$currentHead.hasClass('hidden');
    this.$row.append($column.addClass('valignm ' + (hidden ? 'hidden' : '')).html(html));
    if (typeof tooltip === 'string' && tooltip.length) {
        this.tooltip($column, tooltip);
        //$column.attr('data-toggle', 'tooltip').attr('data-placement', 'top').attr('data-original-title', tooltip);
    }
    if (typeof extraClass === 'string' && extraClass.length) {
        $column.addClass(extraClass);
    }
    return $column;
};
AdminList.prototype.columnLink = function (html, link, callback, disabled, blank, extra) {
    var $column = this.column($('<a>').html(html));

    $column.find('a').on('click.columnLinkAction', function (e) {
        if ($(this).attr('data-disabled')) {
            e.preventDefault();
            return false;
        }
        if (typeof callback === 'function') {
            e.preventDefault();
            callback($column.parent(), $column);
            return false;
        }
    }).attr('href', link);

    if (disabled || false) {
        $column.find('a').attr('data-disabled', 1).addClass('disabled-link');
    }
    if (blank || false) {
        $column.find('a').attr('target', '_blank');
    }
    if (extra || false) {
        $column.append(extra);
    }

    return $column;
};

AdminList.prototype.urlPrefixer = function (url) {
    return (url || "").replace(/\/$/, "") + "/" || "";
};

AdminList.prototype.columnName = function (id, name, url_prefix) {
    url_prefix = this.urlPrefixer(url_prefix);
    return this.columnLink(name, url_prefix + id);
};

AdminList.prototype.columnEmail = function (email) {
    return this.columnLink(email, "mailto:" + email, false, false, true);
};

AdminList.prototype.columnPhone = function (phone) {
    return this.columnLink(phone, "tel:" + phone);
};

AdminList.prototype.columnButtons = function (id, url_prefix) {
    url_prefix = this.urlPrefixer(url_prefix);
    var holder = $('<div>');
    holder.append($('<a>').addClass('btn btn-success btn-sm').attr('href', url_prefix + "edit/" + id).append($('<i>').addClass('fa fa-edit')));
    holder.append(" ");
    holder.append($('<a>').addClass('btn btn-outline-danger btn-sm deleteButton').attr('href', url_prefix + "delete/" + id).append($('<i>').addClass('fa fa-trash')));
    return this.column(holder, null, "text-right");
};

AdminList.prototype.columnCategories = function (categories) {
    var holder = $('<div>');
    for (var i = 0; i < categories.length; i++) {
        holder.append(this.getLabel(categories[i], 'secondary'));
        holder.append(" ");
    }
    return this.column(holder);
};

AdminList.prototype.getLabel = function (content, cl) {
    return $('<span>').addClass('badge badge-' + cl).html(content);
};

AdminList.prototype.newLine = function (data) {
    this.$row = $('<tr>');
    for (var i in data || {}) {
        this.$row.attr(i, data[i]);
    }
};

AdminList.prototype.writeLine = function () {
    this.$list.append(this.$row);
    this.$row = null;
};

AdminList.extends(Application);

$(document).ready(function () {
    if ($('form#search').length && $('tbody#list').length && $('thead#head [data-elem]').length) {
        window.adminList = new AdminList($('form#search'), $('tbody#list'), $('thead#head'));
    }
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);