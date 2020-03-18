'use strict';

import DOMHelpers from './helpers/DOMHelpers.js';
import Template from './Template.js';

const { createElement, getElement } = DOMHelpers();
const template = Template();

const Modal = () => {

    const overlay = () => {
        const $overlay = createElement('div', '.modal-overlay');
        $overlay.setAttribute('data-close', 'true');

        return $overlay;
    };

    const createModal = () => {
        const $overlay = overlay();
        $overlay.insertAdjacentHTML('afterbegin', `<div class="modal">${template.boardCreation}</div>`);
        document.body.appendChild($overlay);
    };

    const open = () => {
        createModal();
        const $overlay = getElement('.modal-overlay');
        const $modal = getElement('.modal');
        $overlay.classList.add('active');
        $modal.classList.add('active');
    };

    return {
        open
    };
}

export default Modal;