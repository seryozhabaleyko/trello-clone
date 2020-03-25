'use strict';

import header from './header.js';
import { main } from './Home/index.js';
import Database from './Database.js';
import Store from './Store.js';
import board from './Board/index.js';
import { createRouter } from './router.js';

import ripple from './plugins/ripple.js';

const store = Store();

const router = createRouter(document.getElementById('root'));
router
    .addRoute('', () => {
        router.navigateTo('boards');
    })
    .addRoute('home', (domEntryPoint) => {
        domEntryPoint.append(header(), main);
    })
    .addRoute('boards', (domEntryPoint) => {
        domEntryPoint.append(header(), main);
        Database.renderList();

        ripple(
            Array.from(
                document.querySelectorAll('[ripple]')
            )
        );
    })
    .addRoute('board/:id', (domEntryPoint, routeParams) => {
        const obj = store.find(routeParams.id);
        localStorage.setItem('id', routeParams.id);

        domEntryPoint.style.background = obj.bg;
        domEntryPoint.append(header(), board(obj));

        store.save();

        ripple(
            Array.from(
                document.querySelectorAll('[ripple]')
            )
        );
    })
    .addRoute('boards/:aboutId/:editable', (domEntryPoint, routeParams) => {
        console.log(domEntryPoint);
        console.log(routeParams);
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


/* const obj = new Proxy(store.getLocalStorage(), {
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
}); */