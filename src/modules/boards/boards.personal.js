import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
import boardAdding from './boards.adding';

const { createElement } = DOMHelpers();

const boardsPersonal = () => {
    const $title = document.createElement('h3');
    $title.textContent = 'Персональные доски';

    const $header = createElement('div', '.boards-header');
    $header.insertAdjacentHTML('afterbegin', icons.user);
    $header.append($title);

    const $boards = createElement('div', '.boards');
    $boards.append(boardAdding());

    const $section = createElement('section', '.boards-section');
    $section.append($header, $boards);

    return $section;
};

export default boardsPersonal;