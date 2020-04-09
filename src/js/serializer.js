import firebase from './firebase';

const serializer = (() => {
    const lists = (data) => {
        const userId = firebase.auth().currentUser.uid;
        const boardId = localStorage.getItem('boardId');

        const errorCallback = (error) => {
            alert(error);
        };

        firebase.database()
            .ref(`users/${userId}/boards/${boardId}/lists`)
            .update(data)
            .catch(errorCallback);
    };

    const save = () => {
        const objLists = {};
        let order = 0;

        const listCallback = (listElement) => {
            order += 1;
            listElement.setAttribute('data-list-order', order);
            const listId = listElement.getAttribute('data-list-id');

            const obj = {
                id: listId,
                title: listElement.querySelector('.list-title').textContent,
                order,
                cards: {},
            };

            const cardCallback = (cardElement) => {
                order += 1;
                cardElement.setAttribute('data-card-order', order);
                const cardId = Number(cardElement.getAttribute('data-card-id'));

                obj.cards[cardId] = {
                    id: cardId,
                    title: cardElement.textContent,
                    order,
                };
            };

            listElement.querySelectorAll('.card').forEach(cardCallback);

            objLists[listId] = obj;
        };

        document.querySelectorAll('.list').forEach(listCallback);

        lists(objLists);
    };

    return { save };
})();

export default serializer;