'use strict';

/* import List from './List.js';
import Card from './Card.js';

const card = new Card();
const list = new List(card);

function addList() {
    const $addList = document.getElementById('add-list');
    const $input = document.getElementById('add-list-input');

    $addList.addEventListener('click', function (e) {
        this.classList.add('show');
        $input.focus();
    });

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
} */


import Header from './Header.js';
import { main } from './Home/index.js';
import Database from './Database.js';

const { header } = Header();

document
    .getElementById('root')
    .append(header(), main);

window.addEventListener('DOMContentLoaded', Database.renderList);

document.addEventListener('click', function(e) {
    console.log(e.target.dataset.close);
    if (e.target.dataset.close) {
        console.log('close');
    }

    if (e.target.dataset.trigger) {
        document
            .querySelector('.create-board-tile')
            .setAttribute('style', e.target.getAttribute('style'));
    }
});