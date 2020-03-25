'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import drag from './drag&drop.js';
import '../../scss/board/card.scss';

const { createElement } = DOMHelpers();

const CLASS = {
    card: '.card'
};

function _cardHandler() {

}

function _cardContextMenuHandler(e) {
    e.preventDefault();
}

const card = (obj) => {
    const $card = createElement('div', CLASS.card);
    $card.setAttribute('draggable', 'true');
    $card.setAttribute('data-card-id', obj.id);
    $card.setAttribute('ripple', '');
    $card.insertAdjacentHTML('afterbegin', obj.content);

    $card.addEventListener('click', _cardHandler, false);
    $card.addEventListener('contextmenu', _cardContextMenuHandler, false);

    drag($card);

    return $card;
};

export default card;