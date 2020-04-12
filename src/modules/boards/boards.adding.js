import DOMHelpers from '../helpers/DOMHelpers';
import ripple from '../plugins/ripple';
import making from './form/making';
import '../../scss/boards/boards-adding.scss';

const { createElement } = DOMHelpers();

const handleOverlay = (e) => {
  const { target } = e;
  if (target.classList.contains('modal-overlay') || target.closest('.making-board-close')) {
    const modal = document.querySelector('.modal');
    modal.classList.add('modal-close-animation');
    modal.addEventListener('animationend', () => {
      modal.parentNode.remove();
    });
  }
};

const modal = () => {
  const $modal = createElement('div', '.modal');
  $modal.append(making());

  const $overlay = createElement('div', '.modal-overlay');
  $overlay.addEventListener('click', handleOverlay, false);
  $overlay.append($modal);

  document.body.append($overlay);
  document.querySelector('.making-board-title').focus();
};

const boardAdding = () => {
  const $button = createElement('button', '.boards-adding');
  $button.type = 'button';
  $button.textContent = 'Создать доску';
  $button.addEventListener('click', modal, false);
  ripple($button);

  return $button;
};

export default boardAdding;