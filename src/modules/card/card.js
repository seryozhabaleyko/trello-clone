import DOMHelpers from '../helpers/DOMHelpers';
import dragCard from './card.drag';
import details from './card.details';
import '../../scss/board/card/card.scss';

const { createElement } = DOMHelpers();

const handleCard = (e) => {
    const { target } = e;
    const cardId = target.getAttribute('data-card-id');
    const listId = target.closest('.list').getAttribute('data-list-id');
    const boardId = localStorage.getItem('boardId');

    details(target, boardId, listId, cardId);
};

const card = (obj) => {
    const title = createElement('span', '.card-title');
    title.textContent = obj.title;

    const $card = createElement('div', '.card');
    $card.setAttribute('draggable', 'true');
    $card.setAttribute('data-card-id', obj.id);
    $card.setAttribute('data-card-order', obj.order);
    $card.addEventListener('click', handleCard, false);
    $card.append(title);

    dragCard($card);

    return $card;
};

export default card;