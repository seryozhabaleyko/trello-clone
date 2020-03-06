'use strict';

import { template } from './template.js';

class List {

    constructor(card) {
        this.card = card;
        this.id = 1;
    }

    add(id = null, title = 'Название') {
        const $list = this.list(id, title);

        $list.addEventListener('dragstart', this.dragstart);
        $list.addEventListener('dragend', this.dragend);
        $list.addEventListener('dragenter', this.dragenter);
        $list.addEventListener('dragover', this.dragover);
        $list.addEventListener('dragleave', this.dragleave);
        $list.addEventListener('drop', this.drop);

        document
            .getElementById('board')
            .appendChild($list);
    }

    dragstart() {
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
        console.log('dragover');
    }

    dragleave() {
        console.log('dragleave');
    }

    drop() {
        console.log('drop');
    }

    list(id, title) {
        const $list = document.createElement('div');
        $list.classList.add('list');
        $list.setAttribute('draggable', 'true');

        if (id) {
            $list.setAttribute('data-list-id', id);
        } else {
            $list.setAttribute('data-list-id', this.id);
            this.id++;
        }

        const $footer = this.footer();
        const $cards = this.cards();

        const footerHandler = (e) => {
            e.preventDefault();
            const $card = this.card.add($cards);
            $cards.appendChild($card);
            $card.setAttribute('contenteditable', 'true');
            $card.focus();
        };

        $footer.addEventListener('click', footerHandler, false);

        $list.append(this.header(title), $cards, $footer);

        return $list;
    }

    header(title) {
        const $header = document.createElement('div');
        $header.classList.add('list-header');

        const $title = document.createElement('span');
        $title.classList.add('list-title');
        $title.textContent = title;

        $title.addEventListener('dblclick', function () {
            this.setAttribute('contenteditable', 'true');
            this.focus();
        });

        $title.addEventListener('blur', function () {
            this.removeAttribute('contenteditable');
        });

        const $more = document.createElement('div');
        $more.classList.add('list-more');

        const $moreLink = document.createElement('a');
        $moreLink.href = '#';
        $moreLink.insertAdjacentHTML('afterbegin', template.more);

        $more.appendChild($moreLink);

        $header.append($title, $more);

        return $header;
    }

    cards() {
        const $cards = document.createElement('div');
        $cards.classList.add('list-cards');
        $cards.setAttribute('data-cards', '');

        return $cards;
    }

    footer() {
        const $footer = document.createElement('div');
        $footer.classList.add('list-footer');
        $footer.insertAdjacentHTML('afterbegin', `<a href="#" data-add-card>+ Добавить карточку</a>`);

        return $footer;
    }
}

export default List;