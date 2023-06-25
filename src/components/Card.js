export default class Card {
    constructor({ data, handleImageClick, handleDeleteClick, handleLikeClick }, cardSelector, userId) {
        // Find the card's elements
        this._name = data.name;
        this._link = data.link;
        this._cardOwnerId = data.owner._id;
        this._cardId = data._id;
        this._cardLikes = data.likes;

        // Find the card selector
        this._cardSelector = cardSelector;

        // Find the user id
        this._userId = userId;

        // Functions
        this._handleImageClick = handleImageClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

    // Set the card's event listeners
    _setEventListeners() {

        // Add event listner for like button
        this._likeButton = this._element.querySelector('.card__like-button');
        this._likeButton.addEventListener('click', this._handleLikeClick);

        // Add event listener for image
        this._imageWindow = this._element.querySelector('.card__image');
        this._imageWindow.addEventListener('click', () => this._handleImageClick({link: this._link, name: this._name}));
    }

    // Check if the card is liked by the user
    isLiked() {
        return this._cardLikes.some((cardLike) => cardLike._id === this._userId)
    }

    // Update the card's number of likes
    updateLikeCount(likes) {
        this._cardLikes = likes;
        return this._likeCounter.textContent = likes.length;
    }

    // Display the number of likes
    displayLikeCount() {
        return this._likeCounter.textContent = this._cardLikes.length;
    }

    // Display the like icon based on its status
    displayLikeIcon() {
        if (this.isLiked()) {
            this._likeButton.classList.add('card__like-button_active');
        } else {
            this._likeButton.classList.remove('card__like-button_active');
        }
    }

    // Activate the like icon
    addLikeIcon() {
        this._likeButton.classList.add('card__like-button_active');
    }

    // Deactivate the like icon
    removeLikeIcon() {
        this._likeButton.classList.remove('card__like-button_active');
    }

    // Display bin icon on cards created by the user
    _handleDeleteButton() {

        // Check if the user id matches the card owner's id
        if (this._userId !== this._cardOwnerId) {

            // If it does, remove the delete button
            this._deleteButton.remove();
        }
    }

    // Handle the deletion of cards
    handleDeleteCard() {
        // Remove element from the DOM on click
        this._element.remove();

        // Remove the link to the DOM element
        this._element = null;
    }

    // Get card template
    _getTemplate() {
        
        return document
            .querySelector(this._cardSelector)
            .content.querySelector('.card')
            .cloneNode(true);
    }

    // Render the card
    getView() {
        
        // Create card template
        this._element = this._getTemplate();

        
        // Display the bin icon on the user's cards
        this._deleteButton = this._element.querySelector('.card__delete-button');
        this._handleDeleteButton();
        this._deleteButton.addEventListener('click', () => this._handleDeleteClick());
        
        // Display the number of likes
        this._likeCounter = this._element.querySelector('.card__like-number');
        this.displayLikeCount();

        // Change the like button color
        this._likeButton = this._element.querySelector('.card__like-button');
        this.displayLikeIcon();

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