'use strict';

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

    for (let i = 1; i < 10; i++) {
        const $background = createElement('button', CLASS.background);
        $background.type = 'button';
        $background.style.backgroundImage = `url('${backgroundsImages[`bg${i}`]}')`;
        $background.setAttribute('data-trigger', '');

        $backgrounds.appendChild($background);
    }

    return $backgrounds;
};

export default background;