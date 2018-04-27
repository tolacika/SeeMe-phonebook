Application = function () {
};

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

window.app = new Application();

$(document).ready(function () {
    window.app.initApp();
});