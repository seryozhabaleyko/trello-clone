import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
import card from '../card/card';
import firebase from '../firebase';
import { hideFormHandler } from './list.footer';
import '../../scss/board/form-adding-card.scss';

const { createElement } = DOMHelpers();

const writeCardData = (listId, obj) => {
    const boardId = localStorage.getItem('boardId');
    const userId = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`users/${userId}/boards/${boardId}/lists/${listId}/cards/${obj.id}`);

    ref.set(obj)
        .then(() => ref.once('value'))
        .then((snapshot) => {
            const data = snapshot.val();
            localStorage.setItem('cards-test', JSON.stringify(data));
        });
};

function closeHandler(root, input) {
    root.hide();
    input.value = '';
    const $footer = root.parentNode.nextSibling;
    $footer.show();

    document.removeEventListener('click', hideFormHandler, true);
}

function submitHandler(listNode, form, input, e) {
    e.preventDefault();

    const listID = parseInt(listNode.getAttribute('data-list-id'), 10);

    let order = listNode.querySelectorAll('.card').length;
    order += 1;

    const obj = {
        id: Date.now(),
        title: input.value || 'Название карточки',
        order,
    };

    writeCardData(listID, obj);

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