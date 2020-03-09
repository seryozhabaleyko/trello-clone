'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import Database from '../Database.js';

const CreateBoardForm = () => {

    const {
        createElement,
        getElements
    } = DOMHelpers();

    const header = () => {
        const $header = createElement('div', '.form-header');
        const $title = createElement('div', '.create-board-tile');
        const $background = createElement('div', '.background-board');
        $background.insertAdjacentHTML('afterbegin', `
            <button class="background-board-trigger" type="button" style="background-color: rgb(0, 121, 191);" data-trigger="true"></button>
            <button class="background-board-trigger" type="button" style="background-color: rgb(81, 152, 57);" data-trigger="true"></button>
            <button class="background-board-trigger" type="button" style="background-color: rgb(210, 144, 52);" data-trigger="true"></button>
            <button class="background-board-trigger" type="button" style="background-color: rgb(176, 70, 50);" data-trigger="true"></button>
            <button class="background-board-trigger" type="button" style="background-color: rgb(156, 39, 176);" data-trigger="true"></button>
            <button class="background-board-trigger" type="button" style="background-color: rgb(3, 169, 244);" data-trigger="true"></button>
            <button class="background-board-trigger" type="button" style="background-color: rgb(0, 150, 136);" data-trigger="true"></button>
            <button class="background-board-trigger" type="button" style="background-color: rgb(158, 158, 158);" data-trigger="true"></button>
            <button class="background-board-trigger" type="button" style="background-color: rgb(96, 125, 139);" data-trigger="true"></button>
        `);

        $header.append($title, $background);
        return $header;
    };

    const footer = () => {
        const $footer = createElement('div', '.form-footer');
        const $button = createElement('button', '.create-board-submit-button');
        $button.type = 'button';
        $button.setAttribute('data-close', 'true');
        $button.insertAdjacentHTML('afterbegin', `Создать доску`);
        $button.addEventListener('click', function() {
            const obj = {
                date: new Date(),
                title: 'title',
                completed: false
            };

            Database.create(obj).then(() => {
                console.log('Отправили на сервер');
            });

        });
        $footer.append($button);

        return $footer;
    };

    const form = () => {
        const $form = createElement('form', '.create-board-form');
        const $header = header();
        const $footer = footer();
        $form.append($header, $footer);

        return $form;
    };

    return {
        form
    }
}

export default CreateBoardForm;