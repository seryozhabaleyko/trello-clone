import DOMHelpers from './helpers/DOMHelpers';
import icons from './helpers/icons';
import headerBoards from './header/header.boards';
import profile from '../img/profile.jpg';
import firebase from './firebase';
import ripple from './plugins/ripple';
import '../scss/header.scss';

const { createElement } = DOMHelpers();

const logout = () => {
    firebase.auth().signOut();
};

const header = () => {
    const $home = createElement('a', '.home');
    $home.href = '/#boards';
    $home.insertAdjacentHTML('afterbegin', icons.home);
    ripple($home);

    const $boards = createElement('button', '.header-boards');
    $boards.insertAdjacentHTML('afterbegin', `${icons.trello}<span>доски</span>`);
    $boards.addEventListener('click', () => {
        const headerBoardsWrapper = document.getElementById('header-boards-wrapper');
        if (headerBoardsWrapper) {
            headerBoardsWrapper.remove();
            return;
        }
        headerBoards();
    }, false);

    ripple($boards);

    const $logo = createElement('a', '.logo');
    $logo.href = '/';
    $logo.textContent = '#лучшедома';

    const $profile = createElement('button', '#profile');
    $profile.addEventListener('click', logout, false);

    const $img = createElement('img', '#photoURL');
    $img.src = profile;
    $img.width = 32;
    $img.height = 32;
    $img.alt = 'Фото профиля';

    $profile.append($img);

    const $header = createElement('header');
    $header.append($home, $boards, $logo, createElement('div'), $profile);

    return $header;
};

export default header;