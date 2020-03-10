'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import Header from '../List/Header.js';

const List = () => {

    const {
        createElement,
        getElement
    } = DOMHelpers();

    const { header } = Header();

    const insert = (obj) => {
        const $lists = document.getElementById('lists');

        const $list = createElement('div', '.list');
        $list.setAttribute('draggable', 'true');

        const $header = header(obj.title);

        const $footer = document.createElement('div');
        $footer.classList.add('list-footer');
        $footer.insertAdjacentHTML('afterbegin', `<a href="#" data-add-card>+ Добавить карточку</a>`);

        $list.append($header, $footer);

        $lists.appendChild($list);
    };

    return {
        insert
    };
};

export default List;