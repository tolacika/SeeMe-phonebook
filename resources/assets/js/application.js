Application = function () {
};

Application.prototype.initApp = function () {
    this.initDeletes();
    $(":input").attr('autocomplete', "off");
};

Application.prototype.initDeletes = function () {
    $(".deleteButton").off('click.deleteButton').on('click.deleteButton', function (e) {
        e.preventDefault();
        var url = $(this).data('url'),
            text = $(this).data('text');
        $("#deleteModalForm").attr("action", url);
        if (text) {
            $("#deleteModalText").html(text);
        }
        $("#deleteModal").modal();
    });
};

Application.prototype.post = function (settings, method) {
    var options = {
        url: settings.url,
        type: method || "POST",
        data: settings.data,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (response, textStatus, jqXHR) {

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
        error: function (jqXHR, textStatus, errorThrown) {
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
    var _this = this, data = {};

    if ($form.length === 0) {
        return data;
    }

    $form.find(':input[name]').each(function () {
        var name = $(this).attr('name'), type = $(this).attr('type'), value = $(this).val();

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
    moment.locale('hu');
    window.app.initApp();
});