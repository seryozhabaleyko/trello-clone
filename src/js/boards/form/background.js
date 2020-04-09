import DOMHelpers from '../../helpers/DOMHelpers';
import backgroundsImages from '../../helpers/background';
import '../../../scss/forms/background.scss';

const background = () => {
    const { createElement } = DOMHelpers();

    const CLASS = {
        backgrounds: '.backgrounds',
        background: '.background',
    };

    const $backgrounds = createElement('div', CLASS.backgrounds);

    const array = ['#1B5E20', '#004D40', '#006064', '#01579B', '#0D47A1', '#b71c1c', '#E65100'];

    for (const key in backgroundsImages) {
        if (backgroundsImages.hasOwnProperty(key)) {
            const $background = createElement('button', CLASS.background);
            $background.type = 'button';
            $background.style.backgroundImage = `url('${backgroundsImages[key]}')`;
            $background.setAttribute('data-trigger', '');

            $backgrounds.appendChild($background);
        }
    }

    for (const iterator of array) {
        const $background = createElement('button', CLASS.background);
        $background.type = 'button';
        $background.style.background = `${iterator}`;
        $background.setAttribute('data-trigger', '');

        $backgrounds.appendChild($background);
    }

    return $backgrounds;
};

export default background;