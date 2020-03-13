'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import header from './boardHeader.js';
import addList from './addList.js';
import List from './List.js';
import Store from '../Store.js';

const { insert } = List();

const { createElement } = DOMHelpers();
const store = Store();

const board = (obj) => {

    /* obj.lists = [
        { id: 1, title: 'Название 1',
            cards: [
                { id: 1, text: 'систем управления контентом'},
                { id: 2, text: 'что видишь, то и получишь'},
                { id: 3, text: 'используемая для обеспечения и организации совместного процесса'},
            ]
        },
        { id: 2, title: 'Название 2' },
        { id: 3, title: 'Название 3',
            cards: [
                { id: 1, text: 'позиция для вставки текста относительно элемента'}
            ]
        },
        { id: 4, title: 'Название 4' }
    ]; */

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