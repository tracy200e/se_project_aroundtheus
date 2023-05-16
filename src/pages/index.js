import './index.css';
import { openModal, closeModal, closeModalOnClick } from '../components/utils';
import { initialCards, selectors } from '../utils/constants';

// Import all the classes
import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';

// Create instances of the classes
const cardSection = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const cardElement = new Card(item, selectors.cardTemplate);
            cardSection.addItem(cardElement.getView());
        },
    },
    selectors.cardsList
);

// Initialize all my instances
console.log(initialCards);
cardSection.renderItems(initialCards);

// All the rest