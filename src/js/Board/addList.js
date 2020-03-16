'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import Template from '../Template.js';
import Store from '../Store.js';
import List from './List.js';

const { createElement, on, off } = DOMHelpers();
const template = Template();
const store = Store();
const list = List();

function hideHandler(e) {
    if (!e.target.closest('.add-list.show')) {
        document
            .querySelector('.add-list.show')
            .classList.remove('show');
        off(document, 'click', hideHandler, true);
    }
}

function showHandler(e) {
    e.target.parentElement.classList.add('show');

    const $input = document.querySelector('.form-add-list-input');
    $input.focus();

    on(document, 'click', hideHandler, true);
}

const show = () => {
    const $show = createElement('div', '.show-form-add-list');
    $show.insertAdjacentText('afterbegin', '+ Добавьте еще одну колонку');

    $show.addEventListener('click', showHandler, false);

    return $show;
};

const form = () => {

    const input = () => {
        const $input = createElement('input', '.form-add-list-input');
        $input.type = 'text';
        $input.placeholder = 'Ввести заголовок списка';

        return $input;
    };

    function submitHandler() {
        const obj = store.find(localStorage.getItem('id'));
        const $input = document.querySelector('.form-add-list-input');

        const qwe = {
            id: Date.now(),
            title: $input.value,
            cards: []
        };

        obj.lists.push(qwe);

        store.setLocalStorage(store.getLocalStorage().map(board => board.id === obj.id ? obj : board));

        const $lists = document.getElementById('lists');

        $lists.appendChild(list.insert(qwe));
        $input.value = '';
        $input.focus();
    }

    const submit = () => {
        const $submit = createElement('input', '.form-add-list-submit');
        $submit.type = 'button';
        $submit.value = 'Добавить список';

        $submit.addEventListener('click', submitHandler, false);

        return $submit;
    };

    function closeHandler() {
        const form = document.querySelector('.add-list');
        form.classList.remove('show');
        off(document, 'click', hideHandler, true);
    }

    const close = () => {
        const $close = createElement('button', '.form-add-list-close');
        $close.type = 'button';
        $close.insertAdjacentHTML('afterbegin', template.close);

        $close.addEventListener('click', closeHandler, false);

        return $close;
    };

    const $form = createElement('form', '.form-add-list');
    const $action = createElement('form', '.form-add-list-action');

    $action.append(submit(), close());

    $form.append(input(), $action);

    return $form;
};

const addList = () => {
    const $addList = createElement('div', '.add-list');

    $addList.append(show(), form());

    return $addList;
};

export default addList;