import DOMHelpers from './helpers/DOMHelpers';
import store from './store/Store';
import storeRecentlyViewed from './store/storeRecentlyViewed';
import personalBoards from './header.boards.personal';
import recentlyViewedBoards from './header.boards.recentlyViewed';
import markedBoards from './header.boards.marked';
import '../scss/header-boards.scss';

const { createElement } = DOMHelpers();

const handleWindowClose = (e) => {
    const { target } = e;
    if (target.closest('#header-boards-wrapper') || target.closest('.header-boards')) {
        return;
    }

    try {
        document.getElementById('header-boards-wrapper').remove();
    } catch (error) {
        document.removeEventListener('click', handleWindowClose, false);
        return;
    }

    document.removeEventListener('click', handleWindowClose, false);
};

const headerBoards = () => {
    const personal = store.getLocalStorage();
    const marked = personal.filter((obj) => !!obj.favorite);
    const recentlyViewed = storeRecentlyViewed.getLocalStorage();

    const boards = createElement('div', '#header-boards');

    boards.append(
        markedBoards(marked),
        recentlyViewedBoards(recentlyViewed),
        personalBoards(personal),
    );

    const wrapper = createElement('div', '#header-boards-wrapper');
    wrapper.append(boards);

    document.getElementById('root').append(wrapper);

    document.addEventListener('click', handleWindowClose);
};

export default headerBoards;