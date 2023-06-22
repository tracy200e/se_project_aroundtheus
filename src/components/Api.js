export default class Api {
    constructor(options) {
        // constructor body
        this._baseURL = options.baseURL;
        this._headers = options.headers;
    }

    getCards() {
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

    getAppInfo() {
        return Promise.all([this.getCards(), this.loadUserInfo()]);
    }

    updateUserinfo(name, profession) {
        return fetch(`${this._baseURL}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: profession
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }

    addNewCard({ name, link }) {
        return fetch(`${this._baseURL}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }

    deleteCard(cardId) {
        return fetch(`${this._baseURL}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }

    addLike(cardId) {
        return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }

    removeLike(cardId) {
        return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }
}