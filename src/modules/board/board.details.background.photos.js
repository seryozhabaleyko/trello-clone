import DOMHelpers from '../helpers/DOMHelpers';
import objBg from '../helpers/background';
// eslint-disable-next-line import/no-cycle
import background from './board.details.background';
import firebase from '../firebase';

const { createElement } = DOMHelpers();

const handlePhoto = (e) => {
    const { target } = e;
    if (target.dataset.photo !== undefined) {
        const value = target.getAttribute('style');
        document.getElementById('root')
            .setAttribute('style', value);
        const userId = firebase.auth().currentUser.uid;
        const boardId = localStorage.getItem('boardId');
        firebase.database().ref(`users/${userId}/boards/${boardId}`).child('background').set(value);
    }
};

const handlePhotosBack = () => {
    const detailsMain = document.getElementById('board-details-main');
    while (detailsMain.firstChild) detailsMain.removeChild(detailsMain.firstChild);
    detailsMain.append(background());

    document.getElementById('board-details-title')
        .textContent = 'Смена фона';

    document.getElementById('board-details-back')
        .removeEventListener('click', handlePhotosBack, false);
};

const photos = () => {
    document.getElementById('board-details-title')
        .textContent = 'Фотографии';

    document.getElementById('board-details-back')
        .addEventListener('click', handlePhotosBack, false);

    const $photos = createElement('section', '.background-photos');
    $photos.addEventListener('click', handlePhoto);

    Object.values(objBg).forEach((img) => {
        const photo = createElement('div', '.photo');
        setTimeout(() => {
            photo.setAttribute('style', `background-image: url(${img});`);
        }, 250);
        photo.setAttribute('data-photo', '');

        $photos.append(photo);
    });

    return $photos;
};

export default photos;