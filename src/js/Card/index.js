'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';

const Card = () => {

    const {
        createElement
    } = DOMHelpers();

    const insert = (obj) => {
        const $card = createElement('div', '.card');
        $card.setAttribute('draggable', 'true');
        $card.setAttribute('data-card-id', obj.id);
        $card.insertAdjacentHTML('afterbegin', obj.text);

        return $card;
    };

    return {
        insert
    };
};

export default Card;