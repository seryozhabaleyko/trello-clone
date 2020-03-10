'use strict';

import './store/index.js';

firebase.initializeApp({
    apiKey: "AIzaSyC9LpTOmPc6H7auu-XSJxNbSQ-AoekES3g",
    authDomain: "kanban-fcf5f.firebaseapp.com",
    databaseURL: "https://kanban-fcf5f.firebaseio.com",
    projectId: "kanban-fcf5f",
    storageBucket: "kanban-fcf5f.appspot.com",
    messagingSenderId: "969818368788",
    appId: "1:969818368788:web:a1608f0abd6c0f75053001"
});


import Header from './Header.js';
import { main } from './Home/index.js';
import Database from './Database.js';
import Store from './Store.js';
import board from './Board/index.js';

import { createRouter } from './vanilla-ui-router.js';

const { header } = Header();

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
            bg: document.querySelector('.making-board').style.background
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

const router = createRouter(document.getElementById('root'));
router
    .addRoute('', () => {
		/*
			Use navigateTo(…) to make dynamic route changes, i.e. to redirect to another route
		*/
        router.navigateTo('boards');
    })
    .addRoute('home', (domEntryPoint) => {
        domEntryPoint.append(header(), main);
    })
    .addRoute('boards', (domEntryPoint) => {
        domEntryPoint.append(header(), main);
        Database.renderList();
    })
    .addRoute('about/:aboutId/:editable', (domEntryPoint, routeParams) => {
        console.log('I am the about route.');

		/*
			routeParams are extracted from the URL and are casted to the correct type
			(Number/Boolean/String)
        */
        console.log(domEntryPoint);
        console.log(routeParams); // => { aboutId: 42, editable:false }
    })
    .addRoute('boards/:id', (domEntryPoint, routeParams) => {
        const $board = board(store.find(routeParams.id));
        domEntryPoint.append(header(), $board);
    })
    .otherwise(() => {
        // If no route configuration matches, the otherwise route is invoked.
        console.log('I am the otherwise route');
        router.navigateTo('404');
    });