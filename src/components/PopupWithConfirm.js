import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, handleDeleteCard) {
        super({ popupSelector });
        this._confirmButton = document.querySelector('#delete-card');
        this._handleDeleteCard = handleDeleteCard;
    }

    setEventListeners() {
        this._confirmButton.addEventListener('click', this._handleDeleteCard);
        super.setEventListeners();
    }
}