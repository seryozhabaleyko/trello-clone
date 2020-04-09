import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
import store from '../store/Store';
import storeRecentlyViewed from '../store/storeRecentlyViewed';
import favoriteButton from '../button/favorite.button';

const { createElement } = DOMHelpers();

const CLASS = {
    boardsMenuPopover: '.boards-menu-popover',

    boardHorizontal: '.board-horizontal',
    boardHorizontalTitle: '.board-horizontal-title',
    boardHorizontalBackground: '.board-horizontal-background',
    boardHorizontalImage: '.board-horizontal-image',
};

const boardsMenuPopover = () => {
    const $menu = createElement('div', CLASS.boardsMenuPopover);

    const boardHorizontal = ({
        id, title, background, favorite,
    }) => {
        const $link = createElement('a', CLASS.boardHorizontal);
        $link.href = `/#board/${id}`;
        $link.title = title;

        const $title = createElement('div', CLASS.boardHorizontalTitle);
        $title.textContent = title;

        const $background = createElement('div', CLASS.boardHorizontalBackground);
        const styles = `${background}; background-color: rgb(171, 203, 215);`;
        $background.setAttribute('style', styles);

        const $img = createElement('div', CLASS.boardHorizontalImage);
        $img.setAttribute('style', background);

        const $favorite = createElement('div', '.board-horizontal-favorite');
        $favorite.setAttribute('favorite', favorite);
        $favorite.appendChild(favoriteButton(id));

        $link.append($background, $img, $title, $favorite);

        return $link;
    };

    const markedBoards = (favorites) => {
        const $section = createElement('div', '.section');
        const $sectionHeader = createElement('div', '.section-header');
        const $sectionIcons = createElement('div', '.section-icon');
        const $sectionTitle = createElement('div', '.section-title');
        const $sectionBody = createElement('div', '.section-body');

        $sectionIcons.insertAdjacentHTML('afterbegin', icons.time);
        $sectionTitle.insertAdjacentHTML('afterbegin', '<span>Отмеченные доски</span>');
        $sectionHeader.append($sectionIcons, $sectionTitle);

        favorites.forEach((boards) => {
            $sectionBody.appendChild(boardHorizontal(boards));
        });

        $section.append($sectionHeader, $sectionBody);

        return $section;
    };

    const recentlyViewedBoards = (recentlyViewed) => {
        const $section = createElement('div', '.section');
        const $sectionHeader = createElement('div', '.section-header');
        const $sectionIcons = createElement('div', '.section-icon');
        const $sectionTitle = createElement('div', '.section-title');
        const $sectionBody = createElement('div', '.section-body');

        $sectionIcons.insertAdjacentHTML('afterbegin', icons.time);
        $sectionTitle.insertAdjacentHTML('afterbegin', '<span>Часто посещаемые доски</span>');
        $sectionHeader.append($sectionIcons, $sectionTitle);

        recentlyViewed.forEach((boards) => {
            $sectionBody.appendChild(boardHorizontal(boards));
        });

        $section.append($sectionHeader, $sectionBody);

        return $section;
    };

    const personalBoards = (boards) => {
        const $section = createElement('div', '.section');
        const $sectionHeader = createElement('div', '.section-header');
        const $sectionIcons = createElement('div', '.section-icon');
        const $sectionTitle = createElement('div', '.section-title');
        const $sectionBody = createElement('div', '.section-body');

        $sectionIcons.insertAdjacentHTML('afterbegin', icons.personOutline);
        $sectionTitle.insertAdjacentHTML('afterbegin', '<span>Персональные доски</span>');
        $sectionHeader.append($sectionIcons, $sectionTitle);

        boards.forEach((board) => {
            $sectionBody.appendChild(boardHorizontal(board));
        });

        $section.append($sectionHeader, $sectionBody);

        return $section;
    };

    const boards = store.getLocalStorage();
    const favorites = boards.filter((board) => !!board.favorite);
    const recentlyViewed = storeRecentlyViewed.getLocalStorage();

    $menu.append(
        markedBoards(favorites),
        recentlyViewedBoards(recentlyViewed),
        personalBoards(boards),
    );

    document.body.appendChild($menu);

    function hideMenuPopover(e) {
        if (!e.target.closest(CLASS.boardsMenuPopover)) {
            $menu.remove();
            document.removeEventListener('click', hideMenuPopover, true);
        }
    }

    document.addEventListener('click', hideMenuPopover, true);

    return $menu;
};

export default boardsMenuPopover;