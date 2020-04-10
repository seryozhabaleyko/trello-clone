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

const making = () => {
    const $button = createElement('button', '.making-board-close');
    $button.type = 'button';
    $button.insertAdjacentHTML('afterbegin', icons.close);

    function makingModalCloseHandler() {
        this.closest('[data-modal-close]').remove();
        this.removeEventListener('click', makingModalCloseHandler, false);
    }

    $button.addEventListener('click', makingModalCloseHandler, false);

    const $input = createElement('input', '.making-board-title');
    $input.type = 'text';
    $input.placeholder = 'Добавить заголовок доски';

    const $makingBoard = createElement('div', '.making-board');
    $makingBoard.style.backgroundImage = `url('${backgroundsImages.bg1}')`;
    $makingBoard.append($input, $button);

    function backgroundHandler(e) {
        if (e.target.dataset.trigger !== undefined) {
            $makingBoard.setAttribute('style', e.target.getAttribute('style'));
        }
    }

    const $background = background();
    $background.addEventListener('click', backgroundHandler, false);

    const $submit = createElement('button', '.making-board-submit');
    $submit.type = 'button';
    $submit.innerHTML = 'Создать доску';

    function submitHandler() {
        const obj = {
            id: Date.now(),
            title: ($input.value || 'Название доски'),
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            background: $makingBoard.getAttribute('style'),
            favorite: false,
            lists: [],
        };

        document.querySelector('.boards-adding').before(board(obj));

        writeBoardData(obj);
    }

    $submit.addEventListener('click', submitHandler, false);

    const $makingFooter = createElement('div', '.making-footer');
    $makingFooter.append($submit);

    const $makingBody = createElement('div', '.making-body');
    $makingBody.append($makingBoard, $background);

    const $making = createElement('form', '.making');
    $making.append($makingBody, $makingFooter);

    return $making;
};

export default making;