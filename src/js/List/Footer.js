'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';

const {
    createElement,
    show,
    hide
} = DOMHelpers();

function showFormHandler(root, form) {
    hide(root);
    show(form);
    const $input = form.querySelector('.card-add-text');
    $input.focus();
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