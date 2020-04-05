'use strict';

import store from '../Store.js';


export let draggedCard = null;

function dragstart(e) {
    draggedCard = this;
    this.classList.add('draggedCard');

    e.stopPropagation();
}

function dragend(e) {
    this.classList.remove('draggedCard');
    draggedCard = null;

    document.querySelectorAll('.card.under').forEach(x => x.classList.remove('under'));

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
        const cards = this.parentElement.querySelectorAll('.card');
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

const dragCard = (card) => {
    card.addEventListener('dragstart', dragstart, false);
    card.addEventListener('dragend', dragend, false);
    card.addEventListener('dragenter', dragenter, false);
    card.addEventListener('dragover', dragover, false);
    card.addEventListener('dragleave', dragleave, false);
    card.addEventListener('drop', drop, false);
};

export default dragCard;