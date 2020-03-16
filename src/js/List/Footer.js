'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';

const {
    createElement,
    show,
    hide,
    on,
    off
} = DOMHelpers();

export function hideFormHandler(e) {
    if (!e.target.closest('.card-adding-form.show')) {
        const $cardAddingFormShow = document.querySelector('.card-adding-form.show');
        $cardAddingFormShow.classList.remove('show');
        $cardAddingFormShow.classList.add('hide');

        document
            .querySelector('.list-footer.hide')
            .classList.remove('hide');

        off(document, 'click', hideFormHandler, true);
    }
}

function showFormHandler(root, form) {
    hide(root);
    show(form);
    const $input = form.querySelector('.card-add-text');
    $input.focus();

    on(document, 'click', hideFormHandler, true);
}

const showForm = (root, form) => {
    const $button = createElement('button', '.add-card');
    $button.setAttribute('type', 'button');
    $button.insertAdjacentText('afterbegin', '+ Добавить карточку');

    $button.addEventListener('click', showFormHandler.bind(this, root, form), false);

    return $button;
};

const footer = (form) => {
    const $footer = createElement('div', '.list-footer');

    $footer.appendChild(showForm($footer, form));

    return $footer;
};

export default footer;