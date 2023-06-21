import './index.css';
import { selectors, validationSettings } from '../utils/constants';

// Import all the classes
import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api';
import Popup from '../components/Popup';

// Identify profile elements
const userName = document.querySelector(selectors.profileName);
const userProfession = document.querySelector(selectors.profileProfession);

// Identify edit, add and delete buttons as elements
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Find edit form input elements
const formInputName = document.querySelector('#name');
const formInputProfession = document.querySelector('#profession');

// Find form elements
const profileForm = document.forms['profile-form'];
const addCardForm = document.forms['card-form'];

/* -------------------------------------------------------------------------- */
/*                                     Api                                    */
/* -------------------------------------------------------------------------- */

const config = {
    baseURL: "https://around.nomoreparties.co/v1/group-12",
    headers: {
        authorization: "1eaa27b9-0188-4ade-8d81-d0c83875c056",
        "Content-Type": "application/json"
    }
};

const api = new Api(config);

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
/*                                Delete Popup                                */
/* -------------------------------------------------------------------------- */

// Create the delete popup instance
const deletePopup = new Popup({ popupSelector: selectors.deletePopup });
deletePopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                                Card Section                                */
/* -------------------------------------------------------------------------- */

// This function creates a new card
function createCard(data, userId) {
    const cardElement = new Card({ 
        data,
        handleImageClick: (imageData) => {

            // Open image popup on click
            cardPreviewPopup.open(imageData);
        },
        handleDeleteClick: () => {

            // Open confirmation popup on click
            deletePopup.open();
        }
    }, selectors.cardTemplate, 
    userId);

    return cardElement.getView();
}

let cardSection;
let userId;

// Make sure promises are loaded in the correct sequence
api.getAppInfo()
    .then(([cards, userData]) => {

        // Find the user id
        userId = userData._id;
        userName.textContent = userData.name;
        userProfession.textContent = userData.about;

        // Create cards section
        cardSection = new Section(
            {
                items: cards,
                renderer: (card) => {

                    // Create a new card
                    const cardElement = createCard(card, userId);
        
                    // Display each card
                    cardSection.addItem(cardElement);
                },
            },
            selectors.cardsList,
            userId
        );

        // Render the entire list of cards on the page
        cardSection.renderItems(cards);
    })

/* -------------------------------------------------------------------------- */
/*                                  Add Form                                  */
/* -------------------------------------------------------------------------- */

// Create the add form instance
const addFormPopup = new PopupWithForm(selectors.addFormPopup, (formData) => {
    api.addNewCard(formData)
    .then((formData) => {

        // Create a new card
        const newCard = createCard(formData, userId);

        // Add the new card to the section
        cardSection.addItem(newCard);

        // Close the add form
        addFormPopup.close();
    })
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

// Create new user info instance
const userInfo = new UserInfo(selectors.profileName, selectors.profileProfession);

// Create the edit form instance
const editFormPopup = new PopupWithForm(selectors.editFormPopup, (values) => {

    // Add the form's input to the profile section
    userInfo.setUserInfo(values.name, values.profession);

    // Update the user info in the server
    api.updateUserinfo(values.name, values.profession);

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

