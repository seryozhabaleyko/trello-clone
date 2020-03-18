'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import header from './header.js';
import addList from './addList.js';
import List from './List.js';

const { insert } = List();
const { createElement } = DOMHelpers();

const board = (obj) => {
    const $main = createElement('div', '#main');

    const $board = createElement('div', '#board');
    const $lists = createElement('div', '#lists');
    $lists.setAttribute('data-lists-id', obj.id);

    if (obj.lists) {
        obj.lists.forEach(list => {
            $lists.appendChild(insert(list));
        });
    }

    $board.append($lists, addList());
    $main.append(header(), $board);

    return $main;
}

export default board;