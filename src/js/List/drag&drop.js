'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import store from '../Store.js';
import { draggedCard } from '../Card/drag&drop.js';

const { $, $$, on } = DOMHelpers();

let draggedList = null;
let droppedList = null;

function dragstart(e) {
    draggedList = this;
    this.classList.add('dragged');

    e.stopPropagation();

    $$('.card').forEach(card => card.removeAttribute('draggable'));
}

function dragend() {
    this.classList.remove('dragged');
    draggedList = null;
    droppedList = null;

    $$('.card').forEach(card => card.setAttribute('draggable', 'true'));
    $$('.list').forEach(list => list.classList.remove('under'));
}

function dragenter() {
    if (!draggedList || draggedList === this) {
        return;
    }

    this.classList.add('under');
}

function dragover(e) {
    e.preventDefault();

    if (droppedList === this) {
        if (droppedList) {
            droppedList.classList.remove('under');
        }
        droppedList = null;
    }

    if (!draggedList || draggedList === this) {
        return;
    }

    droppedList = this;

    $$('.list').forEach(list => list.classList.remove('under'));

    this.classList.add('under');
}

function dragleave() {
    if (!draggedList || draggedList === this) {
        return;
    }

    this.classList.remove('under');
}

function drop() {
    if (draggedCard) {
        $('.list-cards', this).prepend(draggedCard);
    } else if (draggedList) {
        const lists = Array.from($$('.list'));
        const indexA = lists.indexOf(this);
        const indexB = lists.indexOf(draggedList);

        if (indexA < indexB) {
            document.getElementById('board-lists').insertBefore(draggedList, this);
        } else {
            document.getElementById('board-lists').insertBefore(draggedList, this.nextElementSibling);
        }
    }

    store.save();
}

const drag = (list) => {
    on(list, 'dragstart', dragstart, false);
    on(list, 'dragend', dragend, false);
    // on(list, 'dragenter', dragenter, false);
    on(list, 'dragover', dragover, false);
    // on(list, 'dragleave', dragleave, false);
    on(list, 'drop', drop, false);
};

export default drag;