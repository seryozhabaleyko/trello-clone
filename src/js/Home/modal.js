'use strict';

import DOMHelpers from '../helpers/DOMHelpers';
import background from '../helpers/background';

const { createElement } = DOMHelpers();

function _overlayHandler() {
    this.classList.add('open');
    setTimeout(() => {
        this.remove();
    }, 500);
    this.removeEventListener('click', _overlayHandler, true);
}

function _modal() {
    const $overlay = createElement('div', '.modal-overlay');
    //$overlay.addEventListener('click', _overlayHandler, true);

    const $modal = createElement('div', '.modal');

    const $form = createElement('form', '.making');
    const $formBody = createElement('div', '.making-body');

    const $makingBoard = createElement('div', '.making-board');
    $makingBoard.style.backgroundImage = `url('${background.bg1}')`;

    const $input = createElement('input', '.making-board-title');
    $input.type = 'text';
    $input.placeholder = 'Добавить заголовок доски';

    const $button = createElement('button', '.making-board-close');
    $button.type = 'button';
    $button.insertAdjacentHTML('afterbegin', `
        <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M13.476 12.04l4.248-4.248a.992.992 0 1 0-1.402-1.403l-4.248 4.248L7.787 6.35a.992.992 0 0 0-1.402 1.403l4.286 4.286-4.26 4.261a.992.992 0 1 0 1.402 1.403l4.26-4.261 4.223 4.222a.992.992 0 1 0 1.403-1.402l-4.223-4.223z"></path>
        </svg>
    `);

    function closeHandler() {
        console.log(this.closest('.modal-overlay'));
    }

    $button.addEventListener('click', closeHandler, false);

    $makingBoard.append($input, $button);

    const $feltTipPens = createElement('div', '.felt-tip-pens');
    $feltTipPens.insertAdjacentHTML('afterbegin', `
        <button class="felt-tip-pen" type="button" style="background-image: url('${background.bg1}')" data-trigger></button>
        <button class="felt-tip-pen" type="button" style="background-image: url('${background.bg2}')" data-trigger></button>
        <button class="felt-tip-pen" type="button" style="background-image: url('${background.bg3}')" data-trigger></button>
        <button class="felt-tip-pen" type="button" style="background-image: url('${background.bg4}')" data-trigger></button>
        <button class="felt-tip-pen" type="button" style="background-image: url('${background.bg5}')" data-trigger></button>
        <button class="felt-tip-pen" type="button" style="background-image: url('${background.bg6}')" data-trigger></button>
        <button class="felt-tip-pen" type="button" style="background-image: url('${background.bg7}')" data-trigger></button>
        <button class="felt-tip-pen" type="button" style="background-image: url('${background.bg8}')" data-trigger></button>
        <button class="felt-tip-pen" type="button" style="background-image: url('${background.bg9}')" data-trigger></button>
    `);

    function feltTipPensHandler(e) {
        if (e.target.dataset.trigger !== undefined) {
            $makingBoard.setAttribute('style', e.target.getAttribute('style'));
        }
    }

    $feltTipPens.addEventListener('click', feltTipPensHandler, false);

    const $formFooter = createElement('div', '.making-footer');

    const $submit = createElement('button', '');
    $submit.type = 'button';
    $submit.innerHTML = 'Создать доску';

    function submitHandler() {
        const obj = {
            id: Date.now(),
            title: $input.value || 'Название доски',
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            background: $makingBoard.getAttribute('style'),
            favorite: false,
            lists: []
        };

        console.log(obj);
    }

    $submit.addEventListener('click', submitHandler, false);

    $formFooter.appendChild($submit);

    $formBody.append($makingBoard, $feltTipPens);

    $form.append($formBody, $formFooter);
    $modal.appendChild($form);

    $overlay.appendChild($modal);
    document.body.appendChild($overlay);
    return $overlay;
}


function modal(options) {
    const ANIMATION_SPEED = 200;
    const $modal = _modal(options);
    let closing, destroyed;

    const modal = {
        open() {
            if (destroyed) {
                return console.log('modal is destroyed');
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

    const listener = e => {
        if (e.target.dataset.trigger) {
            modal.close();
        }
    };

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal);
            $modal.removeEventListener('click', listener);
            destroyed = false;
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html;
        }
    });
}

export default modal;