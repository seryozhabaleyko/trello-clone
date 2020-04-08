import firebase from '../firebase';
import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';

const { createElement } = DOMHelpers();

const CLASS = {
    listHeader: '.list-header',
    listTitle: '.list-title',
    listMore: '.list-more',
    listMoreToggle: '.list-more-toggle',
    listMoreMenuPopover: '.list-more-menu-popover',
    listMoreMenu: '.list-more-menu',
    listMoreItem: '.list-more-item',
};

const handleSaveTitle = (e) => {
    const { target } = e;
    target.removeAttribute('contenteditable');

    const text = target.textContent.trim();
    const content = text !== '' ? text : 'Название листа';

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

const title = (text) => {
    const $title = createElement('span', CLASS.listTitle);
    $title.textContent = text;

    $title.addEventListener('click', handleEditTitle, false);
    $title.addEventListener('blur', handleSaveTitle, false);

    return $title;
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

        list.remove();
    };

    const remove = () => {
        const $link = createElement('a', CLASS.listMoreItem);
        $link.href = '#';
        $link.insertAdjacentHTML('afterbegin', `${icons.remove}<span>Удаление списка</span>`);

        $link.addEventListener('click', removeHandler, false);

        return $link;
    };

    const $popover = createElement('div', CLASS.listMoreMenuPopover);
    const $menu = createElement('div', CLASS.listMoreMenu);
    $menu.append(remove());

    $popover.append($menu);

    return $popover;
};

const handleActionCloseMore = () => {
    document.querySelector(`${CLASS.listMore}.show`).classList.remove('show');
    window.removeEventListener('click', handleActionCloseMore, true);
};

const handleActionMore = (e) => {
    const { target } = e;
    target.closest(`${CLASS.listMore}`).classList.toggle('show');
    window.addEventListener('click', handleActionCloseMore, true);
};

const more = (list) => {
    const $toggle = createElement('button', CLASS.listMoreToggle);
    $toggle.insertAdjacentHTML('afterbegin', icons.moreHoriz);
    $toggle.addEventListener('click', handleActionMore, false);

    const $more = createElement('div', CLASS.listMore);
    $more.append($toggle, menu(list));

    return $more;
};

const header = (data, list) => {
    const $header = createElement('div', CLASS.listHeader);
    $header.append(title(data.title), more(list));

    return $header;
};

export default header;