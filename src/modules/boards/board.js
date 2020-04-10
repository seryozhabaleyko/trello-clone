import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
import ripple from '../plugins/ripple';
// eslint-disable-next-line import/no-cycle
import marked from './board.marked';

const { createElement } = DOMHelpers();

const board = ({
    id, title, background, favorite,
}) => {
    const $markedButton = createElement('button', '.board-marked-button');
    $markedButton.setAttribute('data-marked', favorite);
    $markedButton.insertAdjacentHTML('afterbegin', icons.starBorder);
    $markedButton.addEventListener('click', marked.bind($markedButton, id), false);

    const $favorite = createElement('div', '.board-marked');
    $favorite.appendChild($markedButton);

    const $title = createElement('div', '.board-title');
    $title.textContent = title;

    const $details = createElement('div', '.board-details');
    $details.append($title, $favorite);

    const $link = createElement('a', '.board');
    $link.href = `/#board/${id}`;
    $link.setAttribute('data-board-id', id);
    $link.setAttribute('style', background);
    ripple($link);
    $link.append($details);

    return $link;
};

export default board;