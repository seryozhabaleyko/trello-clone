import DOMHelpers from './helpers/DOMHelpers';
import icons from './helpers/icons';
import board from './header.boards.board';

const { createElement } = DOMHelpers();

const markedBoards = (marked) => {
    const title = createElement('div', '.section-title');
    title.insertAdjacentHTML('afterbegin', '<span>Отмеченные доски</span>');

    const icon = createElement('div', '.section-icon');
    icon.insertAdjacentHTML('afterbegin', icons.star);

    const header = createElement('div', '.section-header');
    header.append(icon, title);

    const body = createElement('div', '.section-body');

    marked.forEach((obj) => {
        body.append(board(obj));
    });

    const section = createElement('div', '.section');
    section.append(header, body);

    return section;
};

export default markedBoards;