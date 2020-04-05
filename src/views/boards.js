import firebase from '../js/firebase';
import header from '../js/header';
import bottomNavigation from '../js/Home/bottomNavigation';
import boards from '../js/Home/boards';
import sidebar from '../js/Home/sidebar';

function boardsPage(root) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const $main = document.createElement('main');
            $main.id = 'boards-body';

            $main.append(sidebar(), bottomNavigation(), boards());

            const $header = header();
            $header.classList.add('bg-boards');

            root.append($header, $main);
        } else {
            window.location.href = '/#login';
        }
    });
}

export default boardsPage;