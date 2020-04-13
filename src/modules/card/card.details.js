import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';
import '../../scss/board/card/card.details.scss';
import firebase from '../firebase';

const { createElement } = DOMHelpers();

const details = (cardText, listId, cardId) => {
    const detailsClose = createElement('button', '.card-details-close');
    detailsClose.insertAdjacentHTML('beforeend', icons.close);

    const detailsHeader = createElement('div', '.card-details-header');
    detailsHeader.textContent = 'Редактирование карточки';
    detailsHeader.append(detailsClose);

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

    const titleIcon = createElement('div', '.title-icon');
    titleIcon.insertAdjacentHTML('afterbegin', icons.title);

    const titleInputField = createElement('textarea', '.title-input-field');
    titleInputField.placeholder = 'Название карточки';
    titleInputField.addEventListener('blur', handleTitleInput, false);

    const titleContent = createElement('div', '.title-content');
    titleContent.append(titleInputField);

    const title = createElement('div', '.card-details-title');
    title.append(titleIcon, titleContent);

    const descriptionIcon = createElement('div', '.card-details-description-icon');
    descriptionIcon.insertAdjacentHTML('afterbegin', icons.description);

    const descriptionTitle = createElement('h6', '.card-details-description-title');
    descriptionTitle.textContent = 'Описание';

    const descriptionLink = createElement('a');
    descriptionLink.href = '#';
    descriptionLink.textContent = 'Добавить более подробное описание...';
    descriptionLink.addEventListener('click', (e) => {
        e.preventDefault();
    });

    const descriptionMain = createElement('div', '.card-details-description-main');
    descriptionMain.append(descriptionLink);

    const descriptionContent = createElement('div', '.card-details-description-content');
    descriptionContent.append(descriptionTitle, descriptionMain);

    const description = createElement('div', '.card-details-description');
    description.append(descriptionIcon, descriptionContent);

    const actionIcon = createElement('div', '.action-icon');
    actionIcon.insertAdjacentHTML('afterbegin', icons.action);

    const actionTitle = createElement('div', '.action-title');
    actionTitle.textContent = 'Действия';

    const actionDelete = createElement('button', '.action-delete');
    actionDelete.textContent = 'Удалить';
    actionDelete.insertAdjacentHTML('afterbegin', icons.deletee);

    const actionMain = createElement('div', '.action-main');
    actionMain.append(actionDelete);

    const actionContent = createElement('div', '.action-content');
    actionContent.append(actionTitle, actionMain);

    const action = createElement('div', '.card-details-action');
    action.append(actionIcon, actionContent);

    const detailsMain = createElement('div', '.card-details-main');
    detailsMain.append(title, description, action);

    const cardDetails = createElement('div', '.card-details');
    cardDetails.append(detailsHeader, detailsMain);

    const detailsOverlay = createElement('div', '.card-details-overlay');
    detailsOverlay.append(cardDetails);

    detailsOverlay.addEventListener('click', (e) => {
        const { target } = e;
        const close = () => {
            cardDetails.classList.add('card-details-close-animation');
            cardDetails.addEventListener('animationend', () => {
                cardDetails.parentNode.remove();
            });
        };
        if (target.classList.contains('card-details-overlay') || target.closest('.card-details-close')) {
            close();
        }
        if (target.classList.contains('action-delete')) {
            firebase.database()
                .ref(`/users/${userId}/boards/${boardId}/lists/${listId}/cards/${cardId}`)
                .remove();
            cardText.closest('.card').remove();
            close();
        }
    });

    const successCallback = (snapshot) => {
        const data = snapshot.val();
        titleInputField.value = data.title;
    };

    const errorCallback = (error) => {
        alert(error);
    };

    firebase.database().ref(`/users/${userId}/boards/${boardId}/lists/${listId}/cards/${cardId}`)
        .once('value', successCallback).catch(errorCallback);

    document.body.append(detailsOverlay);

    return detailsOverlay;
};

export default details;