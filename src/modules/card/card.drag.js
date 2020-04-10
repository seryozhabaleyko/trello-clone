import serializer from '../serializer';

// eslint-disable-next-line import/no-mutable-exports
export let draggedCard = null;

const dragCard = (card) => {
    function dragstart(e) {
        draggedCard = this;
        this.classList.add('draggedCard');
        e.stopPropagation();
    }

    function dragend(e) {
        this.classList.remove('draggedCard');
        draggedCard = null;
        document.querySelectorAll('.card.under').forEach((x) => x.classList.remove('under'));
        e.stopPropagation();
    }

    function dragenter() {
        if (!draggedCard || this === draggedCard) {
            return;
        }
        this.classList.add('under');
    }

    function dragover(e) {
        if (!draggedCard || this === draggedCard) {
            return;
        }

        e.preventDefault();
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

        if (this.parentNode === draggedCard.parentNode) {
            const cards = Array.from(this.parentNode.querySelectorAll('.card'));
            const indexA = cards.indexOf(this);
            const indexB = cards.indexOf(draggedCard);

            if (indexA < indexB) {
                this.parentNode.insertBefore(draggedCard, this);
            } else {
                this.parentNode.insertBefore(draggedCard, this.nextElementSibling);
            }
        } else {
            this.parentNode.insertBefore(draggedCard, this);
        }

        serializer.save();
    }

    card.addEventListener('dragstart', dragstart, false);
    card.addEventListener('dragend', dragend, false);
    card.addEventListener('dragenter', dragenter, false);
    card.addEventListener('dragover', dragover, false);
    card.addEventListener('dragleave', dragleave, false);
    card.addEventListener('drop', drop, false);
};

export default dragCard;