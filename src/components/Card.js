export default class Card {
    constructor({ data, handleImageClick, handleDeleteClick }, cardSelector, userId) {
        // Find the card's name, link and owner's id
        this._name = data.name;
        this._link = data.link;
        this._cardOwnerId = data.owner._id;

        // Find the card selector
        this._cardSelector = cardSelector;

        // Find card and current user ids
        this._userId = userId;

        // Handle the image-click function
        this._handleImageClick = handleImageClick;

        // Handle the delete-button click
        this._handleDeleteClick = handleDeleteClick;
    }

    _setEventListeners() {

        // Add event listner for like button
        this._likeButton = this._element.querySelector('.card__like-button');
        this._likeButton.addEventListener('click', this._handleLikeIcon);

        // Add event listener for image
        this._imageWindow = this._element.querySelector('.card__image');
        this._imageWindow.addEventListener('click', () => this._handleImageClick({link: this._link, name: this._name}));
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

        // Display bin icon on cards created by the user
        this._deleteButton = this._element.querySelector('.card__delete-button');

        // Check if the user id matches the card owner's id
        if (this._userId !== this._cardOwnerId) {

            // If it does, remove the delete button
            this._deleteButton.remove();
        } else {

            // Otherwise, add event listener for the delete button
            this._deleteButton.addEventListener('click', () => this._handleDeleteClick());
        }
        
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