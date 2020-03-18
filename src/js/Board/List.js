'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import header from '../List/header.js';
import footer from '../List/footer.js';
import form from '../List/cardAddingForm.js';
import Card from '../Card/index.js';
import drag from '../List/drag&drop.js';

const { createElement } = DOMHelpers();
const card = Card();

const List = () => {

    const insert = (obj) => {
        const $list = createElement('div', '.list');
        $list.setAttribute('draggable', 'true');
        $list.setAttribute('data-list-id', obj.id);

        drag($list);

        const $cards = createElement('div', '.list-cards');

        if (obj.cards) {
            obj.cards.map(obj => {
                $cards.appendChild(card.insert(obj));
            });
        }

        const $form = form($list);

        $cards.appendChild($form);

        $list.append(header(obj, $list), $cards, footer($form));

        return $list;
    };

    return {
        insert
    };
};

export default List;