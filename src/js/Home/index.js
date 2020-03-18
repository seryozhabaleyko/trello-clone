'use strict';

import boards from './boards.js';
import sidebar from './sidebar.js';

export const main = document.createElement('main');
main.append(sidebar(), boards());