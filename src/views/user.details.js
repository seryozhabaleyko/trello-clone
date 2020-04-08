import firebase from '../js/firebase';
import DOMHelpers from '../js/helpers/DOMHelpers';
import icons from '../js/helpers/icons';
import '../scss/details.scss';

const { createElement } = DOMHelpers();

const CLASS = {
    userDetails: '.user-details',
    userLogin: '.user-login',
    userName: '.user-name',
    userSurname: '.user-surname',
    userGender: '.user-gender',
    userSave: '.user-save',
    userEmail: '.user-email',
};

const writeUserData = ({
    login, email,
}) => {
    const userId = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`users/${userId}`);
    return ref.set({ login, email })
        .then(() => ref.once('value'));
    /* .then((snapshot) => {
        const data = snapshot.val();
        localStorage.setItem('users', JSON.stringify(data));
        // window.location.href = '/#boards';
    }); */
};

const detailsHandler = (e) => {
    e.preventDefault();

    const {
        login, email, submit,
    } = document.forms.details;

    submit.disabled = true;

    writeUserData({
        login: login.value,
        email: email.value,
    }).then((snapshot) => {
        const data = snapshot.val();
        localStorage.setItem('users', JSON.stringify(data));
        submit.disabled = false;
        // window.location.href = '/#boards';
    });
};

const form = (user) => {
    const $form = createElement('form', CLASS.userDetails);
    $form.name = 'details';
    $form.addEventListener('submit', detailsHandler, false);

    const $title = createElement('h2');
    $title.textContent = 'Личные данные';

    const $loginWrapper = createElement('div');
    const $login = createElement('input', CLASS.userLogin);
    $login.type = 'text';
    $login.name = 'login';
    $login.placeholder = 'Ваш логин';
    if (user.login) {
        $login.value = user.login;
    }
    $loginWrapper.appendChild($login);
    $loginWrapper.insertAdjacentHTML('beforeend', icons.login);

    const $nameWrapper = createElement('div');
    const $name = createElement('input', CLASS.userName);
    $name.type = 'text';
    $name.name = 'name';
    $name.placeholder = 'Ваше имя';
    $nameWrapper.appendChild($name);
    $nameWrapper.insertAdjacentHTML('beforeend', icons.login);

    const $surnameWrapper = createElement('div');
    const $surname = createElement('input', CLASS.userSurname);
    $surname.type = 'text';
    $surname.name = 'surname';
    $surname.placeholder = 'Ваша фамилия';
    $surnameWrapper.appendChild($surname);
    $surnameWrapper.insertAdjacentHTML('beforeend', icons.login);

    const $gender = createElement('select', CLASS.userGender);
    $gender.name = 'gender';

    const options = [
        { name: 'мужской', value: 'male' }, // selected
        { name: 'женский', value: 'female' },
    ];

    // eslint-disable-next-line no-restricted-syntax
    for (const { name, value } of options) {
        const $option = document.createElement('option');
        $option.value = value;
        $option.textContent = name;
        $gender.appendChild($option);
    }

    const $emailWrapper = createElement('div');
    const $email = createElement('input', CLASS.userEmail);
    $email.type = 'email';
    $email.name = 'email';
    $email.value = user.email;
    $email.placeholder = 'Ваш email';
    $emailWrapper.appendChild($email);
    $emailWrapper.insertAdjacentHTML('beforeend', icons.email);

    const $save = createElement('input', CLASS.userSave);
    $save.type = 'submit';
    $save.name = 'submit';
    $save.value = 'Сохранить';

    $form.append($title, $loginWrapper, $emailWrapper, $save);

    return $form;
};

const details = (root) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user.displayName);

            const $wrapper = createElement('div', '.details-wrapper');

            const postId = firebase.auth().currentUser.uid;

            const ref = firebase.database().ref(`users/${postId}`);
            let options = null;
            ref.once('value')
                .then((snapshot) => {
                    const data = snapshot.val();

                    if (data) {
                        options = {
                            login: data.login,
                            email: user.email,
                        };
                    } else {
                        options = {
                            login: null,
                            email: user.email,
                        };
                    }

                    $wrapper.appendChild(form(options));
                });

            root.classList.add('details-page');
            root.appendChild($wrapper);
        } else {
            window.location.href = '/#login';
        }
    });
};

export default details;