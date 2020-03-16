'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';

const { on } = DOMHelpers();

export let dragged = null;

function dragstart() {
    dragged = this;
    this.classList.add('dragged');
}

function dragend() {
    dragged = null;
    this.classList.remove('dragged');
    document
        .querySelectorAll('.card.under')
        .forEach(x => x.classList.remove('under'));
}

function dragenter() {
    if (this === dragged) {
        return;
    }

    this.classList.add('under');
}

function dragover(e) {
    e.preventDefault();

    if (this === dragged) {
        return;
    }
}

function dragleave() {
    if (this === dragged) {
        return;
    }

    this.classList.remove('under');
}

function drop(e) {
    e.stopPropagation();

    if (this === dragged) {
        return;
    }

    if (this.parentElement === dragged.parentElement) {
        const cards = [...this.parentElement.querySelectorAll('.card')];
        const indexA = cards.indexOf(this);
        const indexB = cards.indexOf(dragged);

        if (indexA < indexB) {
            this.parentElement.insertBefore(dragged, this);
        } else {
            this.parentElement.insertBefore(dragged, this.nextElementSibling);
        }

    } else {
        this.parentElement.insertBefore(dragged, this);
    }
}

const drag = (card) => {
    on(card, 'dragstart', dragstart, false);
    on(card, 'dragend', dragend, false);
    on(card, 'dragenter', dragenter, false);
    on(card, 'dragover', dragover, false);
    on(card, 'dragleave', dragleave, false);
    on(card, 'drop', drop, false);
}

export default drag;