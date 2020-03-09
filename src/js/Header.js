'use strict';

import DOMHelpers from './helpers/DOMHelpers.js';

const Header = () => {

    const {
        createElement
    } = DOMHelpers();

    const header = () => {
        const $header = createElement('header');
        return $header;
    }

    return {
        header
    };
}

export default Header;