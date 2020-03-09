'use strict';

import Store from './Store.js';
import DOMHelpers from './helpers/DOMHelpers.js';
import Board from './Home/Board.js';

const {
    insert,
    getLocalStorage
} = Store();

const {
    getElement,
    getElements
} = DOMHelpers();

class Database {
    static create(obj) {
        return fetch('https://kanban-fcf5f.firebaseio.com/boards.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(response  => {
                obj.id = response.name;
                return obj;
            })
            .then(insert)
            .then(Database.renderList)
    }

    static renderList() {
        const boards = getLocalStorage();

        const html = boards.length ? boards.map(toBoard).join('').trim() : '<div class="board"></div>';

        const $boards = getElement('.boards');

        $boards.querySelectorAll('.board').forEach(item => {
            item.remove();
        });

        $boards.insertAdjacentHTML('afterbegin', html);

    }
}

function toBoard(obj) {

    return `<div class="board">${obj.title}, ${obj.date}</div>`;
}


export default Database;