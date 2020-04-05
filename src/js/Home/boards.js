import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
import store from '../Store';
import board from './board/board';
import addingBoard from './addingBoard';
import storeRecentlyViewed from '../Store/storeRecentlyViewed';

const { createElement } = DOMHelpers();

const object = store.getLocalStorage();
const favorite = object.filter(board => !!board.favorite);

export const CLASS = {
    boardsWrapper: '.boards-wrapper',
    boardsSection: '.boards-section',
    boardsFavorites: '.boards-favorites',
    boardsHeader: '.boards-header',
    boards: '.boards',
};

export const title = (template) => {
    const $title = createElement('div', CLASS.boardsHeader);
    $title.insertAdjacentHTML('afterbegin', template);

    return $title;
};

const markedBoards = (wrapper) => {
    const $boardsSection = createElement('section', CLASS.boardsSection);
    const $boards = createElement('div', CLASS.boardsFavorites);

    for (const iterator of favorite) {
        $boards.appendChild(board(iterator));
    }

    wrapper
        .appendChild($boardsSection)
        .append(
            title(`${icons.star}<h3>Отмеченные доски</h3>`),
            $boards,
        );
};

const recentlyViewedBoards = (wrapper) => {
    const $boardsSection = createElement('section', CLASS.boardsSection);
    const $boards = createElement('div', CLASS.boardsFavorites);

    for (const iterator of storeRecentlyViewed.getLocalStorage()) {
        $boards.appendChild(board(iterator));
    }

    wrapper
        .appendChild($boardsSection)
        .append(
            title(`${icons.clock}<h3>Недавно просмотренное</h3>`),
            $boards,
        );
};

const boards = () => {
    const $wrapper = createElement('div', CLASS.boardsWrapper);

    if (favorite.length > 0) {
        markedBoards($wrapper);
    }

    if (storeRecentlyViewed.getLocalStorage().length > 0) {
        recentlyViewedBoards($wrapper);
    }

    const $boardsSection = createElement('section', CLASS.boardsSection);
    const $boards = createElement('div', CLASS.boards);

    if (object.length > 0) {
        for (const iterator of object) {
            $boards.appendChild(board(iterator));
        }
    }

    $boards.appendChild(addingBoard());

    $wrapper
        .appendChild($boardsSection)
        .append(
            title(`${icons.user}<h3>Персональные доски</h3>`),
            $boards,
        );

    return $wrapper;
};

export default boards;