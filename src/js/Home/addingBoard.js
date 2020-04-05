'use strict';

import DOMHelpers from '../helpers/DOMHelpers';
import making from './form/making';
import '../../scss/boards/adding-board.scss';

const { createElement } = DOMHelpers();

const CLASS = {
    addingBoard: '.adding-board',
    modal: '.modal',
    modalOverlay: '.modal-overlay',
};

const modal = () => {
    function modalOverlayAnimationEndHandler() {
        this.remove();
        this.removeEventListener('animationend', modalOverlayAnimationEndHandler, false);
    }

    function modalOverlayHandler(e) {
        if (e.target.dataset.modalClose !== undefined) {
            this.classList.add('open');
            this.addEventListener('animationend', modalOverlayAnimationEndHandler, false);
            this.removeEventListener('click', modalOverlayHandler, false);
        }
    }

    const $overlay = createElement('div', CLASS.modalOverlay);
    $overlay.setAttribute('data-modal-close', '');
    $overlay.addEventListener('click', modalOverlayHandler, false);

    const $modal = createElement('div', CLASS.modal);

    document
        .body
        .appendChild($overlay)
        .appendChild($modal)
        .appendChild(making());
};

const addingBoard = () => {
    const $add = createElement('button', '.btn');
    $add.type = 'button';
    $add.classList.add(CLASS.addingBoard.slice(1));
    $add.setAttribute('ripple', '');
    $add.innerHTML = 'Создать доску';
    $add.addEventListener('click', modal, false);

    return $add;
};

export default addingBoard;