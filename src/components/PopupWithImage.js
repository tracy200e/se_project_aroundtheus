import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super({ popupSelector });
        this._imageElement = this._popupElement.querySelector('.modal__image');
        this._imageCaption = this._popupElement.querySelector('.modal__name');
    }
    
    open(imageData) {
        this._imageElement.src = imageData.link;
        this._imageElement.alt = `Image ${imageData.name}`;
        this._imageCaption.textContent = imageData.name;
        super.open();
    }

    setEventListeners() {

        // Close the popup when users click on the shaded area outside the modal
        this._popupOverlay.addEventListener('click', (event) => {
            if (!event.target.closest('.modal__popup')) {
                this.close();
            }
        })
    }
}