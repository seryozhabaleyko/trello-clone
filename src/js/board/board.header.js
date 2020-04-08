import firebase from '../firebase';
import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
import '../../scss/board/board-header.scss';
import ripple from '../plugins/ripple';

const { createElement } = DOMHelpers();

const settings = () => {
    const $settings = createElement('button', '.boards-settings');
    $settings.insertAdjacentHTML('afterbegin', `${icons.settings}<span>Настройки</span>`);

    return $settings;
};

const handleActionFavorite = (e) => {
    const { target } = e;
    const $favorite = target.closest('#board-favorite');
    let value = null;

    if ($favorite.hasAttribute('favorite')) {
        $favorite.removeAttribute('favorite');
        value = false;
    } else {
        $favorite.setAttribute('favorite', '');
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
    const $button = createElement('button', '#board-favorite');
    $button.insertAdjacentHTML('afterbegin', icons.starBorder);

    ripple($button);

    if (data.favorite) {
        $button.setAttribute('favorite', '');
    }

    $button.addEventListener('click', handleActionFavorite, false);

    return $button;
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
    const content = text !== '' ? text : 'Название доки';

    const userId = firebase.auth().currentUser.uid;
    const boardId = localStorage.getItem('boardId');

    firebase.database()
        .ref(`users/${userId}/boards/${boardId}`)
        .child('title')
        .set(content);
};

const title = (data) => {
    const $title = createElement('h1', '#board-title');
    $title.textContent = data.title;
    $title.addEventListener('click', handleEditTitle, false);
    $title.addEventListener('blur', handleSaveTitle, false);

    return $title;
};

const header = (data) => {
    const $header = createElement('div', '#board-header');
    $header.append(title(data), favorite(data), createElement('div'), settings());

    return $header;
};

export default header;