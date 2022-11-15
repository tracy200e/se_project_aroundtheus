let initialCards = [
    {
        name: "Yosemite Valley",
        link: "../images/yosemite-valley.png"
    },
    {
        name: "Lake Louise",
        link: "../images/lake-louise.png"
    },
    {
        name: "Bald Mountains",
        link: "../images/bald-mountains.png"
    },
    {
        name: "Latemar",
        link: "../images/latemar.png"
    },
    {
        name: "Vanoise National Park",
        link: "../images/vanoise-national-park.png"
    },
    {
        name: "Lago di Braies",
        link: "../images/lago-di-braise.png"
    }
]

// Identify edit and close buttons as elements
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.modal__close-button');

// Identify the modal as an element
let modal = document.querySelector('.modal');

// Open the modal when users click on the edit button
editButton.addEventListener("click", function () {
    if (modal.classList.contains('modal_opened') != true) {
        modal.classList.add('modal_opened');
    };
});

// Close the modal when users click on the cross button
closeButton.addEventListener("click", function() {
    if (modal.classList.contains('modal_opened')) {
        modal.classList.remove('modal_opened');
    }
});