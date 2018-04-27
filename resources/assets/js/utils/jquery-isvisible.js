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
        if ($(this).length !== 1 || (vertical === false && horizontal === false)) {
            return $(this);
        }

        // browser current viewport
        var windowTop = $(window).scrollTop(), windowBottom = windowTop + window.innerHeight,
            windowLeft = $(window).scrollLeft(), windowRight = windowLeft + window.innerWidth;

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
        var offsetTop = $(this).offset().top, offsetBottom = offsetTop + $(this).height();
        offsetLeft = $(this).offset().left, offsetRight = offsetLeft + $(this).width();

        // check element is absolute invisible vertically (and|or) horizontally
        if ((vertical && (offsetBottom <= windowTop || windowBottom <= offsetTop))
            || (horizontal && (offsetRight <= windowLeft || windowRight <= offsetLeft))) {
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
        return windowTop <= offsetTop && offsetBottom <= windowBottom
            && windowLeft <= offsetLeft && offsetRight <= windowRight;
    }
}(jQuery);