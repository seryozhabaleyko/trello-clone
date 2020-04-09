import DOMHelpers from '../helpers/DOMHelpers';
import objBg from '../helpers/background';
import background from './board.details.background';

const { createElement } = DOMHelpers();

const handlePhoto = (e) => {
    const { target } = e;
    if (target.dataset.photo !== undefined) {
        document.getElementById('root')
            .setAttribute('style', target.getAttribute('style'));
    }
};

const handlePhotosBack = () => {
    const $main = document.getElementById('board-details-main');
    $main.textContent = '';
    $main.append(background());

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
        const $photo = createElement('div', '.photo');
        $photo.setAttribute('style', `background-image: url(${img});`);
        $photo.setAttribute('data-photo', '');

        $photos.append($photo);
    });

    return $photos;
};

export default photos;