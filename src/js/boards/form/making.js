import DOMHelpers from '../../helpers/DOMHelpers';
import backgroundsImages from '../../helpers/background';
import background from './background';
import icons from '../../helpers/icons';
import board from '../board';
import store from '../../Store';

import firebase from '../../firebase';

const writeBoardData = (obj) => {
    const userId = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`users/${userId}/boards/${obj.id}`);
    ref.set(obj)
        .then(() => ref.once('value'))
        .then((snapshot) => {
            const data = snapshot.val();
            localStorage.setItem('boards-test', JSON.stringify(data));
        });
};

const { createElement } = DOMHelpers();

const CLASS = {
    making: '.making',
    makingBody: '.making-body',
    makingFooter: '.making-footer',
    makingBoard: '.making-board',
    makingBoardTitle: '.making-board-title',
    makingBoardClose: '.making-board-close',
    makingBoardSubmit: '.making-board-submit',
};

const making = () => {
    const $making = createElement('form', CLASS.making);
    const $makingBody = createElement('div', CLASS.makingBody);
    const $makingFooter = createElement('div', CLASS.makingFooter);

    const $makingBoard = createElement('div', CLASS.makingBoard);
    $makingBoard.style.backgroundImage = `url('${backgroundsImages.bg1}')`;

    const $input = createElement('input', CLASS.makingBoardTitle);
    $input.type = 'text';
    $input.placeholder = 'Добавить заголовок доски';

    const $button = createElement('button', CLASS.makingBoardClose);
    $button.type = 'button';
    $button.insertAdjacentHTML('afterbegin', icons.close);

    function makingModalCloseHandler() {
        this.closest('[data-modal-close]').remove();
        this.removeEventListener('click', makingModalCloseHandler, false);
    }

    $button.addEventListener('click', makingModalCloseHandler, false);

    $makingBoard.append($input, $button);

    function backgroundHandler(e) {
        if (e.target.dataset.trigger !== undefined) {
            $makingBoard.setAttribute('style', e.target.getAttribute('style'));
        }
    }

    const $background = background();
    $background.addEventListener('click', backgroundHandler, false);

    const $submit = createElement('button', CLASS.makingBoardSubmit);
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

        store.insert(obj);

        writeBoardData(obj);
    }

    $submit.addEventListener('click', submitHandler, false);

    $makingFooter.append($submit);

    $makingBody.append($makingBoard, $background);

    $making.append($makingBody, $makingFooter);

    return $making;
};

export default making;