import DOMHelpers from '../../helpers/DOMHelpers';
import icons from '../../helpers/icons';
import store from '../../Store';
import board from './board';
import { CLASS, title } from '../boards';

const { createElement } = DOMHelpers();

function favoriteHandler(id, e) {
    e.preventDefault();

    const currentObjectFavoriteBoard = store.find(id);
    currentObjectFavoriteBoard.favorite = !currentObjectFavoriteBoard.favorite;

    const { href } = this.closest('.board');
    const container = document.querySelector('.boards-favorites');

    if (this.hasAttribute('data-favorite')) {
        this.removeAttribute('data-favorite');

        const boardsFavorites = Array.from(container.children);

        for (const board of boardsFavorites) {
            if (board.href === href) {
                board.remove();
                this.removeEventListener('click', favoriteHandler, false);
            }
        }

        const boards = Array.from(document.querySelector(CLASS.boards).children);

        for (const board of boards) {
            if (board.href === href) {
                board.querySelector('.btn-favorite').removeAttribute('data-favorite');
            }
        }

        if (!Array.from(document.querySelector(CLASS.boardsFavorites).children).length) {
            container.closest(CLASS.boardsSection).remove();
        }
    } else {
        this.setAttribute('data-favorite', '');

        if (!container) {
            const $section = createElement('section', CLASS.boardsSection);
            const $boards = createElement('div', CLASS.boardsFavorites);

            $section.append(
                title(`${icons.starBorder}<h3>Отмеченные доски</h3>`),
                $boards,
            );

            document
                .querySelector(CLASS.boardsWrapper)
                .prepend($section);
        }

        document
            .querySelector(CLASS.boardsFavorites)
            .appendChild(board(currentObjectFavoriteBoard));
    }

    store.setLocalStorage(store.replace(currentObjectFavoriteBoard));
}

export default favoriteHandler;