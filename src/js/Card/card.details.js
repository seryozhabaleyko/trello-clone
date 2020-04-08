import DOMHelpers from '../helpers/DOMHelpers';
import '../../scss/board/card/card.details.scss';
import icons from '../helpers/icons';

const { createElement } = DOMHelpers();

const details = () => {
    const $details = createElement('div', '.card-details');

    const $close = createElement('button', '.card-details-close');
    $close.insertAdjacentHTML('beforeend', icons.close);

    const $header = createElement('div', '.card-details-header');
    $header.textContent = '123123123';
    $header.appendChild($close);


    const $titleInput = createElement('input', '.card-details-title-input');
    $titleInput.placeholder = 'Название карточки';

    const $titleFieldsetLegend = createElement('legend', '.card-details-fieldset-legend');
    $titleFieldsetLegend.textContent = 'Название';

    const $titleFieldset = createElement('fieldset', '.card-details-fieldset');
    $titleFieldset.append($titleFieldsetLegend, $titleInput);

    const $title = createElement('div', '.card-details-title');
    $title.appendChild($titleFieldset);


    const $descriptionTextarea = createElement('textarea', '.card-details-description-textarea');
    $descriptionTextarea.style.height = '8rem';
    $descriptionTextarea.placeholder = 'Добавить более подробное описание...';

    const $descriptionFieldsetLegend = createElement('legend', '.card-details-fieldset-legend');
    $descriptionFieldsetLegend.textContent = 'Описание';

    const $descriptionFieldset = createElement('fieldset', '.card-details-fieldset');
    $descriptionFieldset.append($descriptionFieldsetLegend, $descriptionTextarea);

    const $description = createElement('div', '.card-details-description');
    $description.appendChild($descriptionFieldset);


    const $main = createElement('div', '.card-details-main');
    $main.append($title, $description);

    $details.append($header, $main);

    document.body.appendChild($details);

    return $details;
};

export default details;