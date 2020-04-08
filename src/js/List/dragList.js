import serializer from '../serializer';
import { draggedCard } from '../Card/dragCard';

let draggedList = null;
let droppedList = null;

function dragstart(e) {
    draggedList = this;
    this.classList.add('dragged');

    e.stopPropagation();

    document
        .querySelectorAll('.card')
        .forEach((card) => card.removeAttribute('draggable'));
}

function dragend() {
    this.classList.remove('dragged');
    draggedList = null;
    droppedList = null;

    document
        .querySelectorAll('.card')
        .forEach((card) => card.setAttribute('draggable', 'true'));
    document
        .querySelectorAll('.list')
        .forEach((list) => list.classList.remove('under'));
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

    document
        .querySelectorAll('.list')
        .forEach((list) => list.classList.remove('under'));

    this.classList.add('under');
}

function drop() {
    if (draggedCard) {
        this.querySelector('.list-cards').prepend(draggedCard);
    } else if (draggedList) {
        const lists = Array.from(document.querySelectorAll('.list'));
        const indexA = lists.indexOf(this);
        const indexB = lists.indexOf(draggedList);

        if (indexA < indexB) {
            document.getElementById('board-lists').insertBefore(draggedList, this);
        } else {
            document.getElementById('board-lists').insertBefore(draggedList, this.nextElementSibling);
        }
    }

    serializer.save();
}

const dragList = (list) => {
    list.addEventListener('dragstart', dragstart, false);
    list.addEventListener('dragend', dragend, false);
    list.addEventListener('dragover', dragover, false);
    list.addEventListener('drop', drop, false);
};

export default dragList;