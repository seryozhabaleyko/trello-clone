'use strict';

import DOMHelpers from './helpers/DOMHelpers.js';

const { $, $$ } = DOMHelpers();

const Store = () => {

    const name = 'kanban';

    const getLocalStorage = () => {
        let store;

        try {
            store = JSON.parse(localStorage.getItem(name) || '[]');
        } catch (e) {
            console.error(e);
        }

        return store;
    };

    const setLocalStorage = (value) => localStorage.setItem(name, JSON.stringify(value));

    const replace = (obj) => getLocalStorage().map(board => board.id === obj.id ? obj : board);

    const find = (id) => getLocalStorage().find(board => board.id === id);

    const insert = (obj) => {
        const store = getLocalStorage();
        store.push(obj);

        setLocalStorage(store);
    };

    const remove = (id = null) => {
        const store = getLocalStorage();
        store = store.filter(board => board.id !== id);

        setLocalStorage(store);
    };

    const edit = (id, title) => {
        const newObject = {
            id,
            title
        };

        const store = getLocalStorage();

        store = store.map(board => board.id === newObject.id ? newObject : board);

        setLocalStorage(store);
    };

    const save = () => {
        const currentId = localStorage.getItem('id');
        const currentBoard = find(currentId);
        currentBoard.lists = [];

        $$('.list').forEach(list => {
            const objList = {
                id: Number(list.getAttribute('data-list-id')),
                title: $('.list-title', list).textContent,
                cards: []
            };

            $$('.card', list).forEach(card => {
                objList.cards.push({
                    id: card.getAttribute('data-card-id'),
                    content: card.textContent
                });
            });

            currentBoard.lists.push(objList);
        });

        setLocalStorage(replace(currentBoard));
    };

    const load = () => {

    };

    return {
        getLocalStorage,
        setLocalStorage,
        replace,
        insert,
        remove,
        edit,
        find,
        save,
        load
    };
};

export default Store;