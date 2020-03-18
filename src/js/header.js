'use strict';

import DOMHelpers from './helpers/DOMHelpers.js';

const { createElement } = DOMHelpers();

const logo = () => {
    const $logo = createElement('a', '#logo');
    $logo.href = '/';
    $logo.textContent = 'kanban';
    return $logo;
};

const boards = () => {
    const $boards = createElement('button', '.btn-boards');
    $boards.textContent = 'доски';
    return $boards;
};

const home = () => {
    const $home = createElement('button', 'btn-home');

    return $home;
};

const header = () => {
    const $header = createElement('header');
    $header.append(home(), boards(), logo());
    return $header;
}

export default header;