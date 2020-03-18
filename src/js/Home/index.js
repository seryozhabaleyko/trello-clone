'use strict';

import boards from './boards.js';
import sidebar from './sidebar.js';

export const main = document.createElement('main');

const $sidebar = document.createElement('div');


main.append(sidebar(), $sidebar, boards());