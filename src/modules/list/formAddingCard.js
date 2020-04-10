import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
import card from '../card/card';
import firebase from '../firebase';
import { handleHideForm } from './list.footer';
import '../../scss/board/form-adding-card.scss';

const { createElement } = DOMHelpers();

const writeCardData = (listId, obj) => {
    const boardId = localStorage.getItem('boardId');
    const userId = firebase.auth().currentUser.uid;
    firebase.database()
        .ref(`users/${userId}/boards/${boardId}/lists/${listId}/cards/${obj.id}`).set(obj);
};

const handleClose = (form, inputField) => {
    form.hide();
    inputField.value = '';
    const $footer = form.parentNode.nextSibling;
    $footer.show();
    document.removeEventListener('click', handleHideForm, true);
};

const handleSubmit = (listNode, form, inputField, e) => {
    e.preventDefault();

    const title = inputField.value;

    if (!title) {
        inputField.focus();
        return;
    }

    let order = listNode.querySelectorAll('.card').length;
    order += 1;
    const listId = Number(listNode.getAttribute('data-list-id'));
    const obj = { id: Date.now(), title, order };

    writeCardData(listId, obj);

    inputField.value = '';
    form.before(card(obj));
    inputField.focus();
};

const formAddingCard = (listNode) => {
    const $form = createElement('form', '.form-adding-card');
    $form.hide();

    const $inputField = createElement('textarea', '.field-input-form-adding-card');
    $inputField.placeholder = 'Ввести заголовок для этой карточки';

    const $submit = createElement('input', '.button-submit-field-input-form-adding-card');
    $submit.setAttribute('type', 'submit');
    $submit.setAttribute('value', 'Добавить карточку');
    $submit.addEventListener('click', handleSubmit.bind($submit, listNode, $form, $inputField));

    const $close = createElement('button', '.button-close-field-input-form-adding-card');
    $close.setAttribute('type', 'button');
    $close.insertAdjacentHTML('afterbegin', icons.close);
    $close.addEventListener('click', handleClose.bind($close, $form, $inputField));

    const $action = createElement('div', '.form-adding-card-action');
    $action.append($submit, $close);

    $form.append($inputField, $action);

    return $form;
};

export default formAddingCard;