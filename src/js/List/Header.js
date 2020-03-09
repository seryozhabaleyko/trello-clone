'use strict';

import { template } from '../template.js';
import DOMHelpers from '../helpers/DOMHelpers.js';

const Header = () => {

    const {
        createElement
    } = DOMHelpers();

    const title = (text) => {
        const $title = createElement('span', '.list-title');
        $title.textContent = text;

        $title.addEventListener('dblclick', function () {
            this.setAttribute('contenteditable', 'true');
            this.focus();
        });

        $title.addEventListener('blur', function () {
            this.removeAttribute('contenteditable');
        });

        return $title;
    };

    const more = () => {
        const $more = createElement('div', '.list-more');

        const $moreLink = document.createElement('a');
        $moreLink.href = 'javascript:void(0)';
        $moreLink.insertAdjacentHTML('afterbegin', template.more);

        $more.appendChild($moreLink);

        return $more;
    };

    const header = (titleText) => {
        const $header = createElement('div', '.list-header');

        $header.append(title(titleText), more());

        return $header;
    };

    return {
        header
    };
};

export default Header;