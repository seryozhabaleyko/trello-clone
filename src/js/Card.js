'use strict';

class Card {

    constructor() {
        this.id = 1;
    }

    add(id = null, content = '') {

        const $card = this.card(id, content);

        $card.addEventListener('dblclick', function() {
            this.setAttribute('contenteditable', 'true');
            this.removeAttribute('draggble');
            this.closest('.list').removeAttribute('draggble');
            this.focus();
        });

        $card.addEventListener('blur', function() {
            this.removeAttribute('contenteditable');
            this.setAttribute('draggble', 'true');
            this.closest('.list').setAttribute('draggble', 'true');

            if (!this.textContent.trim().length) {
                this.remove();
            }
        });

        /* $card.addEventListener('dragstart', this.dragstart, false);
        $card.addEventListener('dragend', this.dragend, false);

        $card.addEventListener('dragenter', this.dragenter, false);
        $card.addEventListener('dragover', this.dragover, false);

        $card.addEventListener('dragleave', this.dragleave, false);
        $card.addEventListener('drop', this.drop, false); */

        return $card;
    }

    card(id, content) {
        const $card = document.createElement('div');
        $card.classList.add('card');
        $card.setAttribute('draggable', 'true');
        $card.textContent = content;

        if (id) {
            $card.setAttribute('data-card-id', id);
        } else {
            $card.setAttribute('data-note-id', this.id);
            this.id++;
        }

        return $card;
    }

    dragstart() {
        alert('123123');
        console.log('dragstart');
    }

    dragend() {
        console.log('dragend');
    }

    dragenter(e) {
        e.preventDefault();
        console.log('dragenter');
    }

    dragover(e) {
        e.preventDefault();
        console.log(123123);
    }

    dragleave(e) {
        console.log('dragleave');
        console.log(e.target.className);
        
        if (e.target.className === 'list') {
            console.log(leave);
        }
    }

    drop() {
        console.log('drop');
    }
}

export default Card;