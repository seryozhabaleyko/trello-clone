'use strict';

const DOMHelpers = () => {

    const createElement = (tag, idClass) => {
        let elem = document.createElement(tag);

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

    const on = (target, type, callback, options) => target.addEventListener(type, callback, options);

    const off = (target, type, callback) => target.removeEventListener(type, callback);

    const empty = (parentNode) => {
        while (parentNode.firstChild) {
            parentNode.removeChild(parentNode.firstChild);
        }
    };

    const getElement = (selector) => document.querySelector(selector);

    const getElements = (selector) => document.querySelectorAll(selector);

    const addClass = (elem, ...className) => elem.classList.add(...className);

    const removeClass = (elem, ...className) => elem.classList.remove(...className);

    const toggleClass = (elem, className) => elem.classList.toggle(className);

    return {
        createElement,
        on,
        off,
        empty,
        getElement,
        getElements,
        addClass,
        removeClass,
        toggleClass
    };
};

export default DOMHelpers;
