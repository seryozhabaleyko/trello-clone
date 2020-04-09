import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
import menu from './board.details.menu';
import '../../scss/board/board-details.scss';

const { createElement } = DOMHelpers();

const boardDetails = () => {
    const $close = createElement('button', '#board-details-close');
    $close.insertAdjacentHTML('afterbegin', icons.cancel);

    $close.addEventListener('click', () => {
        document.getElementById('board-wrapper').classList.remove('show-menu');
        document.getElementById('board-details').classList.add('hide');
        document.getElementById('board-menu').classList.remove('hide');
    });

    const $title = createElement('h3', '#board-details-title');
    $title.textContent = 'Меню';

    const $back = createElement('button', '#board-details-back');
    $back.style.display = 'none';
    $back.insertAdjacentHTML('afterbegin', icons.back);

    const $header = createElement('div', '#board-details-header');
    $header.append($back, $title, $close);

    const $main = createElement('div', '#board-details-main');
    $main.append(menu());

    const $details = createElement('div', '#board-details');
    $details.classList.add('hide');
    $details.append($header, $main);

    return $details;
};

export default boardDetails;