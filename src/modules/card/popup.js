'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import '../../scss/board/card/popup.scss';

const { createElement } = DOMHelpers();

const CLASS = {
    modal: '.popup',
    overlay: '.popup-overlay',
};

const popup = (cardDetail) => {

    const $popup = createElement('div', CLASS.modal);
    const $overlay = createElement('div', CLASS.overlay);

    const overlayAnimationEndHandler = () => {
        $overlay.remove();
        $popup.remove();
        $overlay.removeEventListener('animationend', overlayAnimationEndHandler, false);
    };

    const overlayHandler = () => {
        console.log('overlay');
        $overlay.classList.add('close');
        $popup.classList.add('close');
        $overlay.addEventListener('animationend', overlayAnimationEndHandler, false);
        $overlay.removeEventListener('click', overlayHandler, false);
    };

    $overlay.addEventListener('click', overlayHandler, false);

    $popup.appendChild(cardDetail);

    document.body.append($popup, $overlay);
};

export default popup;