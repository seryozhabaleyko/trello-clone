'use strict';

import DOMHelpers from '../js/helpers/DOMHelpers';

const { createElement } = DOMHelpers();

const boards = () => {
    const $boards = createElement('button', '.btn-boards');
    $boards.textContent = 'доски';
    return $boards;
};

const home = () => {
    const $home = createElement('button', 'btn-home');

    return $home;
};

function logo() {
    const $logo = createElement('a', '#logo');
    $logo.href = '/';
    $logo.textContent = 'kanban';
    return $logo;
}

function header() {
    const $header = createElement('header');
    $header.append(logo()); // home(), boards()
    return $header;
}

export default header;