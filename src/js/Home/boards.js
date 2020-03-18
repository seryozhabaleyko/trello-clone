'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import Template from '../Template.js';
import Modal from '../modal.js';
import Store from '../Store.js';

const { createElement, on } = DOMHelpers();
const { open } = Modal();
const template = Template();
const store = Store();

const object = store.getLocalStorage();
const result = [object[2], object[4]];

const boards = () => {

    const temp = ({ id, bg, title }) => `
        <a href="/#boards/${id}" class="board" style="background: ${bg}">
            <div class="board-title">${title}</div>
        </a>
    `;

    const add = () => {
        const $add = createElement('div', '.create-new-board');
        $add.insertAdjacentHTML('afterbegin', template.board.add);

        on($add, 'click', function () {
            open();
        }, false);

        return $add;
    };

    const $wrapper = createElement('div', '.boards-wrapper');

    const favorites = `
        ${template.star({ width: '24px', height: '24px', color: '#42526e' })}
        <h3>Отмеченные доски</h3>
    `;

    const personal = `
        ${template.personal({ width: '24px', height: '24px', color: '#42526e' })}
        <h3>Персональные доски</h3>
    `;

    function title(template) {
        const $title = createElement('div', '.boards-header');
        $title.insertAdjacentHTML('afterbegin', template);

        return $title;
    }

    const section = () => createElement('section', '.boards-section');

    /* if (result.length) {
        const $boards = createElement('div', '.boards');

        for (const obja of result) {
            $boards.insertAdjacentHTML('afterbegin', temp(obja));
        }

        $wrapper.appendChild(section()).append(title(favorites), $boards);
    } */

    const $boards = createElement('div', '.boards');

    if (object.length) {
        for (const obj of object) {
            $boards.insertAdjacentHTML('afterbegin', temp(obj));
        }
    }

    $boards.appendChild(add());

    $wrapper.appendChild(section()).append(title(personal), $boards);

    return $wrapper;
};

export default boards;