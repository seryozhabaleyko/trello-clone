import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
import menu from './board.details.menu';
import '../../scss/board/board-details.scss';

const { createElement } = DOMHelpers();

const boardDetails = () => {
    const detailsClose = createElement('button', '#board-details-close');
    detailsClose.insertAdjacentHTML('afterbegin', icons.cancel);

    detailsClose.addEventListener('click', () => {
        document.getElementById('board-wrapper').classList.remove('show-menu');
        document.getElementById('board-details').classList.add('hide');
        document.getElementById('board-menu').classList.remove('hide');
    });

    const detailsTitle = createElement('h3', '#board-details-title');
    detailsTitle.textContent = 'Меню';

    const detailsBack = createElement('button', '#board-details-back');
    detailsBack.style.display = 'none';
    detailsBack.insertAdjacentHTML('afterbegin', icons.back);

    const detailsHeader = createElement('div', '#board-details-header');
    detailsHeader.append(detailsBack, detailsTitle, detailsClose);

    const detailsMain = createElement('div', '#board-details-main');
    detailsMain.append(menu());

    const details = createElement('div', '#board-details');
    details.classList.add('hide');
    details.append(detailsHeader, detailsMain);

    return details;
};

export default boardDetails;