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
        // sets event listeners
        this._closeButton = this._popupElement.querySelector('.modal__close-button');
        this._closeButton.addEventListener('click', () => this.close());
        this._popupOverlay = this._popupElement.closest('.modal');
        this._popupOverlay.addEventListener('click', () => this.close());
    }
}