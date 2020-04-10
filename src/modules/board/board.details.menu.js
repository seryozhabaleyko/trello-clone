import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
// eslint-disable-next-line import/no-cycle
import background from './board.details.background';

const { createElement } = DOMHelpers();

const menu = () => {
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
    };

    bgLink.addEventListener('click', handleBgLink);

    const bg = createElement('li');
    bg.append(bgLink);

    const detailsMenu = createElement('ul', '#board-details-menu');
    detailsMenu.append(bg);

    return detailsMenu;
};

export default menu;