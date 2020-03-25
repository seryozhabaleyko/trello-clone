'use strict';

import './scss/styles.scss';

import { createRouter } from './js/router';
import home from './views/home';
import board from './views/board';
import boardsPage from './views/boards';

const router = createRouter(document.getElementById('root'));

router
    .addRoute('', home)
    .addRoute('boards', boardsPage)
    .addRoute('board/:id', board)
    .otherwise(() => {
        console.log('I am the otherwise route');
        router.navigateTo('404');
    });
