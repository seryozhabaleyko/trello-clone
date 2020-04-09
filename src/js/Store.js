const store = (() => {
    const STORE_NAME = 'kanban';

    const getLocalStorage = () => {
        let store;

        try {
            store = JSON.parse(localStorage.getItem(STORE_NAME) || '[]');
        } catch (e) {
            console.error(e);
        }

        return store;
    };

    const setLocalStorage = (value) => localStorage.setItem(STORE_NAME, JSON.stringify(value));

    const replace = (obj) => getLocalStorage().map((board) => (board.id === obj.id ? obj : board));

    const find = (id) => getLocalStorage().find((board) => board.id === id);

    const insert = (obj) => {
        const store = getLocalStorage();
        store.push(obj);

        setLocalStorage(store);
    };

    const remove = (id = null) => {
        let store = getLocalStorage();
        store = store.filter((board) => board.id !== id);

        setLocalStorage(store);
    };

    const edit = (id, title) => {
        const newObject = {
            id,
            title,
        };

        let store = getLocalStorage();

        store = store.map((board) => (board.id === newObject.id ? newObject : board));

        setLocalStorage(store);
    };

    const save = () => {
        const currentId = parseInt(localStorage.getItem('id'), 10);
        const currentBoard = find(currentId);
        currentBoard.lists = [];

        document
            .querySelectorAll('.list')
            .forEach((list) => {
                const objList = {
                    id: parseInt(list.getAttribute('data-list-id'), 10),
                    title: list.querySelector('.list-title').textContent,
                    cards: [],
                };

                list.querySelectorAll('.card').forEach((card) => {
                    objList.cards.push({
                        id: parseInt(card.getAttribute('data-card-id'), 10),
                        content: card.textContent.trim(),
                    });
                });

                currentBoard.lists.push(objList);
            });

        setLocalStorage(replace(currentBoard));
    };

    const load = () => {

    };

    return {
        getLocalStorage,
        setLocalStorage,
        replace,
        insert,
        remove,
        edit,
        find,
        save,
        load,
    };
})();

export default store;