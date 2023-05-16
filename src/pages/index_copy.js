// Import functions and objects from validate.js
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import '../pages/index.css';
import { openModal, closeModal, closeModalOnClick } from "./utils.js";

// Import images for webpack to add the correct paths to the variables
const lagoDiBraiesImage = new URL("../images/lago-di-braies.jpg", import.meta.url);
const vanoiseNationalParkImage = new URL("../images/vanoise-national-park.jpg", import.meta.url);
const lakeLouiseImage = new URL("../images/lake-louise.jpg", import.meta.url);
const latemarImage = new URL("../images/latemar.jpg", import.meta.url);
const baldMountainsImage = new URL("../images/bald-mountains.jpg", import.meta.url);
const yosemiteValleyImage = new URL("../images/yosemite-valley.jpg", import.meta.url);

// Create an initial list of cards
const initialCards = [
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
]

// Identify the modals and their overlays as elements
const editModal = document.querySelector('#edit-modal');
const addModal = document.querySelector('#add-modal');
const imageModal = document.querySelector('#image-modal');
const modals = document.querySelectorAll('.modal');

// Identify edit, add and close buttons as elements
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.modal__close-button');

// Find profile elements
const profileName = document.querySelector('.profile__name');
const profileTag = document.querySelector('.profile__tag');

// Find form input elements
const formInputName = document.querySelector('#name');
const formInputTag = document.querySelector('#about-me');

// Find the card template
const cardTemplate = document.querySelector('#card-element').content;

// Find the card title and image elements
const cardTitle = cardTemplate.querySelector('.card__title');
const cardImage = cardTemplate.querySelector('.card__image');

// Find the card and image inputs
const inputTitle = document.querySelector('#title');
const inputImage = document.querySelector('#link');

// Define the card selector
const cardSelector = '#card-element';

// Find the cards list
const cardsList = document.querySelector('.cards__list');

// Find image and its name inside the modal
const modalCardImage = imageModal.querySelector('.modal__image');
const modalCardName = imageModal.querySelector('.modal__name');

const validationSettings = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
}



// Find the edit and add forms in the DOM
const editFormElement = editModal.querySelector('.modal__form');
const addFormElement = addModal.querySelector('.modal__form');

const editValidator = new FormValidator(validationSettings, editFormElement);
const addValidator = new FormValidator(validationSettings, addFormElement);

editValidator.enableValidation();
addValidator.enableValidation();

// Open the modal when users click on the edit button
editButton.addEventListener("click", () => {

    // Make sure the saved profile details are filled in the form when modal is opened
    formInputName.value = profileName.textContent;
    formInputTag.value = profileTag.textContent;

    // Open modal
    openModal(editModal);
});

// Open the modal when users click on the add button
addButton.addEventListener("click", () => {
    openModal(addModal);
});

// Close button
closeButtons.forEach((button) => {

    // Find the closest modal
    const modal = button.closest('.modal');

    // Set the listener
    button.addEventListener('click', () => closeModal(modal));
});



// Close the modal when users click on the overlay
modals.forEach(modal => {
    modal.addEventListener("click", closeModalOnClick);
})
  


// Submit edit form
editFormElement.addEventListener('submit', (event) => {

    // Prevent browser default behavior
    event.preventDefault();

    // Insert form values and display them on the page
    profileName.textContent = formInputName.value;
    profileTag.textContent = formInputTag.value;

    // Close the edit modal
    closeModal(editModal);
});

function submitAddForm(e) {
    // Prevent browser default behavior
    e.preventDefault();

    // Find form elements
    const name = e.target.title.value;
    const link = e.target.link.value;

    // Render card
    renderCard({ name, link }, cardsList);
    
    // Clear the inputs
    e.target.reset();

    // Close the add card modal
    closeModal(addModal);

    // Disable button
    addValidator.disableButton();
}

// Submit add form
addFormElement.addEventListener('submit', submitAddForm);

// Create card
function createCardElement(cardData) {
    
    const card = new Card(cardData, cardSelector);

    return card.getView();
}

function renderCard(cardData, cardsList) {

    // Create a new card
    const card = createCardElement(cardData);

    // Prepend the new card to the existing cards list
    cardsList.prepend(card);
}

// Create cards list
initialCards.forEach(function (cardData) {

    // Render card
    renderCard(cardData, cardsList);
});