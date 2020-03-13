'use strict';

import DOMHelpers from './helpers/DOMHelpers.js';

const { createElement } = DOMHelpers();

const Header = () => {

    const header = () => {
        const $header = createElement('header');
        return $header;
    }

    return {
        header
    };
}

export default Header;