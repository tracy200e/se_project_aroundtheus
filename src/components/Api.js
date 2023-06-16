export default class Api {
    constructor(options) {
        // constructor body
        this._options = options;
    }

    getInitialCards() {
        return fetch("https://around.nomoreparties.co/v1/group-12/cards", {
            headers: {
                authorization: "1eaa27b9-0188-4ade-8d81-d0c83875c056"
            }
        })
        .then(res => {

            // If the server returns the data okay, parse the JSON data
            if (res.ok) {
                return res.json();
            }

            // If the server returns an error, reject the promise
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    loadUserInfo() {
        return fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
            headers: {
                authorization: "1eaa27b9-0188-4ade-8d81-d0c83875c056"
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }

    loadPromises([loadUserInfo, getInitialCards]) {
        return Promise.all([loadUserInfo, getInitialCards]);
    }
}