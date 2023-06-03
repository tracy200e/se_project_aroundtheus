// Import images for webpack to add the correct paths to the variables
const lagoDiBraiesImage = new URL("../images/lago-di-braies.jpg", import.meta.url);
const vanoiseNationalParkImage = new URL("../images/vanoise-national-park.jpg", import.meta.url);
const lakeLouiseImage = new URL("../images/lake-louise.jpg", import.meta.url);
const latemarImage = new URL("../images/latemar.jpg", import.meta.url);
const baldMountainsImage = new URL("../images/bald-mountains.jpg", import.meta.url);
const yosemiteValleyImage = new URL("../images/yosemite-valley.jpg", import.meta.url);

// Create an initial list of cards
export const initialCards = [
    {
        name: "Lago di Braies",
        link: lagoDiBraiesImage
    },
    {
        name: "Vanoise National Park",
        link: vanoiseNationalParkImage
    },
    {
        name: "Lake Louise",
        link: lakeLouiseImage
    },
    {
        name: "Latemar",
        link: latemarImage
    },
    {
        name: "Bald Mountains",
        link: baldMountainsImage
    },
    {
        name: "Yosemite Valley",
        link: yosemiteValleyImage
    }
];

export const selectors = {
    cardsList: '.cards__list',
    cardTemplate: '#card-element',
    previewPopup: '#image-modal',
    editFormPopup: '#edit-modal',
    addFormPopup: '#add-modal',
    profileName: '.profile__name',
    profileProfession: '.profile__profession',
    formModalContainer: '.modal__container',
    imageModalContainer: '.modal__popup',
}

export const validationSettings = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
}