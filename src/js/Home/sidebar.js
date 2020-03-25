'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import Template from '../Template.js';

const template = Template();
const { createElement } = DOMHelpers();

const object = [
    { name: 'Доски', href: '#boards', icon: template.boards({}) },
    { name: 'Шаблоны', href: '/', icon: template.temp({}) },
    { name: 'Главная страница', href: '/', icon: template.home({}) }
];

const link = ({ name, href, icon }) => {
    const $link = createElement('a', '.sidebar-action');
    $link.href = href;
    $link.setAttribute('ripple', '');

    const $span = createElement('span', '.sidebar-action-label');

    $span.insertAdjacentText('afterbegin', name);

    $link.insertAdjacentHTML('afterbegin', icon);
    $link.appendChild($span);

    return $link;
};

function sidebar() {
    const $sidebar = createElement('aside', '.sidebar');

    for (const iterator of object) {
        $sidebar.appendChild(link(iterator));
    }

    return $sidebar;
}

export default sidebar;