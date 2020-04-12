import DOMHelpers from '../helpers/DOMHelpers';
import dragCard from './card.drag';
import details from './card.details';
import '../../scss/board/card/card.scss';

const { createElement } = DOMHelpers();

const card = ({ id, title, order }) => {
    const $title = createElement('span', '.card-title');
    $title.textContent = title;

    const $card = createElement('div', '.card');
    $card.setAttribute('draggable', 'true');
    $card.setAttribute('data-card-id', id);
    $card.setAttribute('data-card-order', order);
    $card.addEventListener('click', () => {
        const listId = $card.closest('.list').getAttribute('data-list-id');
        details($title, listId, id);
    }, false);
    $card.append($title);

    dragCard($card);

    return $card;
};

export default card;