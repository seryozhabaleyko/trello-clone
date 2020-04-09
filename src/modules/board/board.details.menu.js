import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
// eslint-disable-next-line import/no-cycle
import background from './board.details.background';

const { createElement } = DOMHelpers();

const menu = () => {
    const $bgLink = createElement('a');
    $bgLink.href = '#';
    $bgLink.textContent = 'Сменить фон';
    $bgLink.insertAdjacentHTML('afterbegin', icons.background);

    const handleBgLink = (e) => {
        e.preventDefault();

        const $main = document.getElementById('board-details-main');
        $main.textContent = '';
        $main.append(background());

        $bgLink.removeEventListener('click', handleBgLink, false);
    };

    $bgLink.addEventListener('click', handleBgLink);

    const $bg = createElement('li');
    $bg.append($bgLink);

    const $menu = createElement('ul', '#board-details-menu');
    $menu.append($bg);

    return $menu;
};

export default menu;