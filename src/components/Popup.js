import { ESC_KEYCODE } from '../utils/constants';

export default class Popup {
    constructor({ popupSelector }) {
        this._popupElement = document.querySelector(popupSelector);
    }

    open() {
        // opens popup
        this._popupElement.classList.add('modal_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        // closes popup
        this._popupElement.classList.remove('modal_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose(event) {
        // Prevent default and if event was on ESC button call the "close" method
        event.preventDefault();
        if (event.key === ESC_KEYCODE) {
            this._popupElement.close();
        }
    }

    setEventListeners() {
        // sets event listeners
        this._closeButton = this._popupElement.querySelector('.modal__close-button');
        this._closeButton.addEventListener('click', () => this.close());
    }
}