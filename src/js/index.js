'use strict';

import List from './List.js';
import Card from './Card.js';

const card = new Card();
const list = new List(card);

function addList() {
    const $addList = document.getElementById('add-list');
    const $input = document.getElementById('add-list-input');

    $addList.addEventListener('click', function (e) {
        this.classList.add('show');
        $input.focus();
    })

    document.addEventListener('click', function (e) {
        if ($addList.classList.contains('show')) {
            $addList.classList.remove('show');
        }
    }, true);

    document
        .getElementById('add')
        .addEventListener('click', function (e) {
            e.preventDefault();
            const isValue = $input.value ? $input.value : 'Название';
            list.add(null, isValue);
            $input.value = '';
        });
}

addList();