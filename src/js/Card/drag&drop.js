'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import store from '../Store.js';

const { $$, on } = DOMHelpers();

export let draggedCard = null;

function dragstart(e) {
    draggedCard = this;
    this.classList.add('draggedCard');

    e.stopPropagation();
}

function dragend(e) {
    this.classList.remove('draggedCard');
    draggedCard = null;

    $$('.card.under').forEach(x => x.classList.remove('under'));

    e.stopPropagation();
}

function dragenter() {
    if (!draggedCard || this === draggedCard) {
        return;
    }

    this.classList.add('under');
}

function dragover(e) {
    e.preventDefault();

    if (!draggedCard || this === draggedCard) {
        return;
    }
}

function dragleave() {
    if (!draggedCard || this === draggedCard) {
        return;
    }

    this.classList.remove('under');
}

function drop(e) {
    e.stopPropagation();

    if (!draggedCard || this === draggedCard) {
        return;
    }

    if (this.parentElement === draggedCard.parentElement) {
        const cards = $$('.card', this.parentElement);
        const indexA = cards.indexOf(this);
        const indexB = cards.indexOf(draggedCard);

        if (indexA < indexB) {
            this.parentElement.insertBefore(draggedCard, this);
        } else {
            this.parentElement.insertBefore(draggedCard, this.nextElementSibling);
        }

    } else {
        this.parentElement.insertBefore(draggedCard, this);
    }

    store.save();
}

const drag = (card) => {
    on(card, 'dragstart', dragstart, false);
    on(card, 'dragend', dragend, false);
    on(card, 'dragenter', dragenter, false);
    on(card, 'dragover', dragover, false);
    on(card, 'dragleave', dragleave, false);
    on(card, 'drop', drop, false);
};

export default drag;