import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';

const { createElement } = DOMHelpers();

const markedBoards = () => {
    const $title = document.createElement('h3');
    $title.textContent = 'Отмеченные доски';

    const $header = createElement('div', '.boards-header');
    $header.insertAdjacentHTML('afterbegin', icons.star);
    $header.append($title);

    const $boards = createElement('div', '.boards-marked');

    const $section = createElement('section', '.boards-section');
    $section.append($header, $boards);

    return $section;
};

export default markedBoards;