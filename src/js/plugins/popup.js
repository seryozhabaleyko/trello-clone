
const popup = (function () {
    let wrapper; let instance; let closeButton; let content; let _params; let t; let isAnimating = false; let
        animationType;
    const defineProperty = (obj, prop) => {
        obj = obj || {};
        obj[prop] = obj[prop] || '';
        return obj;
    };
    const centerize = () => {
        // center the content's height is greater window's height
        if (content.scrollHeight >= window.innerHeight) {
            content.classList.add('into-view');
        } else {
            content.classList.remove('into-view');
        }
    };

    function Popup() { }

    Popup.prototype.openModal = (params, cb) => {
        // set params
        _params = params;

        // set flag when animation in progress
        isAnimating = true;

        // set animation type
        _params.styles = defineProperty(_params.styles, 'position');

        if (_params.styles.animation) {
            animationType = _params.styles.position === 'center' ? 'zoomIn' : 'fadeInDown';
        }

        wrapper = document.createElement('div');
        wrapper.setAttribute('class', `sp-wrapper ${_params.styles.animation && 'fadeIn'}  ${_params.styles.position === 'center' ? 'center-all' : ''}`);

        // populate the content
        content = document.createElement('div');
        content.setAttribute('class', `content ${animationType}`);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = params.content;
        content.appendChild(tempDiv);

        // apply inline style
        const maxWidth = params.styles.maxWidth ? `max-width: ${params.styles.maxWidth}` : '';
        const duration = params.styles.duration ? `; animation-duration:${params.styles.duration / 1000}s` : '';
        content.setAttribute('style', `${maxWidth}${_params.styles.animation && duration}`);


        // add close button
        if (_params.styles.closeButton) {
            const closeButton = document.createElement('div');
            closeButton.setAttribute('class', 'sp-close-button');
            content.prepend(closeButton);
        }

        // add content to wrapper
        wrapper.appendChild(content);

        // add to body
        document.body.prepend(wrapper);

        t && clearTimeout(t);

        t = setTimeout(() => {
            isAnimating = false;
        }, params.styles.duration);

        cb && cb();
    };
    Popup.prototype.closeModal = (e) => {
        if (isAnimating) return;
        const classes = e.srcElement.getAttribute('class');
        if (classes && (classes.indexOf('sp-wrapper') > -1 || classes.indexOf('sp-close-button') > -1)) {
            if (_params.styles.animation) {
                wrapper.classList.remove('fadeIn');
                wrapper.classList.add('fadeOut');

                if (_params.styles.position !== 'center') {
                    content.classList.remove('fadeInDown');
                    content.classList.add('fadeOutUp');
                } else {
                    content.classList.remove('zoomIn');
                    content.classList.add('zoomOut');
                }

                setTimeout(() => {
                    wrapper && wrapper.parentNode.removeChild(wrapper);
                }, _params.styles.duration || 350);
            } else {
                wrapper.parentNode.removeChild(wrapper);
            }
        }
    };
    Popup.prototype.init = (params) => {
        const triggers = document.querySelectorAll('.sp-trigger');
        triggers.forEach((item) => {
            item.addEventListener('click', (e) => {
                const { target } = e;
                const id = target.getAttribute('data-target');
                const source = document.querySelector(`#${id}`);
                if (!source) {
                    alert('Error: Source unknown.');
                    return;
                }
                instance.openModal({ content: source.innerHTML, styles: params }, () => {
                    // load close wrapper
                    wrapper && wrapper.removeEventListener('click', instance.closeModal);
                    wrapper && wrapper.addEventListener('click', instance.closeModal);
                    // load close button
                    closeButton && closeButton.removeEventListener('click', instance.closeModal);
                    closeButton && closeButton.addEventListener('add', instance.closeModal);

                    centerize();
                });
            });
        });
        window.addEventListener('resize', () => centerize);
    };
    if (!instance) {
        instance = new Popup();
    }
    return instance;
}());


popup.init({
    maxWidth: '500px',
    duration: '200',
    closeButton: true,
    animation: true,
});