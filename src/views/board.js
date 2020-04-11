import firebase from '../modules/firebase';
import DOMHelpers from '../modules/helpers/DOMHelpers';
import header from '../modules/header';
import boardHeader from '../modules/board/board.header';
import boardDetails from '../modules/board/board.details';
import formAddingList from '../modules/board/formAddingList';
import list from '../modules/list/list';
import storeRecentlyViewed from '../modules/store/storeRecentlyViewed';
import '../scss/board/board.scss';

const { createElement } = DOMHelpers();

const board = (root, props) => {
    const successCallback = (snapshot) => {
        const data = snapshot.val();

        document.title = `${data.title} - Kanban`;

        const $boardLists = createElement('div', '#board-lists');

        const forEachCallback = (obj) => {
            $boardLists.append(list(obj));
        };

        const sortCallback = (a, b) => a.order - b.order;

        if (Object.prototype.hasOwnProperty.call(data, 'lists')) {
            Object.values(data.lists).sort(sortCallback).forEach(forEachCallback);
        }

        $boardLists.append(formAddingList());

        const $board = createElement('div', '#board');
        $board.append(boardHeader(data), $boardLists);

        const $main = createElement('main', '#board-body');
        $main.append($board, boardDetails());

        localStorage.setItem('boardId', props.id);
        storeRecentlyViewed.insert(props.id);

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