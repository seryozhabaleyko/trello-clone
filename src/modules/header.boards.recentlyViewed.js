import DOMHelpers from './helpers/DOMHelpers';
import icons from './helpers/icons';
import board from './header.boards.board';

const { createElement } = DOMHelpers();

const recentlyViewedBoards = (recentlyViewed) => {
    const title = createElement('div', '.section-title');
    title.insertAdjacentHTML(
        'afterbegin',
        '<span>Часто посещаемые доски</span>',
    );

    const icon = createElement('div', '.section-icon');
    icon.insertAdjacentHTML('afterbegin', icons.time);

    const header = createElement('div', '.section-header');
    header.append(icon, title);

    const body = createElement('div', '.section-body');

    recentlyViewed.forEach((obj) => {
        body.append(board(obj));
    });

    const section = createElement('div', '.section');
    section.append(header, body);

    return section;
};

export default recentlyViewedBoards;