'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import { dragged } from '../Card/drag&drop.js';

const { on } = DOMHelpers();

function dragover(e) {
    e.preventDefault();
}

function drop() {
    if (dragged) {
        this.querySelector('.list-cards').prepend(dragged);
    }
}

const drag = (list) => {
    on(list, 'dragover', dragover, false);
    on(list, 'drop', drop, false);
};

export default drag;