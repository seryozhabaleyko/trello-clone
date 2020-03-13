'use strict';

import Template from '../Template.js';
import DOMHelpers from '../helpers/DOMHelpers.js';
import Store from '../Store.js';

const { createElement } = DOMHelpers();
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

    $title.addEventListener('dblclick', titleDblclickHandler, false);
    $title.addEventListener('blur', titleBlurHandler.bind($title, obj, $title), false);

    return $title;
};

const dropdown = () => {

};

function moreHandler() {
    console.log(234234);
}

const more = () => {
    const $more = createElement('div', '.list-more');

    const $moreLink = document.createElement('a');
    $moreLink.href = 'javascript:void(0)';
    $moreLink.insertAdjacentHTML('afterbegin', template.more);

    $moreLink.addEventListener('click', moreHandler, false);

    $more.appendChild($moreLink);

    return $more;
};

const header = (obj) => {
    const $header = createElement('div', '.list-header');

    $header.append(title(obj), more());

    return $header;
};

export default header;