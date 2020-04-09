import Store from './Store';
import DOMHelpers from './helpers/DOMHelpers';

const {
    insert,
    getLocalStorage,
} = Store();

const {
    getElement,
} = DOMHelpers();

class Database {
    static create(obj) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(obj),
        };

        return fetch('https://kanban-fcf5f.firebaseio.com/boards.json', options)
            .then((response) => response.json())
            .then((response) => {
                obj.id = response.name;
                return obj;
            })
            .then(insert)
            .then(Database.renderList);
    }

    static createList(obj) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(obj),
        };

        return fetch('https://kanban-fcf5f.firebaseio.com/boards/lists.json', options)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
            });
    }

    static renderList() {

    }
}

export default Database;
