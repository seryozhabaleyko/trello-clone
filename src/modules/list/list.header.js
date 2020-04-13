import firebase from '../firebase';
import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';

const { createElement } = DOMHelpers();

const handleSaveTitle = (e) => {
    const { target } = e;
    target.removeAttribute('contenteditable');

    const text = target.textContent.trim();
    const content = text || 'Название листа';

    const listId = target.closest('.list').getAttribute('data-list-id');
    const boardId = localStorage.getItem('boardId');
    const userId = firebase.auth().currentUser.uid;

    firebase.database()
        .ref(`users/${userId}/boards/${boardId}/lists/${listId}`)
        .child('title')
        .set(content);
};

const handleEditTitle = (e) => {
    const { target } = e;
    target.setAttribute('contenteditable', 'true');
    target.focus();
};

const menu = (list) => {
    const removeHandler = (e) => {
        e.preventDefault();

        const userId = firebase.auth().currentUser.uid;
        const boardId = localStorage.getItem('boardId');
        const listId = list.getAttribute('data-list-id');

        firebase.database()
            .ref(`users/${userId}/boards/${boardId}/lists/${listId}`)
            .remove();

        window.navigator.vibrate(1000);

        list.remove();
    };

    const $link = createElement('a', '.list-more-item');
    $link.href = '#';
    $link.insertAdjacentHTML(
        'afterbegin',
        `${icons.remove}<span>Удаление списка</span>`,
    );
    $link.addEventListener('click', removeHandler, false);

    const $menu = createElement('div', '.list-more-menu');
    $menu.append($link);

    const $popover = createElement('div', '.list-more-menu-popover');
    $popover.append($menu);

    return $popover;
};

const handleActionCloseMore = () => {
    document.querySelector('.list-more.show').classList.remove('show');
    window.removeEventListener('click', handleActionCloseMore, true);
};

const handleActionMore = (e) => {
    const { target } = e;
    target.closest('.list-more').classList.toggle('show');
    window.addEventListener('click', handleActionCloseMore, true);
};

const header = (data, list) => {
    const $toggle = createElement('button', '.list-more-toggle');
    $toggle.insertAdjacentHTML('afterbegin', icons.moreHoriz);
    $toggle.addEventListener('click', handleActionMore, false);

    const $more = createElement('div', '.list-more');
    $more.append($toggle, menu(list));

    const $title = createElement('span', '.list-title');
    $title.textContent = data.title;
    $title.addEventListener('click', handleEditTitle, false);
    $title.addEventListener('blur', handleSaveTitle, false);

    const $header = createElement('div', '.list-header');
    $header.append($title, $more);

    return $header;
};

export default header;