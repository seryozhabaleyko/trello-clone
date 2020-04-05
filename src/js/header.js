import DOMHelpers from './helpers/DOMHelpers';
import icons from './helpers/icons';
import boardsMenuPopover from './header/boardsMenuPopover';
import '../scss/header.scss';
import man from '../img/man.png';
import firebase from './firebase';

const { createElement } = DOMHelpers();

const CLASS = {
    header: '.header',
    logo: '.logo',
    home: '.home',
    boardsMenuPopover: '.boards-menu-popover',
};

const logout = () => {
    firebase.auth().signOut();
};

const header = () => {
    const $home = createElement('a', CLASS.home);
    $home.href = '/#boards';
    $home.insertAdjacentHTML('afterbegin', icons.home);

    const $boards = createElement('button', '.header-boards');
    $boards.insertAdjacentHTML('afterbegin', `${icons.trello}<span>доски</span>`);
    $boards.addEventListener('click', boardsMenuPopover, false);

    const $logo = createElement('a', CLASS.logo);
    $logo.href = '/';
    $logo.textContent = 'kanban';

    const $profile = createElement('button', '#profile');
    $profile.addEventListener('click', logout, false);

    const $img = createElement('img', '');
    $img.src = man;
    $img.width = 32;
    $img.height = 32;
    $img.alt = 'Фото профиля';

    $profile.appendChild($img);

    const $header = createElement('header');
    $header.append($home, $boards, $logo, createElement('div'), $profile);

    return $header;
};

export default header;