'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import header from '../List/header.js';
import footer from '../List/footer.js';
import form from '../List/cardAddingForm.js';
import Card from '../Card/index.js';
import Store from '../Store.js';

const { createElement } = DOMHelpers();
const card = Card();
const store = Store();

const List = () => {

    const insert = (obj) => {
        const $wrapper = createElement('div', '.list-wrapper');
        const $list = createElement('div', '.list');
        $list.setAttribute('draggable', 'true');
        $list.setAttribute('data-list-id', obj.id);

        const $header = header(obj);

        const $cards = createElement('div', '.list-cards');

        if (obj.cards) {
            obj.cards.map(obj => {
                $cards.appendChild(card.insert(obj));
            });
        }

        const $form = form($list);

        $cards.appendChild($form);

        $wrapper.appendChild($list).append($header, $cards, footer($form));

        return $wrapper;
    };

    return {
        insert
    };
};

export default List;