'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import icons from '../helpers/icons';
import Template from '../Template.js';
import store from '../Store.js';
import list from '../List/list';

import '../../scss/board/form-adding-list.scss';

const { createElement } = DOMHelpers();
const template = Template();

const CLASS = {
    addingList: '.adding-list',
    showFormAddingList: '.show-form-adding-list',
    formAddingList: '.form-adding-list',
    fieldInputFormAddingList: '.field-input-form-adding-list',
    formAddingListAction: '.form-adding-list-action',
    buttonCloseFormAddingList: '.button-close-form-adding-list',
    buttonSubmitFieldInputFormAddingList: '.button-submit-field-input-form-adding-list',
};

function hideHandler(e) {
    if (!e.target.closest(`${CLASS.addingList}.show`)) {
        document.querySelector(`${CLASS.addingList}.show`).classList.remove('show');
        document.removeEventListener('click', hideHandler, true);
    }
}

function showHandler(e) {
    e.target.parentNode.classList.add('show');
    document.querySelector(CLASS.fieldInputFormAddingList).focus();
    document.addEventListener('click', hideHandler, true);
}

function showFormAddingList() {
    const $show = createElement('button', CLASS.showFormAddingList);
    $show.type = 'button';
    $show.insertAdjacentText('beforeend', '+ Добавьте еще одну колонку');
    $show.addEventListener('click', showHandler, false);

    return $show;
}

function buttonCloseFormAddingListHandler() {
    document.querySelector(CLASS.addingList).classList.remove('show');
    document.removeEventListener('click', hideHandler, true);
}

function buttonCloseFormAddingList() {
    const $close = createElement('button', CLASS.buttonCloseFormAddingList);
    $close.type = 'button';
    $close.insertAdjacentHTML('afterbegin', template.close);
    $close.addEventListener('click', buttonCloseFormAddingListHandler, false);

    return $close;
}

function buttonSubmitFieldInputFormAddingListHandler() {
    const id = parseInt(localStorage.getItem('id'), 10);
    const currentObjectBoard = store.find(id);

    const $input = document.querySelector(CLASS.fieldInputFormAddingList);

    const obj = {
        id: Date.now(),
        title: $input.value || 'Название',
        cards: []
    };

    currentObjectBoard.lists.push(obj);

    store.setLocalStorage(store.replace(currentObjectBoard));

    this.closest(CLASS.addingList).before(list(obj));

    $input.value = '';
    $input.focus();
}

const buttonSubmitFieldInputFormAddingList = () => {
    const $submit = createElement('input', CLASS.buttonSubmitFieldInputFormAddingList);
    $submit.type = 'button';
    $submit.value = 'Добавить список';
    $submit.addEventListener('click', buttonSubmitFieldInputFormAddingListHandler, false);

    return $submit;
};

function fieldInputFormAddingList() {
    const $input = createElement('input', CLASS.fieldInputFormAddingList);
    $input.type = 'text';
    $input.placeholder = 'Ввести заголовок списка';

    return $input;
}

function formAddingList() {
    const $addingList = createElement('div', CLASS.addingList);
    const $form = createElement('form', CLASS.formAddingList);
    const $action = createElement('div', CLASS.formAddingListAction);

    $action.append(buttonSubmitFieldInputFormAddingList(), buttonCloseFormAddingList());
    $form.append(fieldInputFormAddingList(), $action);
    $addingList.append(showFormAddingList(), $form);

    return $addingList;
}

export default formAddingList;