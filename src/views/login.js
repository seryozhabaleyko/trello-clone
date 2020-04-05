import DOMHelpers from '../js/helpers/DOMHelpers';
import icons from '../js/helpers/icons';
import firebase from '../js/firebase';
import '../scss/login.scss';

const { createElement } = DOMHelpers();

const toggleSignIn = (e) => {
    e.preventDefault();

    const { submit } = document.forms.login;

    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    } else {
        let { email, password } = document.forms.login;
        email = email.value;
        password = password.value;

        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }

        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }

        submit.disabled = true;

        firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
            const { code, message } = error;

            if (code === 'auth/wrong-password') {
                console.error('Wrong password.');
            } else {
                console.error(message);
            }

            submit.disabled = false;
        });
    }

    submit.disabled = true;
};

const form = () => {
    const $form = createElement('form', '#login');
    $form.name = 'login';
    $form.addEventListener('submit', toggleSignIn, false);

    const $title = createElement('h2');
    $title.textContent = 'Войти';

    const $emailWrapper = createElement('div');
    const $email = createElement('input', '#email');
    $email.type = 'email';
    $email.name = 'email';
    $email.placeholder = 'Введите email';
    $email.setAttribute('required', '');
    $emailWrapper.appendChild($email);
    $emailWrapper.insertAdjacentHTML('beforeend', icons.email);

    const $passwordWrapper = createElement('div');
    const $password = createElement('input');
    $password.type = 'password';
    $password.name = 'password';
    $password.placeholder = 'Введите пароль';
    $password.setAttribute('required', '');
    $passwordWrapper.appendChild($password);
    $passwordWrapper.insertAdjacentHTML('beforeend', icons.lock);

    const $submit = createElement('input', '.blue');
    $submit.type = 'submit';
    $submit.name = 'submit';
    $submit.value = 'Войти';

    const $linkRegister = createElement('a', '.link-register');
    $linkRegister.href = '/#register';
    $linkRegister.textContent = 'Создать учетную запись';

    $form.append($title, $emailWrapper, $passwordWrapper, $submit, $linkRegister);

    return $form;
};

const login = (root) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref(`users/${user.uid}`)
                .once('value', (snapshot) => {
                    const data = snapshot.val();
                    localStorage.setItem('users', JSON.stringify(data || { login }));
                    window.location.href = '/#boards';
                });
        } else {
            root.classList.add('login-page');

            const $loginWrapper = createElement('div', '.login-wrapper');

            root.appendChild($loginWrapper).appendChild(form());
        }
    });
};

export default login;