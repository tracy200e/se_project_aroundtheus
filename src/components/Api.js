export default class Api {
    constructor(options) {
        // constructor body
        this._baseURL = options.baseURL;
        this._headers = options.headers;
    }

    async getInitialCards() {
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

    async loadUserInfo() {
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

    loadPromises(promises) {
        return Promise.all(promises);
    }

    async updateUserinfo(name, profession) {
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
}