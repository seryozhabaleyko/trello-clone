import firebase from '../js/firebase';
import DOMHelpers from '../js/helpers/DOMHelpers';
import header from '../js/header';
import boardHeader, { BoardHeader } from '../js/board/board.header';
import formAddingList from '../js/board/formAddingList';
import list from '../js/List/list';
import storeRecentlyViewed from '../js/store/storeRecentlyViewed';
import '../scss/board/board.scss';

const { createElement } = DOMHelpers();

const board = (root, props) => {
    const successCallback = (snapshot) => {
        const data = snapshot.val();

        document.title = `Kanban - ${data.title}`;

        const $boardLists = createElement('div', '#board-lists');

        const forEachCallback = (obj) => {
            $boardLists.appendChild(list(obj));
        };

        const sortCallback = (a, b) => a.order - b.order;

        if (Object.prototype.hasOwnProperty.call(data, 'lists')) {
            Object.values(data.lists).sort(sortCallback).forEach(forEachCallback);
        }

        const $board = createElement('div', '#board');
        $board.appendChild($boardLists).appendChild(formAddingList());

        const $main = createElement('main', '#board-body');
        $main.append(boardHeader(data), $board);

        localStorage.setItem('boardId', props.id);
        storeRecentlyViewed.insert(data);

        root.setAttribute('style', data.background);
        root.append(header(), $main);
    };

    const errorCallback = (error) => { alert(error); };

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref(`/users/${user.uid}/boards/${props.id}`)
                .once('value', successCallback)
                .catch(errorCallback);
        } else {
            window.location.href = '/#login';
        }
    });
};

export default board;