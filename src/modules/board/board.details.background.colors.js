import DOMHelpers from '../helpers/DOMHelpers';
// eslint-disable-next-line import/no-cycle
import background from './board.details.background';

const { createElement } = DOMHelpers();

const handleColor = (e) => {
    const { target } = e;
    if (target.dataset.color !== undefined) {
        document.getElementById('root')
            .setAttribute('style', target.getAttribute('style'));
    }
};

const handleColorsBack = () => {
    const detailsMain = document.getElementById('board-details-main');
    while (detailsMain.firstChild) detailsMain.removeChild(detailsMain.firstChild);
    detailsMain.append(background());

    document.getElementById('board-details-title')
        .textContent = 'Смена фона';

    document.getElementById('board-details-back')
        .removeEventListener('click', handleColorsBack, false);
};

const colors = () => {
    document.getElementById('board-details-title')
        .textContent = 'Цвета';

    document.getElementById('board-details-back')
        .addEventListener('click', handleColorsBack, false);

    const $colors = createElement('section', '.background-colors');
    $colors.addEventListener('click', handleColor, false);

    const colorArray = ['#1B5E20', '#004D40', '#006064', '#01579B', '#0D47A1', '#b71c1c', '#E65100'];

    colorArray.forEach((color) => {
        const $color = createElement('div', '.color');
        $color.setAttribute('style', `background-color: ${color};`);
        $color.setAttribute('data-color', '');

        $colors.append($color);
    });

    return $colors;
};

export default colors;