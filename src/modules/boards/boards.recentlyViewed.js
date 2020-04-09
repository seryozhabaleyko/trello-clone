import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
import storeRecentlyViewed from '../store/storeRecentlyViewed';
import board from './board';

const { createElement } = DOMHelpers();

const recentlyViewedBoards = () => {
    const $title = document.createElement('h3');
    $title.textContent = 'Недавно просмотренное';

    const $header = createElement('div', '.boards-header');
    $header.insertAdjacentHTML('afterbegin', icons.clock);
    $header.append($title);

    const $boards = createElement('div', '.boards-recentlyViewed');

    storeRecentlyViewed.getLocalStorage().forEach((obj) => {
        $boards.append(board(obj));
    });

    const $section = createElement('section', '.boards-section');
    $section.append($header, $boards);

    return $section;
};

export default recentlyViewedBoards;