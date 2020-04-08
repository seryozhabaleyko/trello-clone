import firebase from '../js/firebase';
import storeRecentlyViewed from '../js/store/storeRecentlyViewed';
import DOMHelpers from '../js/helpers/DOMHelpers';
import header from '../js/header';
import bottomNavigation from '../js/boards/bottomNavigation';
import sidebar from '../js/boards/sidebar';

import personalBoards from '../js/boards/boards.personal';
import recentlyViewedBoards from '../js/boards/boards.recentlyViewed';
import markedBoards from '../js/boards/boards.marked';

import board from '../js/boards/board';

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