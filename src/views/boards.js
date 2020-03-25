'use strict';

import header from '../js/header';
import bottomNavigation from '../js/Home/bottomNavigation';
import boards from '../js/Home/boards';
import ripple from '../js/plugins/ripple';
import sidebar from '../js/Home/sidebar';

function boardsPage(root) {
    const $main = document.createElement('main');
    $main.id = 'boards-body';

    $main.append(sidebar(), bottomNavigation(), boards());

    root.append(header(), $main);

    ripple(
        Array.from(
            document.querySelectorAll('[ripple]')
        )
    );
}

export default boardsPage;