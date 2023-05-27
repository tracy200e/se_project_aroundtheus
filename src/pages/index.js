import './index.css';
import { openModal, closeModal, closeModalOnClick } from '../components/utils';
import { initialCards, selectors } from '../utils/constants';

// Import all the classes
import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';


/* -------------------------------------------------------------------------- */
/*                                 Popup Image                                */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Create Instance ---------------------------- */
const CardPreviewPopup = new PopupWithImage(selectors.previewPopup);

/* --------------------------- Set event listeners -------------------------- */
CardPreviewPopup.setEventListeners();


/* -------------------------------------------------------------------------- */
/*                                Card Section                                */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Create Instance ---------------------------- */

const cardSection = new Section(
    {
        items: initialCards,
        renderer: (data) => {
            const cardElement = new Card({ data, handleImageClick: (imageData) => {
                CardPreviewPopup.open(imageData);
            } }, selectors.cardTemplate);
            cardSection.addItem(cardElement.getView());
        },
    },
    selectors.cardsList
);

/* --------------------------- Initialize Instance -------------------------- */

cardSection.renderItems(initialCards);
