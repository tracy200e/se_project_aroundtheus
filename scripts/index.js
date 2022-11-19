// Create an initial list of cards
let initialCards = [
    {
        name: "Lago di Braies",
        link: "./images/lago-di-braies.png"
    },
    {
        name: "Vanoise National Park",
        link: "./images/vanoise-national-park.png"
    },
    {
        name: "Lake Louise",
        link: "./images/lake-louise.png"
    },
    {
        name: "Latemar",
        link: "./images/latemar.png"
    },
    {
        name: "Bald Mountains",
        link: "./images/bald-mountains.png"
    },
    {
        name: "Yosemite Valley",
        link: "./images/yosemite-valley.png"
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

// Find profile elements
const profileName = document.querySelector('.profile__name');
const profileTag = document.querySelector('.profile__tag');

// Find form input elements
const formInputName = document.querySelector('#name');
const formInputTag = document.querySelector('#about-me');

// Fill the "Name" and "About me" fields with the values displayed on the page
formInputName.value = profileName.textContent;
formInputTag.value = profileTag.textContent;

// Find the form in the DOM
const profileFormElement = document.querySelector('.modal__form');

// Form submission handler
function handleProfileFormSubmit(e) {

    // Prevent browser default behavior
    e.preventDefault();

    // Insert form values and display them on the page
    profileName.textContent = formInputName.value;
    profileTag.textContent = formInputTag.value;

    // Close the modal
    toggleModal();
}

// Connect the handler to the form and watch for the submit event
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// Card element retriever
function getCardElement(data) {

    // Find the card template
    let cardTemplate = document.querySelector('#card-element').content;

    // Clone the content of the template tag
    let cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    // Find the card title and image elements
    let cardTitle = cardElement.querySelector('.card__title');
    let cardImage = cardElement.querySelector('.card__image');

    // Fill in the data's name and link to the corresponding fields
    cardTitle.textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = data.name;

    // Return the ready HTML element with the filled-in data
    return cardElement;
}

function createCardsList(card) {

    // Find the cards list
    const cardsList = document.querySelector('.cards__list');

    // Create the new card element
    const newCardElement = getCardElement(card);

    // Prepend the new cards
    cardsList.prepend(newCardElement);
}

// Create cards list
initialCards.forEach(createCardsList);