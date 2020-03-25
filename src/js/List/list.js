'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import header from './listHeader.js';
import footer from './listFooter.js';
import form from './cardAddingForm.js';
import card from '../Card/card.js';
import drag from './drag&drop.js';

import '../../scss/board/list.scss';

const { createElement } = DOMHelpers();

const list = (obj) => {
    const $list = createElement('div', '.list');
    $list.setAttribute('draggable', 'true');
    $list.setAttribute('data-list-id', obj.id);

    drag($list);

    const $cards = createElement('div', '.list-cards');

    if (obj.cards) {
        for (const iterator of obj.cards) {
            $cards.appendChild(card(iterator));
        }
    }

    const $form = form($list);

    $cards.appendChild($form);

    $list.append(header(obj, $list), $cards, footer($form));

    return $list;
};

export default list;