'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import store from '../Store.js';
import Template from '../Template.js';

import '../../scss/board/board-header.scss';

const { createElement } = DOMHelpers();
const template = Template();

function titleDblclickHandler() {
    this.setAttribute('contenteditable', 'true');
    this.focus();
}

function titleBlurHandler(obj) {
    this.removeAttribute('contenteditable');
    obj.title = this.textContent;

    store.setLocalStorage(store.replace(obj));
}

function title(obj) {
    const $title = createElement('div', '#board-title');
    $title.textContent = obj.title;

    $title.addEventListener('dblclick', titleDblclickHandler, false);
    $title.addEventListener('blur', titleBlurHandler.bind($title, obj), false);

    return $title;
}

function favoriteHandler(obj) {
    if (this.hasAttribute('favorite')) {
        this.removeAttribute('favorite');
    } else {
        this.setAttribute('favorite', '');
    }

    obj.favorite = !obj.favorite;

    store.setLocalStorage(store.replace(obj));
}

function favorite(obj) {
    const $favorite = createElement('button', '#board-favorite');
    $favorite.setAttribute('ripple', '');
    $favorite.insertAdjacentHTML('afterbegin', template.star({ width: 20, height: 20, color: '#fff' }));

    if (obj.favorite) {
        $favorite.setAttribute('favorite', '');
    }

    $favorite.addEventListener('click', favoriteHandler.bind($favorite, obj), false);

    return $favorite;
}

function boardHeader(obj) {
    const $header = createElement('div', '#board-header');

    $header.append(title(obj), favorite(obj));

    return $header;
}

export default boardHeader;