'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import List from './List.js';
import Database from '../Database.js';

const Add = () => {

    const {
        createElement
    } = DOMHelpers();

    const { insert } = List();

    const _addEventListener = (el) => {
        el.addEventListener('click', function(e) {
            if (e.target.dataset.showForm !== undefined) {
                e.target.parentNode.classList.add('show');
                const $input = document.querySelector('.form-add-list-input');
                $input.focus();
            }

            if (e.target.dataset.closeForm !== undefined) {
                const form = document.querySelector('.add-list');
                form.classList.remove('show');
            }

            if (e.target.dataset.addList !== undefined) {
                //Database.createList({title: 'Название'});
                const $input = document.querySelector('.form-add-list-input');
                insert({
                    title: $input.value
                });
                $input.value = '';
                $input.focus();
            }
        }, false);
    };

    const list = () => {
        const $addList = createElement('div', '.add-list');

        $addList.insertAdjacentHTML('afterbegin', `
            <div class="open-form-add-list" data-show-form>+ Добавьте еще одну колонку</div>
            <from class="form-add-list">
                <input class="form-add-list-input" type="text" placeholder="Ввести заголовок списка"/>
                <div class="form-add-list-action">
                    <input class="form-add-list-submit" type="submit" value="Добавить список" data-add-list/>
                    <button class="form-add-list-close" type="button" data-close-form>
                        <svg viewBox="0 0 24 24" width="24" height="24" data-close-form>
                            <path d="M13.476 12.04l4.248-4.248a.992.992 0 1 0-1.402-1.403l-4.248 4.248L7.787 6.35a.992.992 0 0 0-1.402 1.403l4.286 4.286-4.26 4.261a.992.992 0 1 0 1.402 1.403l4.26-4.261 4.223 4.222a.992.992 0 1 0 1.403-1.402l-4.223-4.223z" data-close-form></path>
                        </svg>
                    </button>
                </div>
            </from>
        `);

        _addEventListener($addList);

        return $addList;
    };

    const card = () => {

    };

    return {
        list,
        card
    };
};

export default Add;