import DOMHelpers from '../helpers/DOMHelpers';
import icons from '../helpers/icons';

const { createElement } = DOMHelpers();

const object = [
    { name: 'Доски', href: '#boards', icon: icons.trello },
    { name: 'Шаблоны', href: '#', icon: icons.layout },
    { name: 'Главная', href: '#home', icon: icons.home },
];

const CLASS = {
    bottomNavigation: '.bottom-navigation',
    bottomNavigationAction: '.bottom-navigation-action',
    bottomNavigationActionWrapper: '.bottom-navigation-action-wrapper',
    bottomNavigationActionLabel: '.bottom-navigation-action-label',
};

const link = ({ name, href, icon }) => {
    const $span = createElement('span', CLASS.bottomNavigationActionLabel);
    $span.insertAdjacentText('afterbegin', name);

    const $wrapper = createElement('span', CLASS.bottomNavigationActionWrapper);
    $wrapper.insertAdjacentHTML('afterbegin', icon);
    $wrapper.append($span);

    const $link = createElement('a', CLASS.bottomNavigationAction);
    $link.href = href;
    $link.append($wrapper);

    return $link;
};

const bottomNavigation = () => {
    const $bottomNavigation = createElement('div', CLASS.bottomNavigation);

    object.forEach((iterator) => {
        $bottomNavigation.append(link(iterator));
    });

    return $bottomNavigation;
};

export default bottomNavigation;