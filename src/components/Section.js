export default class Section {
    constructor({ items, renderer }, containerSelector ) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        // Renders all elements on the page
        this._renderedItems.forEach((item) => {
            this._renderer(item)
        });
    }

    addItem(element){
        // Adds the DOM element to the container
        this._container.prepend(element);
    }
}