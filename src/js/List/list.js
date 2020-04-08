import DOMHelpers from '../helpers/DOMHelpers';
import header from './list.header';
import footer from './list.footer';
import formAddingCard from './formAddingCard';
import card from '../Card/card';
import dragList from './dragList';
import '../../scss/board/list.scss';

const { createElement } = DOMHelpers();

export const CLASS = {
    list: '.list',
    listCards: '.list-cards',
};

const list = (data) => {
    const $list = createElement('div', '.list');
    $list.setAttribute('draggable', 'true');
    $list.setAttribute('data-list-id', data.id);
    $list.setAttribute('data-list-order', data.order);

    dragList($list);

    const $listCards = createElement('div', '.list-cards');

    const forEachCallback = (element) => {
        $listCards.appendChild(card(element));
    };

    const sortCallback = (a, b) => a.order - b.order;

    if (Object.prototype.hasOwnProperty.call(data, 'cards')) {
        Object.values(data.cards).sort(sortCallback).forEach(forEachCallback);
    }

    const $formAddingCard = formAddingCard($list);

    $listCards.appendChild($formAddingCard);

    $list.append(
        header(data, $list),
        $listCards,
        footer($formAddingCard),
    );

    return $list;
};

export default list;