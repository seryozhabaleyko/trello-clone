import DOMHelpers from './helpers/DOMHelpers';
import favoriteButton from './button/favorite.button';

const { createElement } = DOMHelpers();

const board = ({
    id, title, background, favorite,
}) => {
    const $link = createElement('a', '.board-horizontal');
    $link.href = `/#board/${id}`;
    $link.title = title;

    const $title = createElement('div', '.board-horizontal-title');
    $title.textContent = title;

    const $background = createElement('div', '.board-horizontal-background');
    const styles = `${background}; background-color: rgb(171, 203, 215);`;
    $background.setAttribute('style', styles);

    const $img = createElement('div', '.board-horizontal-image');
    $img.setAttribute('style', background);

    const $favorite = createElement('div', '.board-horizontal-favorite');
    $favorite.setAttribute('favorite', favorite);
    $favorite.append(favoriteButton(id));

    $link.append($background, $img, $title, $favorite);

    return $link;
};

export default board;