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

    // Handle the delete event
    _handleDeleteEvent = () => {
        this.preventDefault;
        this._handleDeleteAction();
    }

    // Set event listener on the form element
    setEventListeners() {
        this._confirmButton.addEventListener('click', this._handleDeleteEvent);
        super.setEventListeners();
    }

    // Remove event listener and close popup
    close() {
        this._confirmButton.removeEventListener('click', this._handleDeleteEvent);
        super.close();
    }
}