import DOMHelpers from '../helpers/DOMHelpers';

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

    const $img = createElement('div', '.board-horizontal-image');

    setTimeout(() => {
        $background.setAttribute('style', styles);
        $img.setAttribute('style', background);
    }, 250);

    const $favorite = createElement('div', '.board-horizontal-favorite');
    $favorite.setAttribute('favorite', favorite);

    $link.append($background, $img, $title, $favorite);

    return $link;
};

export default board;