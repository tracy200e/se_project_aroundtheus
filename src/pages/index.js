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

/* ----------------------------- Create Instance ---------------------------- */
const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);

/* --------------------------- Set event listeners -------------------------- */
cardPreviewPopup.setEventListeners();
cardPreviewPopup.close();

/* -------------------------------------------------------------------------- */
/*                                  Add Form                                  */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Create Instance ---------------------------- */
const addFormPopup = new PopupWithForm(selectors.addFormPopup, () => {

});

/* --------------------------- Set event listeners -------------------------- */
addFormPopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                                  Edit Form                                 */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Create Instance ---------------------------- */

/* --------------------------- Set event listeners -------------------------- */


/* -------------------------------------------------------------------------- */
/*                                Card Section                                */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Create Instance ---------------------------- */

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

/* --------------------------- Initialize Instance -------------------------- */

cardSection.renderItems(initialCards);
