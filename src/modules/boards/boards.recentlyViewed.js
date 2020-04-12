import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';

const { createElement } = DOMHelpers();

const recentlyViewedBoards = () => {
    const $title = document.createElement('h3');
    $title.textContent = 'Недавно просмотренное';

    const $header = createElement('div', '.boards-header');
    $header.insertAdjacentHTML('afterbegin', icons.view);
    $header.append($title);

    const $boards = createElement('div', '.boards-recentlyViewed');

    const $section = createElement('section', '.boards-section');
    $section.append($header, $boards);

    return $section;
};

export default recentlyViewedBoards;