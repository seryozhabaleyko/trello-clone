'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import Add from './Add.js';
import List from './List.js';

const add = Add();
const list = List();


const {
    createElement
} = DOMHelpers();

const board = (obj) => {
    const $main = createElement('div', '#main');
    $main.style.background = obj.bg;

    const $board = createElement('div', '#board');
    const $lists = createElement('div', '#lists');

    if (obj.lists) {
        obj.lists.forEach(list => {
            
        });
    }
    //$lists.appendChild();

    $board.append($lists, add.list());
    $main.appendChild($board);

    return $main;
}

export default board;