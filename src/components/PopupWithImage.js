import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, modalContainer) {
        super({ popupSelector, modalContainer });
        this._imageElement = this._popupElement.querySelector('.modal__image');
        this._imageCaption = this._popupElement.querySelector('.modal__name');

        super._setEventListeners();
    }
    
    open(imageData) {
        this._imageElement.src = imageData.link;
        this._imageElement.alt = `Image ${imageData.name}`;
        this._imageCaption.textContent = imageData.name;
        super.open();
    }
}