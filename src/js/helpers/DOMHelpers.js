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

    const on = (target, type, callback, options = false) => target.addEventListener(type, callback, options);

    const off = (target, type, callback, options = false) => target.removeEventListener(type, callback, options);

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
    }

    const show = (elem) => {
        if (elem.classList.contains('hide')) {
            elem.classList.remove('hide');
        }
        elem.classList.add('show');
    }

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

    const getDOMNodePosition = (node) => {
        const { top, left } = node.getBoundingClintRect();

        return {
            top,
            left
        };
    };

    const swapTwoDOMNodes = (node1, node2) => {
        if (node1.nextElementSibling === node2) {
            node2.parentNode.insertBefore(node1, node2);
        } else {
            node1.parentNode.insertBefore(node1, node2);
        }
    };

    return {
        createElement,
        on,
        off,
        show,
        hide,
        empty,
        getElement,
        getElements,
        addClass,
        removeClass,
        toggleClass,
        removeDOMNode,
        insertAfter,
        getDOMNodePosition,
        swapTwoDOMNodes
    };
};

export default DOMHelpers;
