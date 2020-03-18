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

    const settings = ({ width = 24, height = 24, color = '#ccc' }) => `
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="${height}" viewBox="0 0 24 24" width="${width}" fill="${color}">
            <g>
                <path d="M0,0h24v24H0V0z" fill="none"/>
                <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
            </g>
        </svg>
    `;

    const personal = ({ width = 24, height = 24, color = '#ccc' }) => `
        <svg viewBox="0 0 24 24" width="${width}" height="${height}" fill="${color}">
            <path d="M12 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-3.142.72a4.5 4.5 0 1 1 6.285 0C17.999 13.096 20 16.285 20 20H4c0-3.716 2.002-6.906 4.858-8.28zM12 13c-2.678 0-5.007 2.084-5.752 5h11.504c-.745-2.916-3.074-5-5.752-5z" fill-rule="nonzero"></path>
        </svg>
    `;

    const star = ({ width = 24, height = 24, color = '#ccc' }) => `
        <svg xmlns="http://www.w3.org/2000/svg" height="${height}" viewBox="0 0 24 24" width="${width}" fill="${color}">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    `;

    return {
        close,
        more,
        boardCreation,
        board,
        settings,
        personal,
        star
    };
};

export default Template;