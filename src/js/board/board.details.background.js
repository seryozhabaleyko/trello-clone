/* eslint-disable import/no-cycle */
import DOMHelpers from '../helpers/DOMHelpers';
import menu from './board.details.menu';
import colors from './board.details.background.colors';
import photos from './board.details.background.photos';
import imgPhoto from '../../img/photo.jpg';
import imgColors from '../../img/colors.jpg';

const { createElement } = DOMHelpers();

const handleBack = () => {
    const $main = document.getElementById('board-details-main');
    $main.textContent = '';
    $main.append(menu());

    document.getElementById('board-details-title')
        .textContent = 'Меню';

    const $back = document.getElementById('board-details-back');
    $back.style.display = 'none';
    $back.removeEventListener('click', handleBack, false);
};

const handlePhotos = () => {
    document.querySelector('.photos')
        .removeEventListener('click', handlePhotos, false);

    const $main = document.getElementById('board-details-main');
    $main.textContent = '';
    $main.append(photos());
};

const handleColors = () => {
    document.querySelector('.colors')
        .removeEventListener('click', handleColors, false);

    const $main = document.getElementById('board-details-main');
    $main.textContent = '';
    $main.append(colors());
};

const background = () => {
    document.getElementById('board-details-title')
        .textContent = 'Сменить фон';

    const $back = document.getElementById('board-details-back');
    $back.style.display = 'flex';
    $back.addEventListener('click', handleBack, false);

    const $photosImage = createElement('img', '.photos-image');
    $photosImage.src = imgPhoto;

    const $photoTitle = createElement('div', '.photos-title');
    $photoTitle.textContent = 'Фотографии';

    const $photos = createElement('div', '.photos');
    $photos.append($photosImage, $photoTitle);
    $photos.addEventListener('click', handlePhotos, false);

    const $colorsImage = createElement('img', '.colors-image');
    $colorsImage.src = imgColors;

    const $colorsTitle = createElement('div', '.colors-title');
    $colorsTitle.textContent = 'Цвета';

    const $colors = createElement('div', '.colors');
    $colors.append($colorsImage, $colorsTitle);
    $colors.addEventListener('click', handleColors, false);

    const $background = createElement('section', '#board-details-background');
    $background.append($photos, $colors);

    return $background;
};

export default background;