import DOMHelpers from '../js/helpers/DOMHelpers';
import store from '../js/Store';
import header from '../js/header';
import boardHeader from '../js/board/board.header';
import formAddingList from '../js/board/formAddingList';
import list from '../js/List/list';
import storeRecentlyViewed from '../js/Store/storeRecentlyViewed';
import '../scss/board/board.scss';

const { createElement } = DOMHelpers();

const ID = {
    boardBody: '#board-body',
    board: '#board',
    boardLists: '#board-lists',
};

function board(root, { id }) {
    localStorage.setItem('id', id);
    const currentObjectBoard = store.find(id);
    storeRecentlyViewed.insert(currentObjectBoard);

    root.setAttribute('style', currentObjectBoard.background);

    const $main = createElement('main', ID.boardBody);
    const $board = createElement('div', ID.board);
    const $boardLists = createElement('div', ID.boardLists);

    const { lists } = currentObjectBoard;

    if (lists) {
        lists.forEach((item) => {
            $boardLists.appendChild(list(item));
        });
    }

    $board.appendChild($boardLists).appendChild(formAddingList());
    $main.append(boardHeader(currentObjectBoard), $board);

    root.append(header(), $main);
}

export default board;