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

        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(({ code, message }) => {
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

    const $title = createElement('h3');
    $title.textContent = 'Войти';

    const $description = createElement('p');
    $description.textContent = 'Это бесплатно - и всегда так будет.';

    const $linkLoginOrRegistration = createElement('div', '.link-login-or-registration');

    const $linkLogin = createElement('a', '.current');
    $linkLogin.href = '/#login';
    $linkLogin.textContent = 'Вход';

    const $linkRegister = createElement('a');
    $linkRegister.href = '/#register';
    $linkRegister.textContent = 'Регистрация';

    $linkLoginOrRegistration.append($linkLogin, $linkRegister);

    const $emailWrapper = createElement('div');
    const $email = createElement('input', '#email');
    $email.type = 'email';
    $email.name = 'email';
    $email.placeholder = 'Электронный адрес';
    $email.setAttribute('required', '');
    $emailWrapper.appendChild($email);
    $emailWrapper.insertAdjacentHTML('beforeend', icons.email);

    const $passwordWrapper = createElement('div');
    const $password = createElement('input');
    $password.type = 'password';
    $password.name = 'password';
    $password.placeholder = 'Пароль';
    $password.setAttribute('required', '');
    $passwordWrapper.appendChild($password);
    $passwordWrapper.insertAdjacentHTML('beforeend', icons.lock);

    const $submit = createElement('input', '.blue');
    $submit.type = 'submit';
    $submit.name = 'submit';
    $submit.value = 'Войти';

    $form.append(
        $title,
        $description,
        $linkLoginOrRegistration,
        $emailWrapper,
        $passwordWrapper,
        $submit,
    );

    return $form;
};

const login = (root) => {
    document.title = 'Kanban — Выполните вход';

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref(`users/${user.uid}`)
                .once('value', (snapshot) => {
                    const data = snapshot.val();
                    localStorage.setItem('users', JSON.stringify(data || {}));
                    window.location.href = '/#boards';
                });
        } else {
            const $bg = createElement('div', '.login-bg');
            $bg.insertAdjacentHTML('afterbegin', icons.bgLoginAndRegister);

            const $wrapper = createElement('div', '.login-wrapper');
            $wrapper.appendChild(form());

            root.classList.add('login');
            root.append($bg, $wrapper);
        }
    });
};

export default login;