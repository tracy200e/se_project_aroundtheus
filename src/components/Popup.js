export default class Popup {
    constructor({ popupSelector, modalContainer }) {
        this._popupElement = document.querySelector(popupSelector);
        this._popupOverlay = this._popupElement.closest('.modal');
        this._closeButton = this._popupElement.querySelector('.modal__close-button');
        this._modalContainer = modalContainer;
    }

    open() {

        // open popup
        this._popupElement.classList.add('modal_opened');

        // Listen for the "Escape" key event
        document.addEventListener('keydown', (event) => {
            this._handleEscClose(event);
        });
    }

    close() {

        // close popup
        this._popupElement.classList.remove('modal_opened');

        // Remove listener for the "Escape" key event
        document.removeEventListener('keyup', this._handleEscClose);

        // Close the popup when users click on the 'close' button
        this._closeButton.addEventListener('click', () => this.close());
    }

    _handleEscClose(event) {

        // Prevent default and if event was on ESC button call the "close" method
        if (event.key === "Escape") {
            this.close();
        }
    }

    _setEventListeners() {

        // Close the popup when users click on the shaded area outside the modal
        this._popupOverlay.addEventListener('click', (event) => {
            if (!event.target.closest(this._modalContainer)) {
                this.close();
            }
        })
    }
}