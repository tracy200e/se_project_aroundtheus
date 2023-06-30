export default class UserInfo {
    constructor(nameSelector, professionSelector, imageSelector) {
        this._name = document.querySelector(nameSelector);
        this._profession = document.querySelector(professionSelector);
        this._image = document.querySelector(imageSelector);
    }

    // Retrieve profile info from the page
    getUserInfo() {
        return {
            name: this._name.textContent,
            profession: this._profession.textContent,
        }
    }
    
    // Add new profile info to the page
    setUserInfo(name, profession) {
        this._name.textContent = name;
        this._profession.textContent = profession;
    }

    // Add new profile info to the page
    setUserImage(link) {
        this._image.src = link;
    }
}