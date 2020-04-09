import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
import list from '../list/list';
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

const hideHandler = (e) => {
    const { target } = e;
    if (!target.closest('.adding-list.show')) {
        document.querySelector('.adding-list.show').classList.remove('show');
        document.removeEventListener('click', hideHandler, true);
    }
};

const showHandler = (e) => {
    const { target } = e;
    target.parentNode.classList.add('show');
    document.querySelector('.field-input-form-adding-list').focus();
    document.addEventListener('click', hideHandler, true);
};

const handleClose = (e) => {
    const { target } = e;
    target.closest('.adding-list').classList.remove('show');
    document.removeEventListener('click', hideHandler, true);
};

const handleSubmit = (e) => {
    const { target } = e;

    const $input = document.querySelector('.field-input-form-adding-list');
    const title = $input.value || 'Название списка';
    let order = document.querySelectorAll('.list').length;
    order += 1;

    const obj = {
        id: Date.now(),
        title,
        order,
    };

    writeListData(obj);

    target.closest('.adding-list').before(list(obj));

    $input.value = '';
    $input.focus();
};

const formAddingList = () => {
    const $close = createElement('button', '.button-close-form-adding-list');
    $close.type = 'button';
    $close.insertAdjacentHTML('afterbegin', icons.close);
    $close.addEventListener('click', handleClose, false);

    const $submit = createElement('input', '.button-submit-field-input-form-adding-list');
    $submit.type = 'button';
    $submit.value = 'Добавить список';
    $submit.addEventListener('click', handleSubmit, false);

    const $action = createElement('div', '.form-adding-list-action');
    $action.append($submit, $close);

    const $input = createElement('input', '.field-input-form-adding-list');
    $input.type = 'text';
    $input.placeholder = 'Ввести заголовок списка';

    const $form = createElement('form', '.form-adding-list');
    $form.append($input, $action);

    const $show = createElement('button', '.show-form-adding-list');
    $show.type = 'button';
    $show.insertAdjacentText('beforeend', '+ Добавьте еще одну колонку');
    $show.addEventListener('click', showHandler, false);

    const $addingList = createElement('div', '.adding-list');
    $addingList.append($show, $form);

    return $addingList;
};

export default formAddingList;