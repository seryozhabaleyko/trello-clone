import DOMHelpers from '../../helpers/DOMHelpers';
import backgroundsImages from '../../helpers/background';
import background from './background';
import icons from '../../helpers/icons';
import board from '../board';
import firebase from '../../firebase';

const writeBoardData = (obj) => {
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref(`users/${userId}/boards/${obj.id}`).set(obj);
};

const { createElement } = DOMHelpers();

const close = () => {
    const modal = document.querySelector('.modal');
    modal.classList.add('modal-close-animation');
    modal.addEventListener('animationend', () => {
        modal.parentNode.remove();
    });
};

const making = () => {
    const makingClose = createElement('button', '.making-board-close');
    makingClose.type = 'button';
    makingClose.insertAdjacentHTML('afterbegin', icons.close);

    const makingTitle = createElement('input', '.making-board-title');
    makingTitle.type = 'text';
    makingTitle.placeholder = 'Добавить заголовок доски';

    const makingBoard = createElement('div', '.making-board');
    makingBoard.style.backgroundImage = `url('${backgroundsImages.bg1}')`;
    makingBoard.append(makingTitle, makingClose);

    const submit = createElement('button', '.making-board-submit');
    submit.type = 'button';
    submit.innerHTML = 'Создать доску';

    const handleSubmit = () => {
        if (makingTitle.value.length === 0) {
            makingTitle.focus();
            return;
        }

        const obj = {
            id: Date.now(),
            title: makingTitle.value,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            background: makingBoard.getAttribute('style'),
            favorite: false,
        };

        document.querySelector('.boards-adding').before(board(obj));
        writeBoardData(obj);
        close();
    };

    submit.addEventListener('click', handleSubmit, false);

    const makingFooter = createElement('div', '.making-footer');
    makingFooter.append(submit);

    const makingBody = createElement('div', '.making-body');
    makingBody.append(makingBoard, background());

    const $making = createElement('form', '.making');
    $making.append(makingBody, makingFooter);

    return $making;
};

export default making;