'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';

const { createElement } = DOMHelpers();

function _overlayHandler() {
    this.classList.remove('open');
    this.removeEventListener('click', overlayHandler, true);
}

function _modal({ width = '600px', body = false }) { //title, content, closable
    const $overlay = createElement('div', '.modal-overlay');
    $overlay.addEventListener('click', _overlayHandler, true);

    const $modal = createElement('div', '.modal');
    $modal.style.width = width;

    const $body = createElement('div', '.modal-body');

    if (body) {
        $body.appendChild(body);
    }

    $overlay.appendChild($modal).appendChild($body);

    document.body.appendChild($overlay);

    return $overlay;
}

function modal(options) {
    const ANIMATION_SPEED = 200;
    const $modal = _modal(options);
    let closing = false;
    let destroyed = false;

    const modal = {
        open() {
            if (destroyed) {
                return console.log('Modal is destroyed');
            }
            !closing && $modal.classList.add('open');
        },
        close() {
            closing = true;
            $modal.classList.remove('open');
            $modal.classList.add('hide');
            setTimeout(() => {
                $modal.classList.remove('hide');
                closing = false;
            }, ANIMATION_SPEED);
        }
    };

    /* const listener = e => {
        if (e.target.dataset.close) { modal.close() };
    };

    $modal.addEventListener('click', listener); */

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal);
            $modal.removeEventListener('click', listener);
            destroyed = true;
        },
        setContent(html) {
            $modal.querySelector('data-content').innerHTML = html;
        }
    });
}

export default modal;