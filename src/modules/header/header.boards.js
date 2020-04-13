import DOMHelpers from '../helpers/DOMHelpers';
import personalBoards from './header.boards.personal';
import markedBoards from './header.boards.marked';
import firebase from '../firebase';
import '../../scss/header-boards.scss';

const { createElement } = DOMHelpers();

const handleWindowClose = (e) => {
    const { target } = e;
    if (target.closest('#header-boards-wrapper') || target.closest('.header-boards')) {
        return;
    }

    try {
        document.getElementById('header-boards-wrapper').remove();
    } catch (error) {
        document.removeEventListener('click', handleWindowClose, false);
        return;
    }

    document.removeEventListener('click', handleWindowClose, false);
};

const headerBoards = () => {
    const wrapper = createElement('div', '#header-boards-wrapper');
    const boards = createElement('div', '#header-boards');

    const userId = firebase.auth().currentUser.uid;

    firebase.database().ref(`users/${userId}/boards`).once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const boardsObject = Object.values(data);
            const marked = boardsObject.filter((obj) => !!obj.favorite);
            boards.append(
                markedBoards(marked),
                personalBoards(boardsObject),
            );
            wrapper.append(boards);
        }
    });

    document.getElementById('root').append(wrapper);
    document.addEventListener('click', handleWindowClose);
};

export default headerBoards;