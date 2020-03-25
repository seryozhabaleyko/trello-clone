'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import icons from '../helpers/icons';
import Template from '../Template.js';
import store from '../Store.js';
import list from '../List/list';

import '../../scss/board/board-add-list.scss';

const { createElement } = DOMHelpers();
const template = Template();

const className = {
    boardAddList: '.board-add-list',
    showFormAddingList: '.show-form-adding-list',
    formAddingList: '.form-adding-list',
    formAddingListInput: '.form-adding-list-input',
    formAddingListAction: '.form-adding-list-action',
    formAddingListClose: '.form-adding-list-close',
    formAddingListSubmit: '.form-adding-list-submit',
};

function hideHandler(e) {
    if (!e.target.closest(`${className.boardAddList}.show`)) {
        document.querySelector(`${className.boardAddList}.show`).classList.remove('show');
        document.removeEventListener('click', hideHandler, true);
    }
}

function showHandler(e) {
    e.target.parentNode.classList.add('show');
    document.querySelector(className.formAddingListInput).focus();
    document.addEventListener('click', hideHandler, true);
}

function showFormAddingList() {
    const $show = createElement('button', className.showFormAddingList);
    $show.type = 'button';
    $show.insertAdjacentHTML('afterbegin', icons.add);
    $show.insertAdjacentText('beforeend', 'Добавьте еще одну колонку');
    $show.addEventListener('click', showHandler, false);

    return $show;
}

function formAddingListSubmitHandler() {
    const id = parseInt(localStorage.getItem('id'), 10);
    const currentObjectBoard = store.find(id);

    const $input = document.querySelector(className.formAddingListInput);

    const obj = {
        id: Date.now(),
        title: $input.value || 'Название',
        cards: []
    };

    currentObjectBoard.lists.push(obj);

    store.setLocalStorage(store.replace(currentObjectBoard));

    this.closest(className.boardAddList).before(list(obj));

    $input.value = '';
    $input.focus();
}

const formAddingListSubmit = () => {
    const $submit = createElement('input', className.formAddingListSubmit);
    $submit.type = 'button';
    $submit.value = 'Добавить список';
    $submit.addEventListener('click', formAddingListSubmitHandler, false);

    return $submit;
};

function formAddingListCloseHandler() {
    document.querySelector(className.boardAddList).classList.remove('show');
    document.removeEventListener('click', hideHandler, true);
}

function formAddingListClose() {
    const $close = createElement('button', className.formAddingListClose);
    $close.type = 'button';
    $close.insertAdjacentHTML('afterbegin', template.close);
    $close.addEventListener('click', formAddingListCloseHandler, false);

    return $close;
}

function formAddingListInput() {
    const $input = createElement('input', className.formAddingListInput);
    $input.type = 'text';
    $input.placeholder = 'Ввести заголовок списка';

    return $input;
}

function formAddingList() {
    const $form = createElement('form', className.formAddingList);
    const $action = createElement('div', className.formAddingListAction);
    $action.append(formAddingListSubmit(), formAddingListClose());
    $form.append(formAddingListInput(), $action);

    return $form;
}

function addList() {
    const $addList = createElement('div', className.boardAddList);
    $addList.append(showFormAddingList(), formAddingList());

    return $addList;
}

export default addList;