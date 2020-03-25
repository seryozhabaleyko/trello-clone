'use strict';

import DOMHelpers from '../../helpers/DOMHelpers';
import icons from '../../helpers/icons';
import store from '../../Store';
import board from './board';

const { createElement } = DOMHelpers();

function title(template) {
    const $title = createElement('div', '.boards-header');
    $title.insertAdjacentHTML('afterbegin', template);

    return $title;
}

function favorites(id, e) {
    e.preventDefault();

    const currentObjectFavoriteBoard = store.find(id);
    currentObjectFavoriteBoard.favorite = !currentObjectFavoriteBoard.favorite;

    const href = this.closest('.board').href;
    const container = document.querySelector('.boards-favorites');

    if (this.hasAttribute('data-favorite')) {
        this.removeAttribute('data-favorite');

        const boardsFavorites = Array.from(container.children);

        for (const board of boardsFavorites) {
            if (board.href === href) { board.remove(); }
        }

        const boards = Array.from(document.querySelector('.boards').children);

        for (const board of boards) {
            if (board.href === href) {
                board.querySelector('.btn-favorite').removeAttribute('data-favorite');
            }
        }

        if (!Array.from(document.querySelector('.boards-favorites').children).length) {
            container.closest('.boards-section').remove();
        }
    } else {
        this.setAttribute('data-favorite', '');

        if (!container) {
            const $section = createElement('section', '.boards-section');
            const $boards = createElement('div', '.boards-favorites');

            $section.append(
                title(icons.starBorder),
                $boards
            );

            document
                .querySelector('.boards-wrapper')
                .prepend($section);
        }

        document.querySelector('.boards-favorites').appendChild(board(currentObjectFavoriteBoard));
    }

    store.setLocalStorage(store.replace(currentObjectFavoriteBoard));
}

export default favorites;