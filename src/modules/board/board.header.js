import firebase from '../firebase';
import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
import '../../scss/board/board-header.scss';
import ripple from '../plugins/ripple';

const { createElement } = DOMHelpers();

const menu = () => {
    const boardMenu = createElement('button', '#board-menu');
    boardMenu.insertAdjacentHTML(
        'afterbegin',
        `${icons.moreHoriz}<span>Меню</span>`,
    );
    boardMenu.addEventListener('click', () => {
        boardMenu.classList.add('hide');
        document.getElementById('board-wrapper').classList.add('show-menu');
        document.getElementById('board-details').classList.remove('hide');
    });

    return boardMenu;
};

const handleActionFavorite = (e) => {
    const { target } = e;
    const favorite = target.closest('#board-favorite');
    let value = null;

    if (favorite.hasAttribute('favorite')) {
        favorite.removeAttribute('favorite');
        value = false;
    } else {
        favorite.setAttribute('favorite', '');
        value = true;
    }

    const userId = firebase.auth().currentUser.uid;
    const boardId = localStorage.getItem('boardId');

    firebase.database()
        .ref(`users/${userId}/boards/${boardId}`)
        .child('favorite')
        .set(value);
};

const favorite = (data) => {
    const button = createElement('button', '#board-favorite');
    button.insertAdjacentHTML('afterbegin', icons.starBorder);

    if (data.favorite) {
        button.setAttribute('favorite', '');
    }

    button.addEventListener('click', handleActionFavorite, false);

    ripple(button);

    return button;
};

const handleEditTitle = (e) => {
    const { target } = e;
    target.setAttribute('contenteditable', 'true');
    target.focus();
};

const handleSaveTitle = (e) => {
    const { target } = e;
    target.removeAttribute('contenteditable');

    const text = target.textContent.trim();
    const content = text || 'Название доки';

    const userId = firebase.auth().currentUser.uid;
    const boardId = localStorage.getItem('boardId');

    firebase.database().ref(`users/${userId}/boards/${boardId}`)
        .child('title').set(content);
};

const header = (data) => {
    const title = createElement('h1', '#board-title');
    title.textContent = data.title;
    title.addEventListener('click', handleEditTitle, false);
    title.addEventListener('blur', handleSaveTitle, false);

    const boardHeader = createElement('div', '#board-header');
    boardHeader.append(title, favorite(data), createElement('div'), menu());

    return boardHeader;
};

export default header;