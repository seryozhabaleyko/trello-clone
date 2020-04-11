import firebase from '../modules/firebase';
import storeRecentlyViewed from '../modules/store/storeRecentlyViewed';
import DOMHelpers from '../modules/helpers/DOMHelpers';
import header from '../modules/header';
import bottomNavigation from '../modules/boards/bottomNavigation';
import sidebar from '../modules/boards/sidebar';
import personalBoards from '../modules/boards/boards.personal';
import recentlyViewedBoards from '../modules/boards/boards.recentlyViewed';
import markedBoards from '../modules/boards/boards.marked';
import board from '../modules/boards/board';

const { createElement } = DOMHelpers();

const boards = (root) => {
  document.title = 'Доски | Kanban';

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const wrapper = createElement('div', '#boards-wrapper');
      wrapper.append(personalBoards());

      const forEachCallback = (obj) => {
        document.querySelector('.boards-adding').before(board(obj));

        const recentlyViewed = storeRecentlyViewed.getLocalStorage();

        const recentlyViewedForEachCallback = (item) => {
          if (obj.id === item) {
            if (!document.querySelector('.boards-recentlyViewed')) {
              wrapper.prepend(recentlyViewedBoards());
            }
            document.querySelector('.boards-recentlyViewed').append(board(obj));
          }
        };

        if (recentlyViewed.length > 0) {
          recentlyViewed.forEach(recentlyViewedForEachCallback);
        }

        if (obj.favorite) {
          if (!document.querySelector('.boards-marked')) {
            wrapper.prepend(markedBoards());
          }
          document.querySelector('.boards-marked').append(board(obj));
        }
      };

      const successCallback = (snapshot) => {
        let data = snapshot.val();

        if (data) {
          data = Object.values(data);
          data.forEach(forEachCallback);
          localStorage.setItem('boards', JSON.stringify(data));
        }
      };

      const errorCallback = (error) => { alert(error); };

      firebase.database().ref(`users/${user.uid}/boards`)
        .once('value', successCallback)
        .catch(errorCallback);

      const $main = document.createElement('main');
      $main.id = 'boards-body';
      $main.append(sidebar(), bottomNavigation(), wrapper);

      const $header = header();
      $header.classList.add('bg-boards');

      root.append($header, $main);
    } else {
      window.location.href = '/#login';
    }
  });
};

export default boards;