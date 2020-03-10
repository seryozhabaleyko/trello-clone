'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import Database from '../Database.js';

const CreateBoardForm = () => {

    const {
        createElement,
        getElements
    } = DOMHelpers();

    const header = () => {
        const $header = createElement('div', '.board-creation-header');
        const $makingBoard = createElement('div', '.making-board');
        $makingBoard.insertAdjacentHTML('afterbegin', `
            <input class="making-board-title" type="text" placeholder="Добавить заголовок доски"/>
            <button class="making-board-close" type="button" data-close>
                <svg viewBox="0 0 24 24" width="24" height="24" data-close>
                    <path d="M13.476 12.04l4.248-4.248a.992.992 0 1 0-1.402-1.403l-4.248 4.248L7.787 6.35a.992.992 0 0 0-1.402 1.403l4.286 4.286-4.26 4.261a.992.992 0 1 0 1.402 1.403l4.26-4.261 4.223 4.222a.992.992 0 1 0 1.403-1.402l-4.223-4.223z" data-close></path>
                </svg>
            </button>
        `);
        const $feltTipPens = createElement('div', '.felt-tip-pens');
        $feltTipPens.insertAdjacentHTML('afterbegin', `
            <button class="felt-tip-pen" type="button" style="background-color: rgb(0, 121, 191);" data-trigger></button>
            <button class="felt-tip-pen" type="button" style="background-color: rgb(81, 152, 57);" data-trigger></button>
            <button class="felt-tip-pen" type="button" style="background-color: rgb(210, 144, 52);" data-trigger></button>
            <button class="felt-tip-pen" type="button" style="background-color: rgb(176, 70, 50);" data-trigger></button>
            <button class="felt-tip-pen" type="button" style="background-color: rgb(156, 39, 176);" data-trigger></button>
            <button class="felt-tip-pen" type="button" style="background-color: rgb(3, 169, 244);" data-trigger></button>
            <button class="felt-tip-pen" type="button" style="background-color: rgb(0, 150, 136);" data-trigger></button>
            <button class="felt-tip-pen" type="button" style="background-color: rgb(158, 158, 158);" data-trigger></button>
            <button class="felt-tip-pen" type="button" style="background-color: rgb(96, 125, 139);" data-trigger></button>
        `);

        $header.append($makingBoard, $feltTipPens);
        return $header;
    };

    const footer = () => {
        const $footer = createElement('div', '.board-creation-footer');
        $footer.insertAdjacentHTML('afterbegin', `
            <from class="board-creation">
                <div class="board-creation-header">
                    <div class="making-board">
                        <input class="making-board-title" type="text" placeholder="Добавить заголовок доски"/>
                        <button class="making-board-close" type="button" data-close>
                            <svg viewBox="0 0 24 24" width="24" height="24" data-close>
                                <path d="M13.476 12.04l4.248-4.248a.992.992 0 1 0-1.402-1.403l-4.248 4.248L7.787 6.35a.992.992 0 0 0-1.402 1.403l4.286 4.286-4.26 4.261a.992.992 0 1 0 1.402 1.403l4.26-4.261 4.223 4.222a.992.992 0 1 0 1.403-1.402l-4.223-4.223z" data-close></path>
                            </svg>
                        </button>
                    </div>
                    <div class="felt-tip-pens">
                        <button class="felt-tip-pen" type="button" style="background-color: rgb(0, 121, 191);" data-trigger></button>
                        <button class="felt-tip-pen" type="button" style="background-color: rgb(81, 152, 57);" data-trigger></button>
                        <button class="felt-tip-pen" type="button" style="background-color: rgb(210, 144, 52);" data-trigger></button>
                        <button class="felt-tip-pen" type="button" style="background-color: rgb(176, 70, 50);" data-trigger></button>
                        <button class="felt-tip-pen" type="button" style="background-color: rgb(156, 39, 176);" data-trigger></button>
                        <button class="felt-tip-pen" type="button" style="background-color: rgb(3, 169, 244);" data-trigger></button>
                        <button class="felt-tip-pen" type="button" style="background-color: rgb(0, 150, 136);" data-trigger></button>
                        <button class="felt-tip-pen" type="button" style="background-color: rgb(158, 158, 158);" data-trigger></button>
                        <button class="felt-tip-pen" type="button" style="background-color: rgb(96, 125, 139);" data-trigger></button>
                    </div>
                </div>
                <div class="board-creation-footer">
                    <button class="create-board-submit-button" type="button" data-close data-submit>Создать доску</button>
                </div>
            </from>
        `);
        const $button = createElement('button', '.create-board-submit-button');
        $button.type = 'button';
        $button.setAttribute('data-close', '');
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
        const $form = createElement('form', '.board-creation');
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