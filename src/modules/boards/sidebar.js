import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';

const { createElement } = DOMHelpers();

const object = [
    { name: 'Доски', href: '#boards', icon: icons.trello },
    { name: 'Шаблоны', href: '/', icon: icons.layout },
    { name: 'Главная страница', href: '/', icon: icons.home },
];

const link = ({ name, href, icon }) => {
    const $span = createElement('span', '.sidebar-link-label');
    $span.textContent = name;

    const $link = createElement('a', '.sidebar-link');
    $link.href = href;
    $link.insertAdjacentHTML('afterbegin', icon);
    $link.append($span);

    return $link;
};

const sidebar = () => {
    const $nav = createElement('nav');

    object.forEach((obj) => {
        $nav.append(link(obj));
    });

    const $sidebar = createElement('aside', '.sidebar');
    $sidebar.append($nav);

    return $sidebar;
};

export default sidebar;