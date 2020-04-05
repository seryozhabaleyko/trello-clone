'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import header from './listHeader.js';
import footer from './listFooter.js';
import formAddingCard from './formAddingCard.js';
import card from '../Card/card.js';
import dragList from './drag&drop.js';
import '../../scss/board/list.scss';

const { createElement } = DOMHelpers();

export const CLASS = {
    list: '.list',
    listCards: '.list-cards',
};

const list = (obj) => {
    const $list = createElement('div', CLASS.list);
    $list.setAttribute('draggable', 'true');
    $list.setAttribute('data-list-id', obj.id);

    dragList($list);

    const $cards = createElement('div', CLASS.listCards);

    if (obj.cards) {
        for (const iterator of obj.cards) {
            $cards.appendChild(card(iterator));
        }
    }

    const $formAddingCard = formAddingCard($list);

    $cards.appendChild($formAddingCard);

    $list.append(header(obj, $list), $cards, footer($formAddingCard));

    return $list;
};

export default list;