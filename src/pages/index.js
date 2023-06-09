import './index.css';
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

// Find edit form input elements
const formInputName = document.querySelector('#name');
const formInputProfession = document.querySelector('#profession');

// Find form elements
const profileForm = document.forms['profile-form'];
const addCardForm = document.forms['card-form'];

/* -------------------------------------------------------------------------- */
/*                               Form Validation                              */
/* -------------------------------------------------------------------------- */

// Create a form validators object
const formValidators = {};

// Create validator instances for all forms
const enableValidation = (validationSettings) => {

    // Create an array of all forms
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));

    // Create a validator for each form
    formList.forEach((formElement) => {

        // Create a validator instance for the current instance
        const validator = new FormValidator(validationSettings, formElement);

        // Retrieve the form element by its name
        const formName = formElement.getAttribute('name');

        // Store the current form validator in the validators object
        formValidators[formName] = validator;

        // Enable validation for the current form
        validator.enableValidation();
    });
};

// Enable validation for all forms
enableValidation(validationSettings);

/* -------------------------------------------------------------------------- */
/*                                 Popup Image                                */
/* -------------------------------------------------------------------------- */

// Create image popup instance
const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);

// Close image popup preview
cardPreviewPopup.close();

/* -------------------------------------------------------------------------- */
/*                                Card Section                                */
/* -------------------------------------------------------------------------- */

// This function creates a new card
function createCard(data) {
    const cardElement = new Card({ data, handleImageClick: (imageData) => {
        cardPreviewPopup.open(imageData);

    }}, selectors.cardTemplate);

    return cardElement.getView();
}

// Create a section of cards
const cardSection = new Section(
    {
        items: initialCards,
        renderer: (data) => {

            // Create a new card
            const cardElement = createCard(data);

            // Display each card
            cardSection.addItem(cardElement);
        },
    },
    selectors.cardsList
);

// Render the initial list of cards on the page
cardSection.renderItems(initialCards);

/* -------------------------------------------------------------------------- */
/*                                  Add Form                                  */
/* -------------------------------------------------------------------------- */


// Create the add form instance
const addFormPopup = new PopupWithForm(selectors.addFormPopup, (formData) => {

    // Create a new card
    const newCard = createCard(formData);
    
    // Close the add form
    addFormPopup.close();

    // Add the new card to the section
    cardSection.addItem(newCard);
});

// Open the modal when users click on the add button
addButton.addEventListener("click", () => {
    
    // Reset validation for the add card form
    formValidators[addCardForm.getAttribute('name')].resetValidation();

    // Open the add card form
    addFormPopup.open();
});

// Set add form event listeners
addFormPopup.setEventListeners();


/* -------------------------------------------------------------------------- */
/*                             Profile Information                            */
/* -------------------------------------------------------------------------- */

// Create the user info instance
const userInfo = new UserInfo(selectors.profileName, selectors.profileProfession);

// Create the edit form instance
const editFormPopup = new PopupWithForm(selectors.editFormPopup, () => {

    // Add the form's input to the profile section
    userInfo.setUserInfo(formInputName.value, formInputProfession.value);

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
    formValidators[profileForm.getAttribute('name')].disableButton();

    // Open modal
    editFormPopup.open();
});

// Set edit form event listeners
editFormPopup.setEventListeners();