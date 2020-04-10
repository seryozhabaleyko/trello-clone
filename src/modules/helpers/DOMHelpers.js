const DOMHelpers = () => {
    const $ = (selector, parent) => (parent || document).querySelector(selector);

    const $$ = (selector, parent) => Array.from((parent || document).querySelectorAll(selector));

    const contains = (elem, child) => elem !== child && elem.contains(child);

    const createElement = (tag, idClass) => {
        const elem = document.createElement(tag);

        if (idClass) {
            switch (idClass.charAt(0)) {
                case '#':
                    elem.id = idClass.slice(1);
                    break;
                case '.':
                    elem.classList.add(idClass.slice(1));
                    break;
                default:
            }
        }

        return elem;
    };

    const on = (target, type, callback, options = false) => (
        target.addEventListener(type, callback, options)
    );

    const off = (target, type, callback, options = false) => (
        target.removeEventListener(type, callback, options)
    );

    const addClass = (elem, ...className) => elem.classList.add(...className);

    const removeClass = (elem, ...className) => elem.classList.remove(...className);

    const toggleClass = (elem, className) => elem.classList.toggle(className);

    Element.prototype.show = function () {
        this.classList.contains('hide') && this.classList.remove('hide');
        this.classList.add('show');
    };

    Element.prototype.hide = function () {
        this.classList.contains('show') && this.classList.remove('show');
        this.classList.add('hide');
    };

    const fadeIn = (el, smooth = true, displayStyle = 'block') => {
        el.style.opacity = 0;
        el.style.display = displayStyle;
        if (smooth) {
            let opacity = 0;
            let request;

            const animation = () => {
                el.style.opacity = opacity += 0.04;
                if (opacity >= 1) {
                    opacity = 1;
                    cancelAnimationFrame(request);
                }
            };

            const rAf = () => {
                request = requestAnimationFrame(rAf);
                animation();
            };
            rAf();
        } else {
            el.style.opacity = 1;
        }
    };

    const fadeOut = (el, smooth = true, displayStyle = 'none') => {
        if (smooth) {
            let { opacity } = el.style;
            let request;

            const animation = () => {
                el.style.opacity = opacity -= 0.04;
                if (opacity <= 0) {
                    opacity = 0;
                    el.style.display = displayStyle;
                    cancelAnimationFrame(request);
                }
            };

            const rAf = () => {
                request = requestAnimationFrame(rAf);
                animation();
            };
            rAf();
        } else {
            el.style.opacity = 0;
        }
    };

    return {
        createElement,
        $,
        $$,
        fadeOut,
        fadeIn,
        contains,
        on,
        off,
        addClass,
        removeClass,
        toggleClass,
    };
};

export default DOMHelpers;
