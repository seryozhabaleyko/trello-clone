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

    const setLocalStorage = (value) => (
        localStorage.setItem(STORE_NAME_RECENTLY_VIEWED, JSON.stringify(value))
    );

    const insert = (id) => {
        let store = getLocalStorage();

        if (store.length > 0) {
            store = store.filter((item) => item !== id);
            store.push(id);
            setLocalStorage(store.slice(-3));

            return;
        }

        store.push(id);
        setLocalStorage(store);
    };

    return {
        getLocalStorage,
        setLocalStorage,
        insert,
    };
})();

export default storeRecentlyViewed;