import DOMHelpers from '../../helpers/DOMHelpers';
import images from '../../helpers/background';
import '../../../scss/forms/background.scss';

const { createElement } = DOMHelpers();

const handleBackground = (e) => {
    const { target } = e;
    if (target.classList.contains('photo') || target.classList.contains('color')) {
        document.querySelector('.making-board').setAttribute('style', target.getAttribute('style'));
    }
};

const background = () => {
    const backgrounds = createElement('div', '.backgrounds');
    backgrounds.addEventListener('click', handleBackground, false);

    Object.values(images).forEach((img) => {
        const photo = createElement('div', '.photo');
        setTimeout(() => {
            photo.style.backgroundImage = `url('${img}')`;
        }, 250);

        backgrounds.append(photo);
    });

    const array = ['#1B5E20', '#004D40', '#006064', '#01579B', '#0D47A1', '#b71c1c', '#E65100'];

    array.forEach((color) => {
        const photo = createElement('div', '.color');
        photo.style.background = `${color}`;

        backgrounds.append(photo);
    });

    return backgrounds;
};

export default background;