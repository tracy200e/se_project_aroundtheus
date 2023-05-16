import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super({ popupSelector });
        this._popupForm = this._popupElement.querySelector('.modal__form');
    }

    // Collects data from all the input fields and returns the data as an object
    _getInputValues() {
        
        // Collect input data from all fields
        const formInputs = this._popupForm.querySelector("input");

        // Make a input data object
        const inputObject = {};
        formInputs.forEach(input => {
            inputObject[input.name] = input.value;
        })

        // Return the data as an object
        return inputObject;
    }

    close() {
        this._popupForm.reset();
        super.close();
    }
}