'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import { template } from '../template.js';

const Sidebar = () => {

    const {
        createElement
    } = DOMHelpers();

    const sidebar = () => {
        const $sidebar = createElement('div', '.sidebar-section');

        const templatea = `
            <nav class="sidebar">
                <ul class="nav">
                    <li class="nav-item" active>
                        <a href="/#boards" class="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="30">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                            </svg>
                            <span>Доски</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="30">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path d="M10 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-4 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                            </svg>
                            <span>Шаблоны</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/#home" class="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="30">
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                            <span>Главная страница</span>
                        </a>
                    </li>
                </ul>
            </nav>
        `;

        $sidebar.insertAdjacentHTML('afterbegin', templatea);

        return $sidebar;
    };

    return {
        sidebar
    };
};

export default Sidebar;