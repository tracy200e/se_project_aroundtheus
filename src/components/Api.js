export default class Api {
    constructor(options) {
        // constructor body
        this._baseURL = options.baseURL;
        this._headers = options.headers;
    }

    getInitialCards() {
        return fetch(`${this._baseURL}/cards`, {
            headers: this._headers
        })
        .then(res => {

            // If the server returns the data okay, parse the JSON data
            if (res.ok) {
                return res.json();
            }

            // If the server returns an error, reject the promise
            return Promise.reject(`Error: ${res.status}`);
        })
        .catch(err => {
            console.log(err);
        }) 
    }

    loadUserInfo() {
        return fetch(`${this._baseURL}/users/me`, {
            headers: this._headers
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