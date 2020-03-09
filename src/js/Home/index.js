'use strict';

import Board from './Board.js';
import Sidebar from './Aside.js';

const { sidebar } = Sidebar();
const { section } = Board();

export const main = document.createElement('main');
main.append(sidebar(), section());