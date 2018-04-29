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
        callback: function () {
            _this.searchAction();
        }
    });
};

AdminList.prototype.initTableSorts = function ($head, $search) {

    $head = $head || $('table thead#head');
    $search = $search || $('form#search');

    $head.find('tr th[data-sort]').addClass('sorting');
    if ($head.find('tr th[data-sort].sorting_asc').length === 0
        && $head.find('tr th[data-sort].sorting_desc').length === 0) {
        $head.find('tr th[data-sort]:eq(0)').addClass('sorting_asc');
    }

    $head.find('tr th.sorting').off('click.sort').on('click.sort', function () {

        if ($(this).hasClass('sorting_asc')) {
            $head.find('tr th.sorting_asc').removeClass('sorting_asc');
            $head.find('tr th.sorting_desc').removeClass('sorting_desc');
            $(this).addClass('sorting_desc');
        }
        else if ($(this).hasClass('sorting_desc')) {
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

        _this.newLine({id: elem.id || null});

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

    var _this = this, data = _this._getFormData(_this.$form) || {};

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
        callback: function (response) {
            if (response.status !== 'success') {
                console.log(response);
                return;//dialog.error({message: response.message || '@fatal-error@'});
            }

            _this.page++;

            _this.drawListAction(response);

            if (response.end === false) {
                _this.run = false;
            } else {
                _this.$list.parent().after($('<p>').addClass('no-more-result text-center').html('Nincs több találat'));
            }

            window.app.initDeletes();

            if (_this.$list.find('tr').first().isvisible() && _this.$list.find('tr').last().isvisible()) {
                _this.searchAction();
            }
        }
    });
};

AdminList.prototype.tooltip = function ($elem, tooltip) {
    $elem.attr('data-toggle', 'tooltip').attr('data-placement', 'top').attr('data-original-title', tooltip).tooltip();
};

AdminList.prototype.column = function (html, tooltip, extraClass) {
    var $column = $('<td>'), hidden = this.$currentHead.hasClass('hidden');
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
    return this.columnLink(email, "mailto:" + email, false, false, true).addClass('text-center');
};

AdminList.prototype.columnPhone = function (phone) {
    return this.columnLink(phone, "tel:" + phone).addClass('text-center');
};

AdminList.prototype.columnButtons = function (id, name, url_prefix) {
    url_prefix = this.urlPrefixer(url_prefix);
    var holder = $('<div>');
    holder.append($('<a>').addClass('btn btn-success btn-sm').attr('href', url_prefix + "edit/" + id).append($('<i>').addClass('fa fa-edit')));
    holder.append(" ");
    holder.append($('<button>').addClass('btn btn-outline-danger btn-sm deleteButton').attr('type', 'button').attr('data-url', url_prefix + "destroy/" + id).attr('data-text', 'Biztosan törlöd ' + name + " névjegyét?").append($('<i>').addClass('fa fa-trash')));
    return this.column(holder).addClass("text-right");
};

AdminList.prototype.columnCategories = function (categories) {
    var holder = $('<div>');
    for (var i = 0; i < categories.length; i++) {
        holder.append(this.getLabel(categories[i], 'secondary'));
        holder.append(" ");
    }
    return this.column(holder).addClass('text-center');
};

AdminList.prototype.columnCreated = function (createdAt) {
    var date = $('<span>').text(moment(createdAt).fromNow());
    this.tooltip(date, createdAt);
    return this.column(date).addClass('text-center');
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
