import firebase from '../firebase';
import boardMarked from './boards.marked';
// eslint-disable-next-line import/no-cycle
import board from './board';

const marked = (id, e) => {
    e.preventDefault();
    const { target } = e;

    const userId = firebase.auth().currentUser.uid;

    const boardsMarked = document.querySelector('.boards-marked');
    const markedButton = target.closest('.board-marked-button');
    let value = null;

    if (markedButton.getAttribute('data-marked') === 'true') {
        markedButton.setAttribute('data-marked', false);
        value = false;
        boardsMarked.querySelector(`[data-board-id="${id}"]`).remove();

        // https://github.com/airbnb/javascript 15.3
        // Use shortcuts for booleans, but explicit comparisons for strings and numbers.
        if (boardsMarked.childElementCount === 0) {
            boardsMarked.closest('.boards-section').remove();
        }
    } else {
        markedButton.setAttribute('data-marked', true);
        value = true;

        const successCallback = (snapshot) => {
            const data = snapshot.val();
            if (!boardsMarked) {
                document.querySelector('#boards-wrapper').prepend(boardMarked());
                document.querySelector('.boards-marked').append(board(data));
                return;
            }
            boardsMarked.append(board(data));
        };

        firebase.database().ref(`users/${userId}/boards/${id}`).once('value', successCallback);
    }

    firebase.database().ref(`users/${userId}/boards/${id}`).child('favorite').set(value);

    Array.from(document.querySelectorAll(`[data-board-id="${id}"]`)).forEach((boardElement) => {
        boardElement.querySelector('.board-marked-button').setAttribute('data-marked', value);
    });
};

export default marked;