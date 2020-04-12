import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
import '../../scss/board/card/card.details.scss';
import firebase from '../firebase';

const { createElement } = DOMHelpers();

const details = (cardText, listId, cardId) => {
    const $close = createElement('button', '.card-details-close');
    $close.insertAdjacentHTML('beforeend', icons.close);

    const $header = createElement('div', '.card-details-header');
    $header.textContent = '123123123';
    $header.append($close);

    const userId = firebase.auth().currentUser.uid;
    const boardId = localStorage.getItem('boardId');

    const handleTitleInput = (e) => {
        const { target } = e;
        const { value } = target;
        // eslint-disable-next-line no-param-reassign
        cardText.textContent = value;

        firebase.database().ref(`/users/${userId}/boards/${boardId}/lists/${listId}/cards/${cardId}`)
            .child('title').set(value);
    };

    const $titleInput = createElement('textarea', '.card-details-title-input');
    $titleInput.placeholder = 'Название карточки';
    $titleInput.addEventListener('blur', handleTitleInput, false);

    const $titleFieldsetLegend = createElement('legend', '.card-details-fieldset-legend');
    $titleFieldsetLegend.textContent = 'Название';

    const $titleFieldset = createElement('fieldset', '.card-details-fieldset');
    $titleFieldset.append($titleFieldsetLegend, $titleInput);

    const $title = createElement('div', '.card-details-title');
    $title.append($titleFieldset);

    const $descriptionTextarea = createElement('textarea', '.card-details-description-textarea');
    $descriptionTextarea.style.height = '8rem';
    $descriptionTextarea.placeholder = 'Добавить более подробное описание...';

    const $descriptionFieldsetLegend = createElement('legend', '.card-details-fieldset-legend');
    $descriptionFieldsetLegend.textContent = 'Описание';

    const $descriptionFieldset = createElement('fieldset', '.card-details-fieldset');
    $descriptionFieldset.append($descriptionFieldsetLegend, $descriptionTextarea);

    const $description = createElement('div', '.card-details-description');
    $description.append($descriptionFieldset);

    const $main = createElement('div', '.card-details-main');
    $main.append($title, $description);

    const $details = createElement('div', '.card-details');
    $details.append($header, $main);

    const $overlay = createElement('div', '.card-details-overlay');
    $overlay.append($details);

    $overlay.addEventListener('click', (e) => {
        const { target } = e;
        if (target.classList.contains('card-details-overlay') || target.closest('.card-details-close')) {
            $details.classList.add('card-details-close-animation');
            $details.addEventListener('animationend', () => {
                $details.parentNode.remove();
            });
        }
    });

    const successCallback = (snapshot) => {
        const data = snapshot.val();

        $descriptionTextarea.value = data.title;
    };

    const errorCallback = (error) => {
        alert(error);
    };

    firebase.database().ref(`/users/${userId}/boards/${boardId}/lists/${listId}/cards/${cardId}`)
        .once('value', successCallback).catch(errorCallback);

    document.body.append($overlay);

    return $overlay;
};

export default details;