import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';

const { createElement } = DOMHelpers();

const favoriteButton = () => {
    function buttonHandler(e) {
        e.preventDefault();
        console.log(this.closest('.board') || this.closest('.board-horizontal'));
    }

    const $button = createElement('button', '.btn-favorite');
    $button.type = 'button';
    $button.insertAdjacentHTML('afterbegin', icons.starBorder);
    $button.addEventListener('click', buttonHandler, false);

    return $button;
};

export default favoriteButton;