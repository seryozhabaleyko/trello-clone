import DOMHelpers from '../js/helpers/DOMHelpers';
import icons from '../js/helpers/icons';
import firebase from '../js/firebase';
import '../scss/register.scss';

const { createElement } = DOMHelpers();

const handleSignUp = (e) => {
    e.preventDefault();

    let {
        email, password, passwordRepeat, submit,
    } = document.forms.register;

    email = email.value;
    password = password.value;
    passwordRepeat = passwordRepeat.value;

    if (email.length < 4) {
        alert('Please enter an address.');
        return;
    }

    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }

    if (password !== passwordRepeat) {
        alert('Please enter a password.');
        return;
    }

    submit.disabled = true;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
        const { code, message } = error;

        if (code === 'auth/weak-password') {
            console.error('The password is too weak');
        } else {
            console.error(message);
        }

        submit.disabled = false;
    });
};

const form = () => {
    const $form = createElement('form', '#register');
    $form.name = 'register';
    $form.addEventListener('submit', handleSignUp, false);

    const $title = createElement('h2');
    $title.textContent = 'Регистрация';

    const $emailWrapper = createElement('div');
    const $email = createElement('input', '#email');
    $email.type = 'email';
    $email.name = 'email';
    $email.placeholder = 'Введите email';
    $email.setAttribute('required', '');
    $emailWrapper.insertAdjacentHTML('beforeend', icons.email);
    $emailWrapper.appendChild($email);

    const $passwordWrapper = createElement('div');
    const $password = document.createElement('input');
    $password.type = 'password';
    $password.name = 'password';
    $password.placeholder = 'Введите пароль';
    $password.setAttribute('required', '');
    $passwordWrapper.insertAdjacentHTML('beforeend', icons.lock);
    $passwordWrapper.appendChild($password);

    const $passwordRepeatWrapper = createElement('div');
    const $passwordRepeat = document.createElement('input');
    $passwordRepeat.type = 'password';
    $passwordRepeat.name = 'passwordRepeat';
    $passwordRepeat.placeholder = 'Введите пароль еще раз';
    $passwordRepeat.setAttribute('required', '');
    $passwordRepeatWrapper.insertAdjacentHTML('beforeend', icons.lock);
    $passwordRepeatWrapper.appendChild($passwordRepeat);

    const $submit = document.createElement('input');
    $submit.type = 'submit';
    $submit.name = 'submit';
    $submit.value = 'Продолжить регистрацию';

    $form.append($title, $emailWrapper, $passwordWrapper, $passwordRepeatWrapper, $submit);

    return $form;
};


const register = (root) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            window.location.href = '/#user/details';
        } else {
            const $wrapper = createElement('div', '.register-wrapper');
            $wrapper.appendChild(form());
            root.classList.add('register-page');
            root.appendChild($wrapper);
        }
    });
};

export default register;