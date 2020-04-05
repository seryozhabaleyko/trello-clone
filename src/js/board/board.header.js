'use strict';

import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
import store from '../Store';
import '../../scss/board/board-header.scss';
import ripple from '../plugins/ripple';

const { createElement } = DOMHelpers();

function title(obj) {
    const $title = createElement('div', '#board-title');
    $title.textContent = obj.title;

    $title.addEventListener('dblclick', function() {
        this.setAttribute('contenteditable', 'true');
        this.focus();
    }, false);

    $title.addEventListener('blur', function() {
        this.removeAttribute('contenteditable');
        obj.title = this.textContent;
        store.setLocalStorage(store.replace(obj));
    }, false);

    return $title;
}

function favorite(obj) {
    const $favorite = createElement('button', '#board-favorite');
    $favorite.insertAdjacentHTML('afterbegin', icons.starBorder);

    ripple($favorite);

    if (obj.favorite) {
        $favorite.setAttribute('favorite', '');
    }

    $favorite.addEventListener('click', function() {
        if (this.hasAttribute('favorite')) {
            this.removeAttribute('favorite');
        } else {
            this.setAttribute('favorite', '');
        }

        obj.favorite = !obj.favorite;
        store.setLocalStorage(store.replace(obj));
    }, false);

    return $favorite;
}

const settings = (obj) => {
    const $settings = createElement('button', '.boards-settings');
    $settings.insertAdjacentHTML('afterbegin', `${icons.settings}<span>Настройки</span>`);

    return $settings;
};

function boardHeader(obj) {
    const $header = createElement('div', '#board-header');

    $header.append(title(obj), favorite(obj), createElement('div'), settings(obj));

    return $header;
}

export default boardHeader;