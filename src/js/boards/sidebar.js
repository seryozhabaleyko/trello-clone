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
    const $span = createElement('span', CLASS.sidebarLinkLabel);
    $span.insertAdjacentText('afterbegin', name);

    const $link = createElement('a', CLASS.sidebarLink);
    $link.href = href;
    $link.insertAdjacentHTML('afterbegin', icon);
    $link.append($span);

    return $link;
};

const sidebar = () => {
    const $sidebar = createElement('aside', CLASS.sidebar);

    object.forEach((iterator) => {
        $sidebar.append(link(iterator));
    });

    return $sidebar;
};

export default sidebar;