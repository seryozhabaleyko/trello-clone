import firebase from './firebase';

const serializer = (() => {
    const lists = (data) => {
        const userId = firebase.auth().currentUser.uid;
        const boardId = localStorage.getItem('boardId');

        const ref = firebase.database().ref(`users/${userId}/boards/${boardId}/lists`);
        ref.update(data).catch((error) => {
            alert(error);
        });
    };

    const save = () => {
        const objLists = {};
        let order = 0;

        document
            .querySelectorAll('.list')
            .forEach((listElement) => {
                order += 1;
                listElement.setAttribute('data-list-order', order);
                const listId = listElement.getAttribute('data-list-id');

                const obj = {
                    id: listId,
                    title: listElement.querySelector('.list-title').textContent,
                    order,
                    cards: {},
                };

                listElement
                    .querySelectorAll('.card')
                    .forEach((cardElement) => {
                        order += 1;
                        cardElement.setAttribute('data-card-order', order);
                        const cardId = Number(cardElement.getAttribute('data-card-id'));

                        obj.cards[cardId] = {
                            id: cardId,
                            title: cardElement.textContent,
                            order,
                        };
                    });

                objLists[listId] = obj;
            });

        lists(objLists);
    };

    return { save };
})();

export default serializer;