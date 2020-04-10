import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';

const { createElement } = DOMHelpers();

const object = [
    { name: 'Доски', href: '#boards', icon: icons.trello },
    { name: 'Шаблоны', href: '#', icon: icons.layout },
    { name: 'Главная', href: '#home', icon: icons.home },
];

const link = ({ name, href, icon }) => {
    const $span = createElement('span', '.bottom-navigation-action-label');
    $span.textContent = name;

    const $wrapper = createElement('span', '.bottom-navigation-action-wrapper');
    $wrapper.insertAdjacentHTML('afterbegin', icon);
    $wrapper.append($span);

    const $link = createElement('a', '.bottom-navigation-action');
    $link.href = href;
    $link.append($wrapper);

    return $link;
};

const bottomNavigation = () => {
    const $bottomNavigation = createElement('div', '.bottom-navigation');

    object.forEach((obj) => {
        $bottomNavigation.append(link(obj));
    });

    return $bottomNavigation;
};

export default bottomNavigation;