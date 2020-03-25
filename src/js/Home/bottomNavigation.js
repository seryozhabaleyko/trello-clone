'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import Template from '../Template.js';

const template = Template();
const { createElement } = DOMHelpers();

const object = [
    { name: 'Доски', href: '#boards', icon: template.boards({}) },
    { name: 'Шаблоны', href: '#', icon: template.temp({}) },
    { name: 'Главная', href: '#home', icon: template.home({}) }
];

const link = ({ name, href, icon }) => {
    const $link = createElement('a', '.bottom-navigation-action');
    $link.href = href;
    $link.setAttribute('ripple', '');

    const $wrapper = createElement('span', '.bottom-navigation-action-wrapper');

    const $span = createElement('span', '.bottom-navigation-action-label');

    $span.insertAdjacentText('afterbegin', name);

    $wrapper.insertAdjacentHTML('afterbegin', icon);

    $link.appendChild($wrapper).appendChild($span);

    return $link;
};

function bottomNavigation() {
    const $bottomNavigation = createElement('div', '.bottom-navigation');

    for (const iterator of object) {
        $bottomNavigation.appendChild(link(iterator));
    }

    return $bottomNavigation;
}

export default bottomNavigation;