'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import Store from '../Store.js';
import Template from '../Template.js';

const { createElement, on } = DOMHelpers();
const store = Store();
const template = Template();

function settingsHandler() {
    console.log(123123);
}

function settings() {
    const $settings = createElement('button', '#board-settings');
    const icon = template.settings({
        width: 20,
        height: 20,
        color: '#5f6368'
    });

    $settings.insertAdjacentHTML('afterbegin', `${icon}Настройки`);

    on($settings, 'click', settingsHandler, false);

    return $settings;
}

function header() {
    const currentBoardId = localStorage.getItem('id');
    const currentBoard = store.find(currentBoardId);

    function titleDblclickHandler() {
        this.setAttribute('contenteditable', 'true');
        this.focus();
    }

    function titleBlurHandler() {
        this.removeAttribute('contenteditable');
        currentBoard.title = this.textContent;
        store.setLocalStorage(store.replace(currentBoard));
    }

    function title() {
        const $title = createElement('div', '.board-title');

        const $span = createElement('div', '.board-title-text');
        $span.textContent = currentBoard.title;

        on($span, 'dblclick', titleDblclickHandler, false);
        on($span, 'blur', titleBlurHandler, false);

        $title.appendChild($span);

        return $title;
    }

    const $header = createElement('div', '#board-header');
    $header.append(title(), settings());

    return $header;
}

export default header;