'use strict';

import boards from './boards.js';
import navigation from './bottomNavigation.js';

const main = document.createElement('main');

const $sidebar = document.createElement('div');

main.append(navigation(), $sidebar, boards());

export default main;