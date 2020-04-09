import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
import list from '../List/list';

import firebase from '../firebase';

import '../../scss/board/form-adding-list.scss';

const writeListData = (obj) => {
    const boardId = localStorage.getItem('boardId');
    const userId = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`users/${userId}/boards/${boardId}/lists/${obj.id}`);

    ref.set(obj)
        .then(() => ref.once('value'))
        .then((snapshot) => {
            const data = snapshot.val();
            localStorage.setItem('lists-test', JSON.stringify(data));
        });
};

const { createElement } = DOMHelpers();

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
    $close.insertAdjacentHTML('afterbegin', icons.close);
    $close.addEventListener('click', buttonCloseFormAddingListHandler, false);

    return $close;
}

function buttonSubmitFieldInputFormAddingListHandler() {
    const $input = document.querySelector(CLASS.fieldInputFormAddingList);
    const title = $input.value || 'Название списка';
    let order = document.querySelectorAll('.list').length;
    order += 1;

    const obj = {
        id: Date.now(),
        title,
        order,
    };

    writeListData(obj);

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