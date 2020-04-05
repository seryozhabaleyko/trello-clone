'use strict';

const storeRecentlyViewed = (() => {

    const STORE_NAME_RECENTLY_VIEWED = 'recentlyViewed';

    const getLocalStorage = () => {
        let store;

        try {
            store = JSON.parse(localStorage.getItem(STORE_NAME_RECENTLY_VIEWED) || '[]');
        } catch (e) {
            console.error(e);
        }

        return store;
    };

    const setLocalStorage = (value) => localStorage.setItem(STORE_NAME_RECENTLY_VIEWED, JSON.stringify(value));

    const insert = (obj) => {
        let store = getLocalStorage();

        if (!store.length) {
            store.push(obj);
            setLocalStorage(store);

            return true;
        }

        store = store.filter(item => item.id !== obj.id);

        store.push(obj);

        setLocalStorage(store.slice(-3));
    };

    return {
        getLocalStorage,
        setLocalStorage,
        insert
    };
})();

export default storeRecentlyViewed;