import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';

const { createElement } = DOMHelpers();

const object = [
    { name: 'Доски', href: '#boards', icon: icons.trello },
    { name: 'Шаблоны', href: '/', icon: icons.layout },
    { name: 'Главная страница', href: '/', icon: icons.home },
];

const CLASS = {
    sidebar: '.sidebar',
    sidebarLink: '.sidebar-link',
    sidebarLinkLabel: '.sidebar-link-label',
};

const link = ({ name, href, icon }) => {
    const $link = createElement('a', CLASS.sidebarLink);
    $link.href = href;
    $link.setAttribute('ripple', '');

    const $span = createElement('span', CLASS.sidebarLinkLabel);

    $span.insertAdjacentText('afterbegin', name);

    $link.insertAdjacentHTML('afterbegin', icon);
    $link.appendChild($span);

    return $link;
};

function sidebar() {
    const $sidebar = createElement('aside', CLASS.sidebar);

    for (const iterator of object) {
        $sidebar.appendChild(link(iterator));
    }

    return $sidebar;
}

export default sidebar;