import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super({ popupSelector });
        this._popupForm = this._popupElement.querySelector('.modal__form');
    }

    close() {
        this._popupForm.reset();
        super.close();
    }
}