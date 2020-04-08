class RippleStyle {
    constructor(width, height, posX, posY) {
        this.width = (width <= height) ? height : width;
        this.height = (width <= height) ? height : width;
        this.top = posY - (this.height * 0.5);
        this.left = posX - (this.width * 0.5);
    }
}

function rippleHandler(e) {
    const $span = document.createElement('span');
    $span.className = 'btn-ripple';
    this.appendChild($span);

    const {
        width, height, left, top,
    } = this.getBoundingClientRect();

    const posX = e.pageX - left;
    const posY = e.pageY - top;

    const rippleStyle = new RippleStyle(width, height, posX, posY);

    $span.style.width = `${rippleStyle.width}px`;
    $span.style.height = `${rippleStyle.height}px`;
    $span.style.top = `${rippleStyle.top}px`;
    $span.style.left = `${rippleStyle.left}px`;

    $span.addEventListener('animationend', () => {
        $span.remove();
    }, false);
}

const ripple = (element) => {
    element.addEventListener('mousedown', rippleHandler, false);
};

export default ripple;