import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super({ popupSelector });
        this._confirmButton = this._popupElement.querySelector('.modal__button');
    }

    // Set action when the user clicks on the confirmation button
    setAction(action) {
        this._handleDeleteAction = action;
    }

    // Set event listener on the form element
    setEventListeners() {
        this._confirmButton.addEventListener('click', (evt) => {
            evt.preventDefault;
            this._handleDeleteAction();
        });

        super.setEventListeners();
    }
}