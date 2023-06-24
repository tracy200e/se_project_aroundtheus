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
import PopupWithConfirm from '../components/PopupWithConfirm';

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

// Find avatar elements
const avatarEditButton = document.querySelector('.profile__image-overlay');
const userImage = document.querySelector(selectors.profileImage);

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
            
            // Create the delete popup instance
            const deletePopup = new PopupWithConfirm(selectors.deletePopup, () => {

                // Handle card deletion
                api.deleteCard(data._id)
                .then(() => {

                    // Close the confirmation popup
                    deletePopup.close();

                    // Delete the card on the page
                    cardElement.handleDeleteCard();
                })
            });

            // Open confirmation popup on click
            deletePopup.open();

            // Set the event listeners for the confirmation popup
            deletePopup.setEventListeners();
        },
        handleLikeClick: () => {
            if (cardElement.isLiked()) {
                api.removeLike(data._id)
                .then((card) => {
                    cardElement.updateLikeCount(card.likes);
                    cardElement.removeLikeIcon();
                })
            } else {
                api.addLike(data._id)
                .then((card) => {
                    cardElement.updateLikeCount(card.likes);
                    cardElement.addLikeIcon();
                })
            }
        }
    }, 
    selectors.cardTemplate, 
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
        userImage.src = userData.avatar;

        // Create cards section
        cardSection = new Section(
            {
                items: cards,
                renderer: (card) => {

                    // Create a new card
                    const cardElement = createCard(card, userId);
        
                    // Display each card
                    cardSection.addItem(cardElement);

                    // console.log(card);
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
const userInfo = new UserInfo(selectors.profileName, selectors.profileProfession, selectors.profileImage);

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
/*                             Update Avatar Form                             */
/* -------------------------------------------------------------------------- */

// Open the avatar popup when user clicks on the avatar's edit button
avatarEditButton.addEventListener('click', () => {
    const avatarPopup = new PopupWithForm(selectors.avatarPopup, (formData) => {
        api.updateAvatar(formData);
        userInfo.setUserImage(formData.avatar);
        avatarPopup.close();
    })    
    avatarPopup.open();
    avatarPopup.setEventListeners();
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