
// Selectors of DOM elements
export const selectors = {
    cardsList: '.cards__list',
    cardTemplate: '#card-element',
    previewPopup: '#image-modal',
    editFormPopup: '#edit-modal',
    editFormButton: '#edit-profile-button',
    addFormPopup: '#add-modal',
    addFormButton: '#add-card-button',
    deletePopup: '#delete-modal',
    avatarPopup: '#avatar-modal',
    avatarFormButton: '#avatar-form-button',
    profileName: '.profile__name',
    profileProfession: '.profile__profession',
    profileImage: '.profile__image',
    formModalContainer: '.modal__container',
    imageModalContainer: '.modal__popup',
    formInputName: '#name',
    formInputProfession: '#profession',
}

// Validation settings
export const validationSettings = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
    formSelector: 'form',
}

// Api's configuration
export const config = {
    baseURL: "https://around.nomoreparties.co/v1/group-12",
    headers: {
        authorization: "1eaa27b9-0188-4ade-8d81-d0c83875c056",
        "Content-Type": "application/json"
    }
};