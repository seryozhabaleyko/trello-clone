'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';

const { createElement } = DOMHelpers();

export function hideFormHandler(e) {
    if (!e.target.closest('.form-adding-card.show')) {
        const $cardAddingFormShow = document.querySelector('.form-adding-card.show');
        $cardAddingFormShow.hide();

        document.querySelector('.list-footer.hide').classList.remove('hide');

        document.removeEventListener('click', hideFormHandler, true);
    }
}

const footer = (form) => {
    const CLASS = {
        listFooter: '.list-footer',
    };

    function showFormHandler(root, form) {
        root.hide();
        form.show();
        form.querySelector('.field-input-form-adding-card').focus();

        document.addEventListener('click', hideFormHandler, true);
    }

    const showForm = (root, form) => {
        const $button = createElement('button', '.add-card');
        $button.setAttribute('type', 'button');
        $button.insertAdjacentText('afterbegin', '+ Добавить карточку');

        $button.addEventListener('click', showFormHandler.bind(this, root, form), false);

        return $button;
    };

    const $footer = createElement('div', CLASS.listFooter);

    $footer.appendChild(showForm($footer, form));

    return $footer;
};

export default footer;