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

addButton.addEventListener("click", () => {
    openModal(addModal);
});

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
/*                                 Popup Image                                */
/* -------------------------------------------------------------------------- */

const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);
cardPreviewPopup.setEventListeners();
cardPreviewPopup.close();

/* -------------------------------------------------------------------------- */
/*                                  Add Form                                  */
/* -------------------------------------------------------------------------- */
const addFormPopup = new PopupWithForm(selectors.addFormPopup, () => {
    
});


/* -------------------------------------------------------------------------- */
/*                                  Edit Form                                 */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*                                Card Section                                */
/* -------------------------------------------------------------------------- */

const cardSection = new Section(
    {
        items: initialCards,
        renderer: (data) => {
            const cardElement = new Card({ data, handleImageClick: (imageData) => {
                cardPreviewPopup.open(imageData);
            } }, selectors.cardTemplate);
            cardSection.addItem(cardElement.getView());
        },
    },
    selectors.cardsList
);

cardSection.renderItems(initialCards);
