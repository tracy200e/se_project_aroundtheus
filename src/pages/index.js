import './index.css';
import { openModal } from '../components/utils';
import { initialCards, selectors, validationSettings } from '../utils/constants';

// Import all the classes
import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';

// Identify edit, add and close buttons as elements
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.modal__close-button');

// Find form input elements
const formInputName = document.querySelector('#name');
const formInputProfession = document.querySelector('#profession');

/* -------------------------------------------------------------------------- */
/*                               Form Validation                              */
/* -------------------------------------------------------------------------- */

const editModal = document.querySelector('#edit-modal');
const addModal = document.querySelector('#add-modal');

const editFormElement = editModal.querySelector('.modal__form');
const addFormElement = addModal.querySelector('.modal__form');

// Create validator instances for the edit and add forms
const editValidator = new FormValidator(validationSettings, editFormElement);
const addValidator = new FormValidator(validationSettings, addFormElement);

// Enable validation
editValidator.enableValidation();
addValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                 Popup Image                                */
/* -------------------------------------------------------------------------- */

// Create image popup instance
const cardPreviewPopup = new PopupWithImage(selectors.previewPopup, selectors.imageModalContainer);

// Set event listeners for image popup
// cardPreviewPopup.setEventListeners();
cardPreviewPopup.close();

/* -------------------------------------------------------------------------- */
/*                                Card Section                                */
/* -------------------------------------------------------------------------- */

// Create a section of cards
const cardSection = new Section(
    {
        items: initialCards,
        renderer: (data) => {

            // Create a new card
            const cardElement = new Card({ data, handleImageClick: (imageData) => {
                cardPreviewPopup.open(imageData);
            }}, selectors.cardTemplate);

            // Display each card
            cardSection.addItem(cardElement.getView());
        },
    },
    selectors.cardsList
);

// Render the initial list of cards on the page
cardSection.renderItems(initialCards);

/* -------------------------------------------------------------------------- */
/*                                  Add Form                                  */
/* -------------------------------------------------------------------------- */

// Open the modal when users click on the add button
addButton.addEventListener("click", () => {
    
    addValidator.resetValidation();

    openModal(addModal);
});

// Create the add form instance
const addFormPopup = new PopupWithForm(selectors.addFormPopup, selectors.formModalContainer, (formData) => {

    // Create a new card
    const newCard = new Card({ data: formData, handleImageClick: (imageData) => {
        cardPreviewPopup.open(imageData);
    } }, selectors.cardTemplate);
    
    // Add the new card to the section
    cardSection.addItem(newCard.getView());
});

// Set add form event listeners
addFormPopup.setEventListeners();

// Close the add form
addFormPopup.close();

/* -------------------------------------------------------------------------- */
/*                             Profile Information                            */
/* -------------------------------------------------------------------------- */

// Create the user info instance
const userInfo = new UserInfo(selectors.profileName, selectors.profileProfession);

// Create the edit form instance
const editFormPopup = new PopupWithForm(selectors.editFormPopup, selectors.formModalContainer, () => {

    // Add the form's input to the profile section
    userInfo.setUserInfo(formInputName, formInputProfession);

    // Close the edit form
    editFormPopup.close();
});

/* -------------------------------------------------------------------------- */
/*                                  Edit Form                                 */
/* -------------------------------------------------------------------------- */

// Open the modal when users click on the edit button
editButton.addEventListener("click", () => {

    // Get profile info and add to the form fields
    const profileInfo = userInfo.getUserInfo();

    // Add the profile info on the page to the form's fields
    formInputName.value = profileInfo.name;
    formInputProfession.value = profileInfo.profession;

    // Disable button each time it opens
    editValidator.disableButton();

    // Open modal
    editFormPopup.open();
});

// Set edit form event listeners
editFormPopup.setEventListeners();

// Close the edit form
editFormPopup.close();