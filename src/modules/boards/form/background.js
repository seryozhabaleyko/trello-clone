import DOMHelpers from '../../helpers/DOMHelpers';
import images from '../../helpers/background';
import '../../../scss/forms/background.scss';

const { createElement } = DOMHelpers();

const background = () => {
    const $backgrounds = createElement('div', '.backgrounds');

    const array = ['#1B5E20', '#004D40', '#006064', '#01579B', '#0D47A1', '#b71c1c', '#E65100'];

    // eslint-disable-next-line no-restricted-syntax
    for (const key in images) {
        if (Object.prototype.hasOwnProperty.call(images, key)) {
            const $background = createElement('button', '.background');
            $background.type = 'button';
            $background.style.backgroundImage = `url('${images[key]}')`;
            $background.setAttribute('data-trigger', '');

            $backgrounds.appendChild($background);
        }
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const iterator of array) {
        const $background = createElement('button', '.background');
        $background.type = 'button';
        $background.style.background = `${iterator}`;
        $background.setAttribute('data-trigger', '');

        $backgrounds.appendChild($background);
    }

    return $backgrounds;
};

export default background;