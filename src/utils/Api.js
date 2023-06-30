export default class Api {
    constructor(options) {
        // constructor body
        this._baseURL = options.baseURL;
        this._headers = options.headers;
    }

    // Check if the response is good to move forward with
    _processResponse(res) {

            // If the server returns the data okay, parse the JSON data
            if (res.ok) {
                return res.json();
            }
    }

    getCards() {
        return fetch(`${this._baseURL}/cards`, {
            headers: this._headers
        })
        .then(this._processResponse)
    }

    loadUserInfo() {
        return fetch(`${this._baseURL}/users/me`, {
            headers: this._headers
        })
        .then(this._processResponse)
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
        .then(this._processResponse)
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
        .then(this._processResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this._baseURL}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(this._processResponse)
    }

    addLike(cardId) {
        return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers
        })
        .then(this._processResponse)
    }

    removeLike(cardId) {
        return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(this._processResponse)
    }

    updateAvatar(avatar) {
        return fetch(`${this._baseURL}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(avatar)
        })
        .then(this._processResponse)
    }
}