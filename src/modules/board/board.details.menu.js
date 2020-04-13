import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
// eslint-disable-next-line import/no-cycle
import background from './board.details.background';
import firebase from '../firebase';
import loader from '../plugins/loader';

const { createElement } = DOMHelpers();

const menu = () => {
    const removeLink = createElement('a');
    removeLink.href = '#';
    removeLink.textContent = 'Удалить';
    removeLink.insertAdjacentHTML('afterbegin', icons.deletee);

    const handleRemoveLink = (e) => {
        e.preventDefault();
        removeLink.insertAdjacentHTML('afterbegin', loader());
        const boardId = localStorage.getItem('boardId');
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref(`users/${userId}/boards/${boardId}`).remove();
        setTimeout(() => {
            if (window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(1000);
            }
            removeLink.removeChild(document.querySelector('.lds-ring'));
            window.location.href = '/#boards';
        }, 1000);
    };

    removeLink.addEventListener('click', handleRemoveLink, false);

    const remove = createElement('li');
    remove.append(removeLink);

    const bgLink = createElement('a');
    bgLink.href = '#';
    bgLink.textContent = 'Сменить фон';
    bgLink.insertAdjacentHTML('afterbegin', icons.background);

    const handleBgLink = (e) => {
        e.preventDefault();

        const detailsMain = document.getElementById('board-details-main');
        detailsMain.textContent = '';
        detailsMain.append(background());

        bgLink.removeEventListener('click', handleBgLink, false);
        removeLink.removeEventListener('click', handleRemoveLink, false);
    };

    bgLink.addEventListener('click', handleBgLink);

    const bg = createElement('li');
    bg.append(bgLink);

    const detailsMenu = createElement('ul', '#board-details-menu');
    detailsMenu.append(bg, remove);

    return detailsMenu;
};

export default menu;