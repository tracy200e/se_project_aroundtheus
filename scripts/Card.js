// Import functions from utils.js
import { openModal } from "./utils.js";

const imageModal = document.querySelector('#image-modal');
const modalCardImage = imageModal.querySelector('.modal__image');
const modalCardName = imageModal.querySelector('.modal__name');

class Card {

    constructor(data, cardSelector) {

        // Find the data's name and link
        this._name = data.name;
        this._link = data.link;

        // Find the card selector
        this._cardSelector = cardSelector;
    }


    _setEventListeners() {

        // Add event listner for like button
        this._likeButton = this._element.querySelector('.card__like-button');
        this._likeButton.addEventListener('click', this._handleLikeIcon);

        // Add event listener for the delete button
        const deleteButton = this._element.querySelector('.card__delete-button');
        deleteButton.addEventListener('click', () => this._handleDeleteCard());

        // Add event listener for image
        this._imageWindow = this._element.querySelector('.card__image');
        this._imageWindow.addEventListener('click', () => this._handlePreviewPicture(imageModal));
    }

    _handleLikeIcon = () => {
        // Add active class to card's like button
        this._likeButton.classList.toggle('card__like-button_active');
    }

    _handleDeleteCard() {
        // Remove element from the DOM on click
        this._element.remove();

        // Remove the link to the DOM element
        this._element = null;
    }

    _handlePreviewPicture(imageModal) {
        // Replace src with card link
        modalCardImage.src = this._link;

        // Replace alt with card title
        modalCardImage.alt = this._name;
        modalCardName.textContent = this._name;

        // Open the modal
        openModal(imageModal);
    }

    _getTemplate() {

        // Get card template
        return document
            .querySelector(this._cardSelector)
            .content.querySelector('.card')
            .cloneNode(true);
    }

    getView() {
        
        // Create card template
        this._element = this._getTemplate();
        
        // Set the image link
        const cardImage = this._element.querySelector('.card__image');        
        cardImage.src = this._link;
        cardImage.alt = `Photo of ${this._name}`;

        // Set the card title
        const cardTitle = this._element.querySelector('.card__title');
        cardTitle.textContent = this._name;

        // Set the event listeners
        this._setEventListeners();

        return this._element;
    }

}

export default Card;