/* const template1 = {
    more: `
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
    `,
    plus: `
        <svg viewBox="0 0 24 24" width="1em" height="1em">
            <path d="M12.75 11.25V6.766A.758.758 0 0 0 12 6a.758.758 0 0 0-.75.766v4.484H6.766A.758.758 0 0 0 6 12c0 .414.343.75.766.75h4.484v4.484c0 .423.336.766.75.766s.75-.343.75-.766V12.75h4.484A.758.758 0 0 0 18 12a.758.758 0 0 0-.766-.75H12.75z" fill-rule="nonzero" fill="currentColor"></path>
        </svg>
    `,
    x: `
        <svg viewBox="0 0 24 24" width="1em" height="1em">
            <path d="M13.476 12.04l4.248-4.248a.992.992 0 1 0-1.402-1.403l-4.248 4.248L7.787 6.35a.992.992 0 0 0-1.402 1.403l4.286 4.286-4.26 4.261a.992.992 0 1 0 1.402 1.403l4.26-4.261 4.223 4.222a.992.992 0 1 0 1.403-1.402l-4.223-4.223z" fill-rule="nonzero" fill="currentColor"></path>
        </svg>
                <svg viewBox="0 0 24 24" width="1em" height="1em">
            <path d="M13.476 12.04l4.248-4.248a.992.992 0 1 0-1.402-1.403l-4.248 4.248L7.787 6.35a.992.992 0 0 0-1.402 1.403l4.286 4.286-4.26 4.261a.992.992 0 1 0 1.402 1.403l4.26-4.261 4.223 4.222a.992.992 0 1 0 1.403-1.402l-4.223-4.223z" fill-rule="nonzero" fill="currentColor"></path>
        </svg>
    `,

    board: {
        add: `<p><span>Создать доску</span></p>`,
        section: {
            header: `
                <span>
                    <svg viewBox="0 0 24 24" width="28px" height="28px">
                        <path d="M12 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-3.142.72a4.5 4.5 0 1 1 6.285 0C17.999 13.096 20 16.285 20 20H4c0-3.716 2.002-6.906 4.858-8.28zM12 13c-2.678 0-5.007 2.084-5.752 5h11.504c-.745-2.916-3.074-5-5.752-5z" fill-rule="nonzero" fill="#42526e"></path>
                    </svg>
                </span>
                <h3 class="boards-section-header-title">Персональные доски</h3>
            `
        },
        icons: {
            dashboard: `
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
            `
        }
    }
} */


const Template = () => {

    const board = {
        add: `<p><span>Создать доску</span></p>`,
            section: {
            header: `
                <span>
                    <svg viewBox="0 0 24 24" width="28px" height="28px">
                        <path d="M12 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-3.142.72a4.5 4.5 0 1 1 6.285 0C17.999 13.096 20 16.285 20 20H4c0-3.716 2.002-6.906 4.858-8.28zM12 13c-2.678 0-5.007 2.084-5.752 5h11.504c-.745-2.916-3.074-5-5.752-5z" fill-rule="nonzero" fill="#42526e"></path>
                    </svg>
                </span>
                <h3 class="boards-section-header-title">Персональные доски</h3>
            `
        },
        icons: {
            dashboard: `
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
            `
        }
    }

    const boardCreation = `
        <from class="board-creation">
            <div class="board-creation-header">
                <div class="making-board" style="background: rgb(0, 121, 191)">
                    <input class="making-board-title" type="text" placeholder="Добавить заголовок доски"/>
                    <button class="making-board-close" type="button" data-close>
                        <svg viewBox="0 0 24 24" width="24" height="24" data-close>
                            <path d="M13.476 12.04l4.248-4.248a.992.992 0 1 0-1.402-1.403l-4.248 4.248L7.787 6.35a.992.992 0 0 0-1.402 1.403l4.286 4.286-4.26 4.261a.992.992 0 1 0 1.402 1.403l4.26-4.261 4.223 4.222a.992.992 0 1 0 1.403-1.402l-4.223-4.223z" data-close></path>
                        </svg>
                    </button>
                </div>
                <div class="felt-tip-pens">
                    <button class="felt-tip-pen" type="button" style="background: rgb(0, 121, 191)" data-trigger></button>
                    <button class="felt-tip-pen" type="button" style="background: rgb(81, 152, 57)" data-trigger></button>
                    <button class="felt-tip-pen" type="button" style="background: rgb(210, 144, 52)" data-trigger></button>
                    <button class="felt-tip-pen" type="button" style="background: rgb(176, 70, 50)" data-trigger></button>
                    <button class="felt-tip-pen" type="button" style="background: rgb(156, 39, 176)" data-trigger></button>
                    <button class="felt-tip-pen" type="button" style="background: rgb(3, 169, 244)" data-trigger></button>
                    <button class="felt-tip-pen" type="button" style="background: rgb(0, 150, 136)" data-trigger></button>
                    <button class="felt-tip-pen" type="button" style="background: rgb(158, 158, 158)" data-trigger></button>
                    <button class="felt-tip-pen" type="button" style="background: rgb(96, 125, 139)" data-trigger></button>
                </div>
            </div>
            <div class="board-creation-footer">
                <button class="create-board-submit-button" type="button" data-submit>Создать доску</button>
            </div>
        </from>
    `;

    const close = `
        <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M13.476 12.04l4.248-4.248a.992.992 0 1 0-1.402-1.403l-4.248 4.248L7.787 6.35a.992.992 0 0 0-1.402 1.403l4.286 4.286-4.26 4.261a.992.992 0 1 0 1.402 1.403l4.26-4.261 4.223 4.222a.992.992 0 1 0 1.403-1.402l-4.223-4.223z"></path>
        </svg>
    `;

    const more = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" data-more-toggle>
            <path d="M0 0h24v24H0z" fill="none" data-more-toggle/>
            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" data-more-toggle/>
        </svg>
    `;

    return {
        close,
        more,
        boardCreation,
        board
    };
};

export default Template;