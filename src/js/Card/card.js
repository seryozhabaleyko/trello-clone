import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
import dragCard from './dragCard';
import details from './card.details';
import firebase from '../firebase';

import popup from './popup';
import '../../scss/board/card/card.scss';
import '../../scss/board/card/card-detail.scss';

const { createElement } = DOMHelpers();

const CLASS = {
    card: '.card',
    cardDetail: '.card-detail',
    cardDetailHeader: '.card-detail-header',
    cardDetailHeaderIcon: '.card-detail-header-icon',
    cardDetailHeaderTitle: '.card-detail-header-title',
    cardDetailHeaderTitleTextarea: '.card-detail-header-title-textarea',

    detailSection: '.detail-section',
    detailSectionIcon: '.detail-section-icon',
    detailSectionBody: '.detail-section-body',
    detailSectionTitle: '.detail-section-title',
    detailSectionContent: '.detail-section-content',

    formAddingDescription: '.form-adding-description',
    fieldInputDescriptionCard: '.field-input-description-card',
    formAddingDescriptionAction: '.form-adding-description-action',
    buttonSubmitFieldInput: '.button-submit-field-input',
    buttonCloseFormAddingDescription: '.button-close-form-adding-description',

};

const cardDetail = (obj) => {
    const $cardDetail = createElement('div', CLASS.cardDetail);

    const $cardDetailHeader = createElement('div', CLASS.cardDetailHeader);
    const $cardDetailHeaderIcon = createElement('div', CLASS.cardDetailHeaderIcon);
    const $cardDetailHeaderTitle = createElement('div', CLASS.cardDetailHeaderTitle);
    const $cardDetailHeaderTitleTextarea = createElement('textarea', CLASS.cardDetailHeaderTitleTextarea);

    $cardDetailHeaderIcon.insertAdjacentHTML('afterbegin', icons.title);
    $cardDetailHeaderTitleTextarea.textContent = obj.content;
    $cardDetailHeaderTitle.append($cardDetailHeaderTitleTextarea);
    $cardDetailHeader.append($cardDetailHeaderIcon, $cardDetailHeaderTitle);


    const formAddingDescription = () => {
        const $formAddingDescription = createElement('form', CLASS.formAddingDescription);

        const $fieldInputDescriptionCard = createElement('textarea', CLASS.fieldInputDescriptionCard);
        $fieldInputDescriptionCard.placeholder = 'Добавить более подробное описание...';

        const $formAddingDescriptionAction = createElement('div', CLASS.formAddingDescriptionAction);

        const $buttonSubmitFieldInput = createElement('input', CLASS.buttonSubmitFieldInput);
        $buttonSubmitFieldInput.type = 'submit';
        $buttonSubmitFieldInput.value = 'Сохранить';

        const $buttonCloseFormAddingDescription = createElement('button', CLASS.buttonCloseFormAddingDescription);
        $buttonCloseFormAddingDescription.type = 'button';
        $buttonCloseFormAddingDescription.insertAdjacentHTML('afterbegin', icons.close);

        $formAddingDescriptionAction.append($buttonSubmitFieldInput, $buttonCloseFormAddingDescription);
        $formAddingDescription.append($fieldInputDescriptionCard, $formAddingDescriptionAction);

        return $formAddingDescription;
    };

    const section = (title, icon, content) => {
        const $detailSection = createElement('div', CLASS.detailSection);
        const $detailSectionIcon = createElement('div', CLASS.detailSectionIcon);
        const $detailSectionBody = createElement('div', CLASS.detailSectionBody);
        const $detailSectionTitle = createElement('div', CLASS.detailSectionTitle);
        const $detailSectionContent = createElement('div', CLASS.detailSectionContent);

        title && $detailSectionTitle.insertAdjacentText('afterbegin', title);
        content && $detailSectionContent.appendChild(content);
        $detailSectionBody.append($detailSectionTitle, $detailSectionContent);
        icon && $detailSectionIcon.insertAdjacentHTML('afterbegin', icon);
        $detailSection.append($detailSectionIcon, $detailSectionBody);

        return $detailSection;
    };

    $cardDetail.append($cardDetailHeader, section('Описание', icons.description, formAddingDescription()));

    return $cardDetail;
};

// details();

const card = (obj) => {
    const $card = createElement('div', CLASS.card);
    $card.setAttribute('draggable', 'true');
    $card.setAttribute('data-card-id', obj.id);
    $card.setAttribute('data-card-order', obj.order);
    $card.insertAdjacentHTML('afterbegin', obj.title);

    dragCard($card);

    return $card;
};

export default card;