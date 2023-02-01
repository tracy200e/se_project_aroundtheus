function showInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
    // Generate the id for error for the target element
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);

    // Add the input error class to the element's class list
    inputElement.classList.add(inputErrorClass);

    // Change the text content to the error message
    errorMessageElement.textContent = inputElement.validationMessage;
    
    // Add the error class to the error message's class list
    errorMessageElement.classList.add(errorClass);
};

function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
    // Generate the id for error for the target element
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);

    // Add the input error class to the element's class list
    inputElement.classList.remove(inputErrorClass);

    // Change the text content to the error message
    errorMessageElement.textContent = "";
    
    // Add the error class to the error message's class list
    errorMessageElement.classList.remove(errorClass);
};

function checkInputValidity(formElement, inputElement, options) {
    if (!inputElement.validity.valid) {

        // If input element is invalid, show input error message
        return showInputError(formElement, inputElement, options);
    }

    // Otherwise, hide input error message
    hideInputError(formElement, inputElement, options);
};

// Check if the input list has one invalid input
function hasInvalidInput(inputList) {
    return !inputList.every((inputElement) => inputElement.validity.valid);
}

// Disable button
function disableButton(submitButton, inactiveButtonClass) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
}

// Enable button
function enableButton (submitButton, {inactiveButtonClass}) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
}

// Toggle button depending on the input's validity
function toggleButtonState(inputElements, submitButton, {inactiveButtonClass}) {

    // If the input is invalid, disable the button
    if (hasInvalidInput(inputElements)) {
        disableButton(submitButton, inactiveButtonClass);
        return;
    }

    // Otherwise, enable the button
    enableButton(submitButton, inactiveButtonClass);
};

function setEventListeners(formElement, options) {

    // Retrieve the input property from the options array
    const {inputSelector} = options;

    // Select all input elements from the form
    const inputElements = [...formElement.querySelectorAll(inputSelector)];

    // Find the button
    const submitButton = formElement.querySelector('.form__button');

    // Disable the button
    toggleButtonState(inputElements, submitButton, options);

    // Listen for the "type" event on each input
    inputElements.forEach(inputElement => {
        inputElement.addEventListener("input", (e) => {
            checkInputValidity(formElement, inputElement, options);
            toggleButtonState(inputElements, submitButton, options);
        });
    });
};

// Enable validation of the forms
function enableValidation(options) {
    const formElements = [...document.querySelectorAll(options.formSelector)];
    formElements.forEach((formElement) => {
        formElement.addEventListener("submit", (e) => {
            // Prevent the form's default behaviour
            e.preventDefault();
        });
        
        setEventListeners(formElement, options);
    }); 
}

// Form objects
const options = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
}

// Validate forms
enableValidation(options);

// Export vairables and functions
export { options, hasInvalidInput, toggleButtonState };