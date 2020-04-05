import DOMHelpers from '../../helpers/DOMHelpers';
import icons from '../../helpers/icons';
import ripple from '../../plugins/ripple';
import favoriteHandler from './favorite';

const board = ({
    id, title, background, favorite,
}) => {
    const { createElement } = DOMHelpers();

    const CLASS = {
        board: '.board',
        boardDetails: '.board-details',
        boardTitle: '.board-title',
        boardFavorite: '.board-favorite',
        btnFavorite: '.btn-favorite',
    };

    const $link = createElement('a', CLASS.board);
    $link.href = `/#board/${id}`;
    $link.setAttribute('style', background);

    ripple($link);

    const $details = createElement('div', CLASS.boardDetails);

    const $title = createElement('div', CLASS.boardTitle);
    $title.textContent = title;

    const $favorite = createElement('div', CLASS.boardFavorite);

    const $btn = createElement('button', CLASS.btnFavorite);

    if (favorite) {
        $btn.setAttribute('data-favorite', '');
    }

    $btn.insertAdjacentHTML('afterbegin', icons.starBorder);
    $btn.addEventListener('click', favoriteHandler.bind($btn, id), false);

    $favorite.appendChild($btn);
    $details.append($title, $favorite);
    $link.appendChild($details);

    return $link;
};

export default board;