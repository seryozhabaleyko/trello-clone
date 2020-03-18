'use strict';

firebase.initializeApp({
    apiKey: "AIzaSyC9LpTOmPc6H7auu-XSJxNbSQ-AoekES3g",
    authDomain: "kanban-fcf5f.firebaseapp.com",
    databaseURL: "https://kanban-fcf5f.firebaseio.com",
    projectId: "kanban-fcf5f",
    storageBucket: "kanban-fcf5f.appspot.com",
    messagingSenderId: "969818368788",
    appId: "1:969818368788:web:a1608f0abd6c0f75053001"
});


import header from './header.js';
import { main } from './Home/index.js';
import Database from './Database.js';
import Store from './Store.js';
import board from './Board/index.js';
import { createRouter } from './vanilla-ui-router.js';

document.addEventListener('click', function(e) {
    modalClose(e);

    if (e.target.dataset.trigger !== undefined) {
        const title = document.querySelector('.making-board');
        title.setAttribute('style', e.target.getAttribute('style'));
    }

    if (e.target.dataset.submit !== undefined) {
        const input = document.querySelector('.making-board-title').value;

        const obj = {
            title: input || 'title',
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            bg: document.querySelector('.making-board').style.background,
            lists: []
        };

        Database.create(obj)
            .then(response => {
                console.log(response);
            });

        const modal = document.querySelector('.modal-overlay');
        modal.remove();
    }
});

function modalClose(e) {
    if (e.target.dataset.close !== undefined) {
        const modal = document.querySelector('.modal-overlay');
        modal.remove();
    }
}


const store = Store();


const obj = new Proxy(store.getLocalStorage(), {
    get: function (target, prop) {
        console.log({
            type: "get",
            target,
            prop
        });
        return Reflect.get(target, prop);
    },
    set: function (target, prop, value) {

        store.setLocalStorage(target)

        console.log({
            type: "set",
            target,
            prop,
            value
        });
        return Reflect.set(target, prop, value);
    }
});

const router = createRouter(document.getElementById('root'));
router
    .addRoute('', () => {
        document.getElementById('root').innerHTML = 'Hello World!!';
        //router.navigateTo('boards');
    })
    .addRoute('home', (domEntryPoint) => {
        domEntryPoint.append(header(), main);
    })
    .addRoute('boards', (domEntryPoint) => {
        domEntryPoint.append(header(), main);
        Database.renderList();
    })
    .addRoute('boards/:aboutId/:editable', (domEntryPoint, routeParams) => {
        console.log(domEntryPoint);
        console.log(routeParams); // => { aboutId: 42, editable:false }
    })
    .addRoute('boards/:id', (domEntryPoint, routeParams) => {
        let obj = store.find(routeParams.id);
        localStorage.setItem('id', routeParams.id);

        //const objBoard = obj.find(board => board.id === routeParams.id);

        domEntryPoint.style.background = obj.bg;
        domEntryPoint.append(header(), board(obj));

        store.save();
    })
    .otherwise(() => {
        console.log('I am the otherwise route');
        router.navigateTo('404');
    });





/* const a = store.getLocalStorage();

const b = a.map(board => {
    if (board.id === localStorage.getItem('id')) {
        console.log(board);
        board.lists.map(list => {
            if (list.id === 1584106280307) {
                console.log(list);
                list.cards.map(card => {
                    if (card.id === 221) {
                        console.log(card.title = 'asdadasdasdasdasdasd');
                    }
                    return card;
                });
            }
            return list;
        });
    };
    return board;
})

console.log(b); */