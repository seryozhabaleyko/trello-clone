'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import Store from '../Store.js';

const { createElement } = DOMHelpers();
const { getLocalStorage, setLocalStorage, find } = Store();

function header() {

    const store = find(localStorage.getItem('id'));

    function titleDblclickHandler() {
        this.setAttribute('contenteditable', 'true');
        this.focus();
    }

    function titleBlurHandler() {
        this.removeAttribute('contenteditable');

        store.title = this.textContent;
        setLocalStorage(getLocalStorage().map(obj => obj.id === store.id ? store : obj));
    }

    function title() {
        const $title = createElement('div', '.board-title');

        const $span = createElement('div', '.board-title-text');
        $span.textContent = store.title;
        $span.addEventListener('dblclick', titleDblclickHandler, false);
        $span.addEventListener('blur', titleBlurHandler, false);

        $title.appendChild($span);

        return $title;
    }

    const $header = createElement('div', '.board-header');

    $header.appendChild(title());

    return $header;
}

export default header;