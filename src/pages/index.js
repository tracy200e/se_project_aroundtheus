import './index.css';
import { selectors, validationSettings, config } from '../utils/constants';
import { renderLoading } from '../utils/functions';

// Import all the classes
import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import Api from '../utils/Api';
import Popup from '../components/Popup';

// Identify edit, add and confirmation buttons as elements
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__image-overlay');

// Find edit form input elements
const formInputName = document.querySelector('#name');
const formInputProfession = document.querySelector('#profession');

// Find form elements
const profileForm = document.forms['profile-form'];
const profileSaveButton = profileForm.querySelector('.form__button');
const addCardForm = document.forms['card-form'];
const addCreateButton = addCardForm.querySelector('.form__button');
const avatarForm = document.forms['avatar-form'];
const avatarSaveButton = avatarForm.querySelector('.form__button');

/* -------------------------------------------------------------------------- */
/*                                     Api                                    */
/* -------------------------------------------------------------------------- */

// Create the app instance
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

            // Handle card deletion
            api.deleteCard(data._id)
            .then(() => {

                // Remove the card from the page
                cardElement.deleteCard();
            })
            .then(() => {
                
                // Close the confirmation popup
                deletePopup.close();
            })
            .catch(err => {

                // If the server returns an error, reject the promise
                console.error(`Error: ${err.status}`);
            })
        },
        handleLikeClick: () => {

            // If the user has liked the card, remove the like; vice versa
            if (cardElement.isLiked()) {

                // Remove like from the server if user has already liked the card
                api.removeLike(data._id)
                .then((card) => {

                    // Update like count
                    cardElement.setLikes(card.likes);

                    // Deactivate like icon
                    cardElement.removeLikeIcon();
                })
                .catch(err => {

                    // If the server returns an error, reject the promise
                    console.error(`Error: ${err.status}`);
                })
            } else {

                // Add like to the server if user has not liked the card
                api.addLike(data._id)
                .then((card) => {

                    // Update like count
                    cardElement.setLikes(card.likes);

                    // Activate like icon
                    cardElement.addLikeIcon();
                })
                .catch(err => {

                    // If the server returns an error, reject the promise
                    console.error(`Error: ${err.status}`);
                }) 
            }
        }
    }, 
    selectors.cardTemplate, 
    userId);

    // Display the card
    return cardElement.getView();
}

let cardSection;
let userId;

// Create new user info instance
const userInfo = new UserInfo(selectors.profileName, selectors.profileProfession, selectors.profileImage);

// Get the app's information and make sure promises are loaded in the correct sequence
api.getAppInfo()
.then(([cards, userData]) => {

    // Find the user id
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserImage(userData.avatar);

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
.catch((err) => {

    // If the server returns an error, reject the promise
    console.error(`Error: ${err}`);
})

/* -------------------------------------------------------------------------- */
/*                                  Add Form                                  */
/* -------------------------------------------------------------------------- */

// Create the add form instance
const addFormPopup = new PopupWithForm(selectors.addFormPopup, (formData) => {
    
    // Render loading status
    renderLoading(true, addCreateButton, 'Creating...');

    // Add the new card to the server
    api.addNewCard(formData)
    .then((formData) => {

        // Create a new card
        const newCard = createCard(formData, userId);

        // Add the new card to the section
        cardSection.addItem(newCard);
    })
    .then(() => {

        // Close the add form
        addFormPopup.close();
    })
    .catch(err => {

        // If the server returns an error, reject the promise
        console.error(`Error: ${err.status}`);
    }) 
    .finally(() => {

        // Restore pre-loading status
        renderLoading(false, addCreateButton, 'Creating...');
    })
});

// Open the modal when users click on the add button
addButton.addEventListener("click", () => {
    
    // Reset validation for the add card form
    formValidators[addCardForm.getAttribute('name')].resetValidation();

    // Open the add card form
    addFormPopup.open();

    // Set add form event listeners
    addFormPopup.setEventListeners();
});

/* -------------------------------------------------------------------------- */
/*                             Profile Information                            */
/* -------------------------------------------------------------------------- */

// Create the edit form instance
const editFormPopup = new PopupWithForm(selectors.editFormPopup, (values) => {

    // Render loading status
    renderLoading(true, profileSaveButton, 'Saving...');

    // Update the user info in the server
    api.updateUserinfo(values.name, values.profession)
    .then(values => {

        // Add the form's input to the profile section
        userInfo.setUserInfo(values.name, values.about);
    })
    .then(() => {

        // Close the edit form
        editFormPopup.close();
    })
    .catch(err => {

        // If the server returns an error, reject the promise
        console.error(`Error: ${err.status}`);
    }) 
    .finally(() => {

        // Restore pre-loading status
        renderLoading(false, profileSaveButton, 'Saving...');
    })
});

/* -------------------------------------------------------------------------- */
/*                             Update Avatar Form                             */
/* -------------------------------------------------------------------------- */

// Create the avatar form
const avatarPopup = new PopupWithForm(selectors.avatarPopup, (formData) => {
        
    // Render loading status
    renderLoading(true, avatarSaveButton, 'Saving...');

    // Update the user's image in the server
    api.updateAvatar(formData)
    .then(userData => {

        // Set the user's image
        userInfo.setUserImage(userData.avatar);
    })
    .then(() => {

        // Close the avatar popup
        avatarPopup.close();
    })
    .catch(err => {

        // If the server returns an error, reject the promise
        console.error(`Error: ${err.status}`);
    })
    .finally(() => {

        // Restore pre-loading status
        renderLoading(false, avatarSaveButton, 'Saving...');
    })
});

// Open the avatar popup when user clicks on the avatar's edit button
avatarEditButton.addEventListener('click', () => {

        // Open the avatar popup
        avatarPopup.open();

        // Set the event listeners for the avatar popup
        avatarPopup.setEventListeners();
    })

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

    // Set edit form event listeners
    editFormPopup.setEventListeners();
});