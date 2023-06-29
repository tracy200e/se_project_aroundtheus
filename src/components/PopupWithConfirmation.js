import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super({ popupSelector });
        this._form = this._popupElement.querySelector('.modal__form');
    }

    // Set action when the user clicks on the confirmation button
    setAction(action) {
        this._handleFormSubmit = action;
    }

    // Set event listener on the form element
    setEventListeners() {
        this._form.addEventListener('submit', () => { 
            this._handleFormSubmit;
        });

        super.setEventListeners();
    }
}