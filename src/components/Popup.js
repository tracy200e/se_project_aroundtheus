export default class Popup {
    constructor({ popupSelector }) {
        this._popupElement = document.querySelector(popupSelector);
        this._closeButton = this._popupElement.querySelector('.modal__close-button');
    }

    open() {

        // open popup
        this._popupElement.classList.add('modal_opened');

        // Listen for the "Escape" key event
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {

        // close popup
        this._popupElement.classList.remove('modal_opened');

        // Remove listener for the "Escape" key event
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (event) => {

        // Prevent default and if event was on ESC button call the "close" method
        if (event.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {

        // Close the popup when users click on the shaded area outside the modal
        this._popupElement.addEventListener('click', (event) => {
            if (event.target === event.currentTarget) {
                this.close();
            }
        })

        // Close the popup when users click on the 'close' button
        this._closeButton.addEventListener('click', () => this.close());
    }
}