'use strict';

import Template from '../Template.js';
import DOMHelpers from '../helpers/DOMHelpers.js';
import store from '../Store.js';

const { createElement } = DOMHelpers();
const template = Template();

const className = {
    listHeader: '.list-header',
    listTitle: '.list-title',
    listMore: '.list-more',
    listMoreToggle: '.list-more-toggle',
    listMoreMenu: '.list-more-menu',
    listMoreItem: '.list-more-item',
};

function titleDblclickHandler() {
    this.setAttribute('contenteditable', 'true');
    this.focus();
}

function titleBlurHandler() {
    this.removeAttribute('contenteditable');

    const listID = parseInt(this.closest('.list').getAttribute('data-list-id'), 10);
    const boardID = parseInt(localStorage.getItem('id'), 10);

    const b = store.getLocalStorage().map(board => {
        if (board.id === boardID) {
            board.lists.map(list => {
                if (list.id === listID) {
                    list.title = this.textContent.trim();
                }
                return list;
            });
        }

        return board;
    });

    store.setLocalStorage(b);
}

const title = (obj) => {
    const $title = createElement('span', className.listTitle);
    $title.textContent = obj.title;

    $title.addEventListener('dblclick', titleDblclickHandler, false);
    $title.addEventListener('blur', titleBlurHandler, false);

    return $title;
};

const menu = (root) => {

    function removeHandler(root, e) {
        e.preventDefault();
        root.remove();

        const listID = parseInt(root.getAttribute('data-list-id'), 10);
        const boardID = parseInt(localStorage.getItem('id'), 10);

        const obj = store.getLocalStorage().map(board => {
            if (board.id === boardID) {
                board.lists = board.lists.filter(list => list.id !== listID);
            }
            return board;
        });

        store.setLocalStorage(obj);
    }

    const remove = (root) => {
        const $link = createElement('a', className.listMoreItem);
        $link.href = '#';
        $link.textContent = 'Архивировать список';

        $link.addEventListener('click', removeHandler.bind(this, root), false);

        return $link;
    };

    const $menu = createElement('div', className.listMoreMenu);
    $menu.appendChild(remove(root));

    return $menu;
};


function closeMoreMenuHandler() {
    document.querySelector(`${className.listMore}.show`).classList.remove('show');
    window.removeEventListener('click', closeMoreMenuHandler, true);
}

function moreHandler() {
    this.parentNode.classList.toggle('show');
    window.addEventListener('click', closeMoreMenuHandler, true);
}

function more(root) {
    const $more = createElement('div', className.listMore);
    const $toggle = createElement('button', className.listMoreToggle);
    $toggle.insertAdjacentHTML('afterbegin', template.more({color: '#555'}));
    $toggle.addEventListener('click', moreHandler, false);
    $more.append($toggle, menu(root));

    return $more;
}

function header(obj, root) {
    const $header = createElement('div', className.listHeader);
    $header.append(title(obj), more(root));

    return $header;
}

export default header;