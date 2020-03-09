'use strict';

import DOMHelpers from './helpers/DOMHelpers.js';
import CreateBoardForm from './froms/CreateBoardForm.js';

const Modal = () => {

    const {
        createElement,
        getElement
    } = DOMHelpers();

    const {
        form
    } = CreateBoardForm();

    const template = `
        <div class="modal">
            <svg data-close="true" class="modal__cross js-modal-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
            <p class="modal__title">Заголовок окна 1</p>
        </div>
    `;

    const overlay = () => {
        const $overlay = createElement('div', '.modal-overlay');
        $overlay.setAttribute('data-close', 'true');
        $overlay.addEventListener('click', function(e) {
            if (e.target.dataset.close) {
                this.classList.remove('active');
                setTimeout(() => {
                    this.remove();
                }, 500);
            }
        }, false);

        return $overlay;
    };

    const createModal = () => {
        const $overlay = overlay();
        $overlay.insertAdjacentHTML('afterbegin', template);
        document.body.appendChild($overlay);
    }

    const open = () => {
        createModal();
        const $overlay = getElement('.modal-overlay');
        const $modal = getElement('.modal');
        $modal.appendChild(form());
        $overlay.classList.add('active');
        $modal.classList.add('active');
    };

    const close = () => {
        const $overlay = getElement('.modal-overlay');
        const $modal = getElement('.modal');
        $overlay.classList.remove('active');
        $modal.classList.remove('active');
    };

    return {
        open,
        close
    }
}

export default Modal;