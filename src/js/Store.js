const Store = () => {

    const name = 'kanban';

    const getLocalStorage = () => {
        let store;

        try {
            store = JSON.parse(localStorage.getItem(name) || '[]');
        } catch (e) {
            console.error(e);
        }

        return store;
    };

    const setLocalStorage = (value) => localStorage.setItem(name, JSON.stringify(value));

    const insert = (obj) => {

        /* const item = {
            id: Date.now(),
            title,
            completed: false
        }; */

        const store = getLocalStorage();

        store.push(obj);

        setLocalStorage(store);
    };

    const remove = (id = null) => {
        const store = getLocalStorage();

        store = store.filter(board => board.id !== id);

        setLocalStorage(store);
    };

    const edit = (id, title) => {
        const newObject = {
            id,
            title
        };

        const store = getLocalStorage();

        store = store.map(board => board.id === newObject.id ? newObject : board);

        setLocalStorage(store);
    };

    const find = (id) => {
        const store = getLocalStorage();
        const obj = store.find(obj => obj.id === id);

        return obj;
    };

    return {
        getLocalStorage,
        insert,
        remove,
        edit,
        find
    };
};

export default Store;