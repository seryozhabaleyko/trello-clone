/* eslint-disable import/no-cycle */
import DOMHelpers from '../helpers/DOMHelpers';
import menu from './board.details.menu';
import colors from './board.details.background.colors';
import photos from './board.details.background.photos';
import imgPhoto from '../../img/photo.jpg';
import imgColors from '../../img/colors.jpg';

const { createElement } = DOMHelpers();

const handleBack = () => {
    const detailsMain = document.getElementById('board-details-main');
    while (detailsMain.firstChild) detailsMain.removeChild(detailsMain.firstChild);
    detailsMain.append(menu());

    document.getElementById('board-details-title')
        .textContent = 'Меню';

    const detailsBack = document.getElementById('board-details-back');
    detailsBack.style.display = 'none';
    detailsBack.removeEventListener('click', handleBack, false);
};

const handlePhotos = () => {
    document.querySelector('.photos')
        .removeEventListener('click', handlePhotos, false);

    const detailsMain = document.getElementById('board-details-main');
    while (detailsMain.firstChild) detailsMain.removeChild(detailsMain.firstChild);
    detailsMain.append(photos());
};

const handleColors = () => {
    document.querySelector('.colors')
        .removeEventListener('click', handleColors, false);

    const detailsMain = document.getElementById('board-details-main');
    while (detailsMain.firstChild) detailsMain.removeChild(detailsMain.firstChild);
    detailsMain.append(colors());
};

const background = () => {
    document.getElementById('board-details-title')
        .textContent = 'Сменить фон';

    const detailsBack = document.getElementById('board-details-back');
    detailsBack.style.display = 'flex';
    detailsBack.addEventListener('click', handleBack, false);

    const photosImage = createElement('img', '.photos-image');
    photosImage.src = imgPhoto;

    const photoTitle = createElement('div', '.photos-title');
    photoTitle.textContent = 'Фотографии';

    const $photos = createElement('div', '.photos');
    $photos.append(photosImage, photoTitle);
    $photos.addEventListener('click', handlePhotos, false);

    const colorsImage = createElement('img', '.colors-image');
    colorsImage.src = imgColors;

    const colorsTitle = createElement('div', '.colors-title');
    colorsTitle.textContent = 'Цвета';

    const $colors = createElement('div', '.colors');
    $colors.append(colorsImage, colorsTitle);
    $colors.addEventListener('click', handleColors, false);

    const detailsBackground = createElement('section', '#board-details-background');
    detailsBackground.append($photos, $colors);

    return detailsBackground;
};

export default background;