export default class Popup {
    constructor({ popupSelector }) {
        this._popupElement = document.querySelector(popupSelector);
    }

    open() {
        // opens popup
        this._popupElement.classList.add('modal_opened');
        document.addEventListener('keyup', (event) => {
            this._handleEscClose(event)
        });
    }

    close() {
        // closes popup
        this._popupElement.classList.remove('modal_opened');
        document.removeEventListener('keyup', (event) => {
            this._handleEscClose(event)
        });
    }

    _handleEscClose(event) {
        // Prevent default and if event was on ESC button call the "close" method
        if (event.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        // Closes the popup when users click on the 'Close' button
        this._closeButton = this._popupElement.querySelector('.modal__close-button');
        this._closeButton.addEventListener('click', () => this.close());

        // Closes the popup when users click on the shaded area outside the modal
        this._popupOverlay = this._popupElement.closest('.modal');
        this._popupOverlay.addEventListener('click', (event) => {
            if (!event.target.closest('.modal__container')) {
                this.close();
            }
        })
    }
}