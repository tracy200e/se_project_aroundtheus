import './index.css';
import { openModal, closeModal, closeModalOnClick } from '../components/utils';
import { initialCards, selectors } from '../utils/constants';
import { validationSettings } from '../utils/constants';

// Import all the classes
import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';

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

/* -------------------------------------------------------------------------- */
/*                                 Popup Image                                */
/* -------------------------------------------------------------------------- */

const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);
cardPreviewPopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                                Card Section                                */
/* -------------------------------------------------------------------------- */

const cardSection = new Section(
    {
        items: initialCards,
        renderer: (data) => {
            const cardElement = new Card({ data, handleImageClick: (imageData) => {
                cardPreviewPopup.open(imageData);
            }}, selectors.cardTemplate);
            cardSection.addItem(cardElement.getView());
        },
    },
    selectors.cardsList
);

cardSection.renderItems(initialCards);
/* -------------------------------------------------------------------------- */
/*                               Form Validation                              */
/* -------------------------------------------------------------------------- */

const editModal = document.querySelector('#edit-modal');
const addModal = document.querySelector('#add-modal');

const editFormElement = editModal.querySelector('.modal__form');
const addFormElement = addModal.querySelector('.modal__form');

const editValidator = new FormValidator(validationSettings, editFormElement);
const addValidator = new FormValidator(validationSettings, addFormElement);

editValidator.enableValidation();
addValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                  Add Form                                  */
/* -------------------------------------------------------------------------- */

// Open the modal when users click on the add button
addButton.addEventListener("click", () => {
    openModal(addModal);
});

const addFormPopup = new PopupWithForm(selectors.addFormPopup, (formData) => {

    // Create a new card
    const newCard = new Card({ formData, handleImageClick: (imageData) => {
        cardPreviewPopup.open(imageData);
    } }, selectors.cardTemplate);

    // Close the popup
    addFormPopup.close();
    
    // Add the new card to the section
    cardSection.addItem(newCard.getView());
});

addFormPopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                                  Edit Form                                 */
/* -------------------------------------------------------------------------- */

// Open the modal when users click on the edit button
editButton.addEventListener("click", () => {

    // Make sure the saved profile details are filled in the form when modal is opened
    formInputName.value = profileName.textContent;
    formInputTag.value = profileTag.textContent;

    // Open modal
    openModal(editModal);
});


