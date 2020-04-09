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
  document.title = 'Kanban — Доски';

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const $wrapper = createElement('div', '.boards-wrapper');
      $wrapper.append(personalBoards());

      const successCallback = (snapshot) => {
        const data = snapshot.val();
        if (storeRecentlyViewed.getLocalStorage().length > 0) {
          $wrapper.prepend(recentlyViewedBoards());
        }
        if (data) {
          Object.values(data).forEach((obj) => {
            document.querySelector('.boards-adding').before(board(obj));
            if (obj.favorite) {
              $wrapper.prepend(markedBoards());
              document.querySelector('.boards-marked').append(board(obj));
            }
          });
        }
      };

      const errorCallback = (error) => { alert(error); };

      firebase.database().ref(`users/${user.uid}/boards`)
        .once('value', successCallback)
        .catch(errorCallback);

      const $main = document.createElement('main');
      $main.id = 'boards-body';
      $main.append(sidebar(), bottomNavigation(), $wrapper);

      const $header = header();
      $header.classList.add('bg-boards');

      root.append($header, $main);
    } else {
      window.location.href = '/#login';
    }
  });
};

export default boards;