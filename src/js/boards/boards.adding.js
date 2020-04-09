import DOMHelpers from '../helpers/DOMHelpers';
import ripple from '../plugins/ripple';
import making from './form/making';
import '../../scss/boards/boards-adding.scss';

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

const boardAdding = () => {
    const $button = createElement('button', '.boards-adding');
    $button.type = 'button';
    $button.textContent = 'Создать доску';
    $button.addEventListener('click', modal, false);
    ripple($button);

    return $button;
};

export default boardAdding;