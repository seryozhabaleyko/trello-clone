import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
import board from './board';
import addingBoard from './boards.adding';
import storeRecentlyViewed from '../store/storeRecentlyViewed';

const { createElement } = DOMHelpers();

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

const markedBoards = (data, wrapper) => {
    const $boardsSection = createElement('section', CLASS.boardsSection);
    const $boards = createElement('div', CLASS.boardsFavorites);

    data.forEach((iterator) => {
        $boards.appendChild(board(iterator));
    });

    wrapper
        .appendChild($boardsSection)
        .append(title(`${icons.star}<h3>Отмеченные доски</h3>`), $boards);
};

const recentlyViewedBoards = (wrapper) => {
    const $boardsSection = createElement('section', CLASS.boardsSection);
    const $boards = createElement('div', CLASS.boardsFavorites);

    storeRecentlyViewed.getLocalStorage().forEach((iterator) => {
        $boards.appendChild(board(iterator));
    });

    wrapper
        .appendChild($boardsSection)
        .append(title(`${icons.clock}<h3>Недавно просмотренное</h3>`), $boards);
};

const boards = () => {
    /* const favorite = data ? data.filter((iterator) => !!iterator.favorite) : null; */

    const $wrapper = createElement('div', CLASS.boardsWrapper);

    /* if (favorite && favorite.length > 0) {
        markedBoards(favorite, $wrapper);
    }

    if (storeRecentlyViewed.getLocalStorage().length > 0) {
        recentlyViewedBoards($wrapper);
    } */

    const $boards = createElement('div', CLASS.boards);

    /* if (data && data.length > 0) {
        data.forEach((iterator) => {
            $boards.appendChild(board(iterator));
        });
    } */

    $boards.append(addingBoard());

    const $boardsSection = createElement('section', CLASS.boardsSection);
    $boardsSection.append(title(`${icons.user}<h3>Персональные доски</h3>`), $boards);

    $wrapper.append($boardsSection);

    return $wrapper;
};

export default boards;