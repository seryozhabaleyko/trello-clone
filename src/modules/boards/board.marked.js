import board from './board';
import firebase from '../firebase';

const marked = (id, e) => {
    e.preventDefault();
    const { target } = e;

    const boardNode = target.closest('.board');

    const value = target.closest('.board-marked-button').getAttribute('data-marked') === 'true' ? !!'' : !!'true';

    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref(`users/${userId}/boards/${id}`).child('favorite').set(value);

    Array.from(document.querySelectorAll(`[data-board-id="${id}"]`)).forEach((boardElement) => {
        const markedButton = boardElement.querySelector('.board-marked-button');
        if (markedButton.getAttribute('data-marked') === 'true') {
            markedButton.setAttribute('data-marked', false);
        } else {
            markedButton.setAttribute('data-marked', true);
        }
    });
};

export default marked;