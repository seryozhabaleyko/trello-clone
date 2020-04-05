'use strict';

import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
import store from '../Store/Store';
import card from '../Card/card';

import { hideFormHandler } from './listFooter';

import '../../scss/board/form-adding-card.scss';

const { createElement } = DOMHelpers();

function closeHandler(root, input) {
    root.hide();
    input.value = '';
    const $footer = root.parentNode.nextSibling;
    $footer.show();

    document.removeEventListener('click', hideFormHandler, true);
}

function submitHandler(listNode, form, input, e) {
    e.preventDefault();

    const obj = {
        id: Date.now(),
        content: input.value || 'Название карточки'
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



const CLASS = {
    formAddingCard: '.form-adding-card',
    fieldInputFormAddingCard: '.field-input-form-adding-card',
    formAddingCardAction: '.form-adding-card-action',
    buttonSubmitFieldInputFormAddingCard: '.button-submit-field-input-form-adding-card',
    buttonCloseFieldInputFormAddingCard: '.button-close-field-input-form-adding-card',
};

const close = (root, input) => {
    const $close = createElement('button', CLASS.buttonCloseFieldInputFormAddingCard);
    $close.setAttribute('type', 'button');
    $close.insertAdjacentHTML('afterbegin', icons.close);

    $close.addEventListener('click', closeHandler.bind(this, root, input));

    return $close;
};

const submit = (list, form, input) => {
    const $submit = createElement('input', CLASS.buttonSubmitFieldInputFormAddingCard);
    $submit.setAttribute('type', 'submit');
    $submit.setAttribute('value', 'Добавить карточку');

    $submit.addEventListener('click', submitHandler.bind(this, list, form, input));

    return $submit;
};

const formAddingCard = (list) => {
    const $form = createElement('form', CLASS.formAddingCard);
    $form.hide();

    const $fieldInput = createElement('textarea', CLASS.fieldInputFormAddingCard);
    const $action = createElement('div', CLASS.formAddingCardAction);

    $action.append(submit(list, $form, $fieldInput), close($form, $fieldInput));
    $form.append($fieldInput, $action);

    return $form;
};

export default formAddingCard;