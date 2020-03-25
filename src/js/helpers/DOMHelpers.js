'use strict';

const DOMHelpers = () => {

    // Get the first matching element in the DOM
    const $ = (selector, parent) => (parent ? parent : document).querySelector(selector);

    // Get an array of all matching elements in the DOM
    const $$ = (selector, parent) => Array.from((parent ? parent : document).querySelectorAll(selector));

    const contains = (elem, child) => elem !== child && elem.contains(child);

    const position = (elem) => ({ left: elem.offsetLeft, top: elem.offsetTop});

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

    const on = (target, type, callback, options = false) => (
        target.addEventListener(type, callback, options)
    );

    const off = (target, type, callback, options = false) => (
        target.removeEventListener(type, callback, options)
    );

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

    const hide = (elem) => {
        if (elem.classList.contains('show')) {
            elem.classList.remove('show');
        }
        elem.classList.add('hide');
    };

    const hideAll = (elemList) => {
        Array.from(elemList).forEach(elem => hide(elem));
    };

    const show = (elem) => {
        if (elem.classList.contains('hide')) {
            elem.classList.remove('hide');
        }
        elem.classList.add('show');
    };

    const fadeOut = (elem) => {
        if (window.requestAnimationFrame) {
            elem.style.opacity = 1;

            (function fade() {
                if ((elem.style.opacity -= 0.1) < 0) {
                    elem.style.display = 'none';
                } else {
                    requestAnimationFrame(fade);
                }
            })();
        } else {
            elem.style.display = 'none';
        }
    };

    const fadeIn = (elem) => {
        if (window.requestAnimationFrame) {
            elem.style.opacity = 0;
            elem.style.display = display || 'block';

            (function fade() {
                let val = parseFloat(elem.style.opacity);
                const calc = (val += 0.1) > 1;

                if (!calc) {
                    elem.style.opacity = val;
                    requestAnimationFrame(fade);
                }
            })();
        } else {
            elem.style.display = display || 'block';
        }
    };

    const removeDOMNode = (node) => {
        node.parentNode.removeChild(node);
    };

    const insertAfter = (node, refNode) => {
        const { parentNode } = refNode;
        const nextNode = refNode.nextElementSibling;
        if (nextNode) {
            parentNode.insertBefore(node, nextNode);
        } else {
            parentNode.appendChild(node);
        }
    };

    return {
        fadeOut,
        fadeIn,
        $,
        $$,
        contains,
        createElement,
        on,
        off,
        show,
        hide,
        hideAll,
        empty,
        getElement,
        getElements,
        addClass,
        removeClass,
        toggleClass,
        removeDOMNode,
        insertAfter
    };
};

export default DOMHelpers;
