export default class FormValidator {
    
    constructor(settings, formElement) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;

        this._form = formElement;
        this._inputList = this._form.querySelectorAll(this._inputSelector);
        this._submitButton = this._form.querySelector(this._submitButtonSelector);
    }

    _showInputError(inputElement) {

        // Generate the id for error for the target element
        const errorMessageElement = this._form.querySelector(`#${inputElement.id}-error`);
    
        // Add the input error class to the element's class list
        inputElement.classList.add(this._inputErrorClass);
    
        // Change the text content to the error message
        errorMessageElement.textContent = inputElement.validationMessage;
        
        // Add the error class to the error message's class list
        errorMessageElement.classList.add(this._errorClass);
    };

    _hideInputError(inputElement) {

        // Generate the id for error for the target element
        const errorMessageElement = this._form.querySelector(`#${inputElement.id}-error`);
        
        // Add the input error class to the element's class list
        inputElement.classList.remove(this._inputErrorClass);

        // Clear the error message from the text content
        errorMessageElement.textContent = "";

        // Add the error class to the error message's class list
        errorMessageElement.classList.remove(this._errorClass);
    };

    // Disable form button
    disableButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
    };

    // Enable form button
    _enableButton () {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.disabled = false;
    };

    // Show or hide input errors based on the current input element's validity
    _toggleInputState(inputElement) {
        if (!inputElement.validity.valid) {
            // If input element is invalid, show input error message
            this._showInputError(inputElement);
        } else {
            // Otherwise, hide input error message
            this._hideInputError(inputElement);
        }
    };

    // Check if the input element is invalid
    _checkValidity(inputElement) {
        return !inputElement.validity.valid;
    }

    // Check if any element in the input list is invalid
    // Reference (1): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    // Reference (2): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
    _hasInvalidInput = () => Array.from(this._inputList).some(this._checkValidity);

    // Toggle button depending on the input's validity
    _toggleButtonState() {

        // If the input is valid, disable the button
        if (this._hasInvalidInput()) {
            this.disableButton();
        } else {
            // Otherwise, enable the button
            this._enableButton();
        }
    };
    
    // Set event listeners for form elements based on the user inputs' validity
    _setEventListeners() {

        // Disable button
        this.disableButton();

        // Listen for the "type" event on each input
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._toggleInputState(inputElement);
                this._toggleButtonState();
            });
        });
    }

    // Validate form
    enableValidation() {
        this._form.addEventListener("submit", (event) => {

            // Prevent the form's default behaviour
            event.preventDefault();
        });
        
        // Set event listeners
        this._setEventListeners();
    }

    resetValidation() {

        // Reset submit button
        this._toggleButtonState();

        // Clear error messages
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }
}