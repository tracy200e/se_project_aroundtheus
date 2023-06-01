import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super({ popupSelector });
        this._popupForm = this._popupElement.querySelector('.modal__form');
        this._submitButton = this._popupElement.querySelector('.form__button');
        this._formInputs = this._popupForm.querySelectorAll("input");
        this._handleFormSubmit = handleFormSubmit;
    }

    // Collects data from all the input fields and returns the data as an object
    _getInputValues() {

        // Make a input data object
        const inputObject = {};

        // Name each input by its value
        this._formInputs.forEach(input => {
            inputObject[input.name] = input.value;
        })
        
        // Return the data as an object
        return inputObject;
    }

    setEventListeners() {

        // Add the 'submit' event handler to the form
        this._submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })

        // Add the 'click' event listener to the close icon
        super.setEventListeners();
    }

    close() {
        
        // Reset the form
        this._popupForm.reset();

        // Close the form
        super.close();
    }
}