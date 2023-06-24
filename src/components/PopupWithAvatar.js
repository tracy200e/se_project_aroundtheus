import Popup from './Popup.js';

export default class PopupWithAvatar extends Popup {
    constructor(popupSelector) {
        super({ popupSelector });
        this._popupForm = this._popupElement.querySelector('.modal__form');
        this._submitButton = this._popupElement.querySelector('.form__button');
        this._formInput = this._popupForm.querySelector("input");
        this._handleFormSubmit = handleFormSubmit;
    }

    // Collects link from the input field
    setEventListeners() {

        // Add the 'click' event listener to the close icon
        super.setEventListeners();

        // Add the 'submit' event handler to the form
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._formInput);
        })
    }

    close() {
        super.close();
    }
}