import DOMHelpers from '../helpers/DOMHelpers';

const { createElement } = DOMHelpers();

export const handleHideForm = (e) => {
    const { target } = e;
    if (!target.closest('.form-adding-card.show')) {
        document.querySelector('.form-adding-card.show').hide();
        document.querySelector('.list-footer.hide').classList.remove('hide');
        document.removeEventListener('click', handleHideForm, true);
    }
};

const handleShowForm = (footer, form) => {
    footer.hide();
    form.show();
    form.querySelector('.field-input-form-adding-card').focus();
    document.addEventListener('click', handleHideForm, true);
};

const footer = (form) => {
    const $footer = createElement('div', '.list-footer');

    const $button = createElement('button', '.add-card');
    $button.setAttribute('type', 'button');
    $button.textContent = '+ Добавить карточку';
    $button.addEventListener('click', handleShowForm.bind(this, $footer, form), false);

    $footer.append($button);

    return $footer;
};

export default footer;