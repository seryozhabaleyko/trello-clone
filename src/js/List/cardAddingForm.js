'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import store from '../Store.js';
import card from '../Card/card.js';
import { hideFormHandler } from './listFooter.js';

const {
    createElement,
    show,
    hide
} = DOMHelpers();

function closeHandler(root, input) {
    hide(root);
    input.value = '';
    const $footer = root.parentNode.nextSibling;
    show($footer);

    document.removeEventListener('click', hideFormHandler, true);
}

const close = (root, input) => {
    const $close = createElement('button', '.add-card-close');
    $close.setAttribute('type', 'button');
    $close.insertAdjacentHTML('afterbegin', `
        <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M13.476 12.04l4.248-4.248a.992.992 0 1 0-1.402-1.403l-4.248 4.248L7.787 6.35a.992.992 0 0 0-1.402 1.403l4.286 4.286-4.26 4.261a.992.992 0 1 0 1.402 1.403l4.26-4.261 4.223 4.222a.992.992 0 1 0 1.403-1.402l-4.223-4.223z"></path>
        </svg>
    `);

    $close.addEventListener('click', closeHandler.bind(this, root, input));

    return $close;
};

function submitHandler(listNode, form, input, e) {
    e.preventDefault();

    const obj = {
        id: Date.now(),
        content: input.value
    };

    const listID = parseInt(listNode.getAttribute('data-list-id'), 10);
    const boardID = parseInt(localStorage.getItem('id'), 10);

    const b = store.getLocalStorage().map(board => {
        if (board.id === boardID) {
            board.lists.map(list => {
                if (list.id === listID) {
                    list.cards.push(obj);
                }
                return list;
            });
        }
        return board;
    });

    store.setLocalStorage(b);

    input.value = '';
    form.before(card(obj));
    input.focus();
}

const submit = (list, form, input) => {
    const $submit = createElement('input', '.add-card-submit');
    $submit.setAttribute('type', 'submit');
    $submit.setAttribute('value', 'Добавить карточку');

    $submit.addEventListener('click', submitHandler.bind(this, list, form, input));

    return $submit;
};

const form = (list) => {
    const $form = createElement('form', '.card-adding-form');
    hide($form);

    const $input = createElement('textarea', '.card-add-text');
    const $action = createElement('div', '.add-card-action');

    $action.append(submit(list, $form, $input), close($form, $input));
    $form.append($input, $action);

    return $form;
};

export default form;