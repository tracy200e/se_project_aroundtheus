const imageModal = document.querySelector('#image-modal');
const modalCardImage = imageModal.querySelector('.modal__image');
const modalCardName = imageModal.querySelector('.modal__name');
const ESC_KEYCODE = 27;

const closeModal = () => {
    imageModal.classList.remove('modal_opened');
    document.removeEventListener('keyup', handleEscUp);
};

const handleEscUp = (e) => {
    e.preventDefault();
    isEscEvent(e, closeModal);
}

const isEscEvent = (e, action) => {
    const activeModal = document.querySelector('.modal_opened');
    if (e.which === ESC_KEYCODE) {
        action(activeModal);
    }
};

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
        // this.likeButton = this._element.querySelector('.card__like-button');
        this._element.addEventListener('click', () => this._handleLikeIcon);

         // Add event listener for the delete button
        // this.deleteButton = this._element.querySelector('.card__delete-button');
        this._element.addEventListener('click', () => this._handleDeleteCard);

        // Add event listener for image
        this._element.addEventListener('click', () => this._handlePreviewPicture(imageModal));
    }

    _handleLikeIcon() {
        // Add active class to card's like button
        this._element.classList.toggle('card__like-button_active');
    }

    _handleDeleteCard() {
        // Remove element from the DOM on click
        this._element.remove();
    }

    _handlePreviewPicture(imageModal) {
        // Replace src with card link
        modalCardImage.src = this._link;

        // Replace alt with card title
        modalCardImage.alt = this._name;
        modalCardName.textContent = this._name;

        // Open the modal
        _openModal(imageModal);
    }

    _openModal(modal) {
        modal.classList.add('.modal_opened');
        document.addEventListener('keydown', closeModal);
    }

    _getTemplate() {

        // Get card template
        const cardTemplate = document
            .querySelector(this._cardSelector)
            .content.querySelector('#card-element')
            .cloneNode(true);
        
        return cardTemplate;
    }

    getView() {
        
        // Create card template
        this._element = this._getTemplate();
        
        // Set the image link
        this._element.querySelector('.card__image')
        .style.backgroundImage = `url(${this._link})`;

        // Set the card title
        this._element.querySelector('.card__title')
        .textContent = this._name;

        this._setEventListeners();

    }

}

export default Card;