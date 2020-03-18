'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import drag from './drag&drop.js';

const {
    createElement,
    on
} = DOMHelpers();

const Card = () => {

    const insert = (obj) => {
        const $card = createElement('div', '.card');
        $card.setAttribute('draggable', 'true');
        $card.setAttribute('data-card-id', obj.id);
        $card.insertAdjacentHTML('afterbegin', obj.content);

        function cardHandler() {
            console.log(123123);
        }

        on($card, 'click', cardHandler, false);

        drag($card);

        return $card;
    };

    return {
        insert
    };
};

export default Card;