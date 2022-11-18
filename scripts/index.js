// Create an initial list of cards
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

// Toggle modal
function toggleModal () {
    modal.classList.toggle('modal_opened');
}

// Open the modal when users click on the edit button
editButton.addEventListener("click", toggleModal);

// Close the modal when users click on the cross button
closeButton.addEventListener("click", toggleModal);

// Select profile elements
const profileName = document.querySelector('.profile__name');
const profileTag = document.querySelector('.profile__tag');

// Select form input elements
let formInputName = document.querySelector('#name');
let formInputTag = document.querySelector('#about-me');

// Fill the "Name" and "About me" fields with the values displayed on the page
formInputName.value = profileName.textContent;
formInputTag.value = profileTag.textContent;

