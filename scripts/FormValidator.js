class FormValidator {
    
    constructor(settings, formElement) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;

        this._form = formElement;
    }

    _showInputError(inputElement) {
        // Generate the id for error for the target element
        const errorMessageElement = this._form.querySelector(`#${inputElement.id}-error`);
    
        // Add the input error class to the element's class list
        inputElement.classList.add(this._inputErrorClass);
    
        // Change the text content to the error message
        errorMessageElement.textContent = errorMessageElement;
        
        // Add the error class to the error message's class list
        errorMessageElement.classList.add(this._errorClass);
    };

    _hideInputError(inputElement) {
        // Generate the id for error for the target element
        const errorMessageElement = this._form.querySelector(`#${inputElement.id}-error`);
        
        // Add the input error class to the element's class list
        inputElement.classList.remove(this._inputErrorClass);

        // Change the text content to the error message
        errorMessageElement.textContent = "";

        // Add the error class to the error message's class list
        errorMessageElement.classList.remove(this._errorClass);
    };

    _disableButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
    };

    _enableButton () {
        this._submitButton.remove(this._inactiveButtonClass);
        this._submitButton.disabled = false;
    };

    // Toggle button depending on the input's validity
    _toggleButtonState(inputElement) {

        // If the input is valid, enable the button
        if (this._hasValidInput(inputElement)) {
            this._enableButton();
            return;
        }

        // Otherwise, disable the button
        this._disableButton();
        
    };

    _hasValidInput(inputElement) {
        if (!inputElement.validity.valid) {
    
            // If input element is invalid, show input error message
            return this._showInputError(inputElement);
        }
    
        // Otherwise, hide input error message
        this._hideInputError(inputElement);
    };
    
    _setEventListeners() {
        // Select all input elements from the form
        this._inputList = this._form.querySelectorAll(this._inputSelector);

        // Find the button
        this._submitButton = this._form.querySelector(this._submitButtonSelector);

        // Disable the button
        this._disableButton();

        // Listen for the "type" event on each input
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputElement);
            });
        });
    }

    enableValidation() {
        this._form.addEventListener("submit", (e) => {
            // Prevent the form's default behaviour
            e.preventDefault();
        });
        
        this._setEventListeners();
    }

}

export default FormValidator;