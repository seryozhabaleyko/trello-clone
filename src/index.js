import createRouter from './js/router';
import board from './views/board';
import boardsPage from './views/boards';
import login from './views/login';
import register from './views/register';
import details from './views/user.details';
import './scss/styles.scss';

const $root = document.getElementById('root');
const router = createRouter($root);

router
    .addRoute('', () => {
        router.navigateTo('boards');
    })
    .addRoute('login', login)
    .addRoute('register', register)
    .addRoute('user/details', details)
    .addRoute('user/:nickname', details)
    .addRoute('boards', boardsPage)
    .addRoute('board/:id', board)
    .otherwise(() => {
        router.navigateTo('404');
    });