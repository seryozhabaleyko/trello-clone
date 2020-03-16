'use strict';

import Template from '../Template.js';
import DOMHelpers from '../helpers/DOMHelpers.js';
import Store from '../Store.js';

const { createElement, on, off } = DOMHelpers();
const store = Store();
const template = Template();

function titleDblclickHandler() {
    this.setAttribute('contenteditable', 'true');
    this.focus();
}

function titleBlurHandler(obj, title) {
    this.removeAttribute('contenteditable');

    const listID = Number(this.parentNode.parentNode.getAttribute('data-list-id'));
    const boardID = localStorage.getItem('id');

    const b = store.getLocalStorage().map(board => {
        if (board.id === boardID) {
            board.lists.map(list => {
                if (list.id === listID) {
                    list.title = this.textContent;
                }
                return list;
            });
        };
        return board;
    });

    store.setLocalStorage(b);
}

const title = (obj) => {
    const $title = createElement('span', '.list-title');
    $title.textContent = obj.title;

    on($title, 'dblclick', titleDblclickHandler, false);
    on($title, 'blur', titleBlurHandler.bind($title, obj, $title), false);

    return $title;
};

const menu = (root) => {

    function removeHandler(root, e) {
        e.preventDefault();
        root.parentNode.remove();

        const listID = Number(root.getAttribute('data-list-id'));
        const boardID = localStorage.getItem('id');

        const b = store.getLocalStorage().map(board => {
            if (board.id === boardID) {
                board.lists = board.lists.filter(list => list.id !== listID);
            }
            return board;
        });

        store.setLocalStorage(b);
    }

    const remove = (root) => {
        const $link = createElement('a', '.more-item');
        $link.href = '#';
        $link.textContent = 'Архивировать список';

        on($link, 'click', removeHandler.bind(this, root), false);

        return $link;
    };

    const $menu = createElement('div', '.more-menu');

    $menu.appendChild(remove(root));

    return $menu;
};


function closeMoreMenuHandler() {
    const show = document.querySelector('.list-more.show');
    show.classList.remove('show');
    off(window, 'click', closeMoreMenuHandler, true);
}

function moreHandler() {
    this.parentNode.classList.toggle('show');
    on(window, 'click', closeMoreMenuHandler, true);
}

const more = (root) => {
    const $more = createElement('div', '.list-more');

    const $toggle = createElement('button', '.more-toggle');
    $toggle.setAttribute('data-more-toggle', '');
    $toggle.insertAdjacentHTML('afterbegin', template.more);

    on($toggle, 'click', moreHandler, false);

    $more.append($toggle, menu(root));

    return $more;
};

const header = (obj, root) => {
    const $header = createElement('div', '.list-header');

    $header.append(title(obj), more(root));

    return $header;
};

export default header;