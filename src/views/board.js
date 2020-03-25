'use strict';

import DOMHelpers from '../js/helpers/DOMHelpers.js';
import store from '../js/Store';
import ripple from '../js/plugins/ripple';
import header from '../js/header';
import boardHeader from '../js/Board/boardHeader';
import addList from '../js/Board/boardAddList';
import list from '../js/List/list';

import '../scss/board/board.scss';

const { createElement } = DOMHelpers();

function board(root, { id }) {
    localStorage.setItem('id', id);
    const currentObjectBoard = store.find(id);

    root.setAttribute('style', currentObjectBoard.background);

    const $main = createElement('main', '#board-body');
    const $board = createElement('div', '#board');
    const $boardLists = createElement('div', '#board-lists');

    if (currentObjectBoard.lists) {
        for (const iterator of currentObjectBoard.lists) {
            $boardLists.appendChild(list(iterator));
        }
    }

    $board.appendChild($boardLists).appendChild(addList());
    $main.append(boardHeader(currentObjectBoard), $board);

    root.append(header(), $main);

    ripple(
        Array.from(document.querySelectorAll('[ripple]'))
    );
}

export default board;