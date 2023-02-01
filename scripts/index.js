// Import functions and objects from validate.js
import { options, hasInvalidInput, toggleButtonState } from "./validate.js";

// Create an initial list of cards
const initialCards = [
    {
        name: "Lago di Braies",
        link: "./images/lago-di-braies.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "./images/vanoise-national-park.jpg"
    },
    {
        name: "Lake Louise",
        link: "./images/lake-louise.jpg"
    },
    {
        name: "Latemar",
        link: "./images/latemar.jpg"
    },
    {
        name: "Bald Mountains",
        link: "./images/bald-mountains.jpg"
    },
    {
        name: "Yosemite Valley",
        link: "./images/yosemite-valley.jpg"
    }
]

// Identify the modals and their overlays as elements
const editModal = document.querySelector('#edit-modal');
const addModal = document.querySelector('#add-modal');
const imageModal = document.querySelector('#image-modal');
const modals = document.querySelectorAll('.modal');

// Identify edit, add and close buttons as elements
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.modal__close-button');

// Find profile elements
const profileName = document.querySelector('.profile__name');
const profileTag = document.querySelector('.profile__tag');

// Find form input elements
const formInputName = document.querySelector('#name');
const formInputTag = document.querySelector('#about-me');

// Find the card template
const cardTemplate = document.querySelector('#card-element').content;

// Find the cards list
const cardsList = document.querySelector('.cards__list');

// Find the edit and add forms in the DOM
const profileFormElement = document.querySelector('#edit-profile-form');
const cardFormElement = document.querySelector('#add-card-form');

// Find image and its name inside the modal
const modalCardImage = imageModal.querySelector('.modal__image');
const modalCardName = imageModal.querySelector('.modal__name');

// Open modal
function openModal(modal) {
    modal.classList.add('modal_opened');
}

// Close modal
function closeModal(modal) {
    modal.classList.remove('modal_opened');
}

// Open the modal when users click on the edit button
editButton.addEventListener("click", () => {

    // Make sure the saved profile details are filled in the form when modal is opened
    formInputName.value = profileName.textContent;
    formInputTag.value = profileTag.textContent;

    // Open modal
    openModal(editModal);
});

// Open the modal when users click on the add button
addButton.addEventListener("click", () => {
    openModal(addModal)
});

// Close button
closeButtons.forEach((button) => {

    // Find the closest modal
    const modal = button.closest('.modal');

    // Set the listener
    button.addEventListener('click', () => closeModal(modal));
});

// Close modals when users click on the overlay
function closeModalOnClick (e) {

    // If the target event is the overlay, close the current modal
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
}

// Close the modal when users click on the overlay
modals.forEach(modal => {
    modal.addEventListener("click", closeModalOnClick);
})

function openModalOnKeydown(modal) {
    // Add class to modal
    document.addEventListener("keydown", closeModalOnEscape);
  }
  
  function closeModalOnKeydown(modal) {
    // Remove class from modal
    document.removeEventListener("keydown", closeModalOnEscape);
  }
  
  // Close modals when users press Esc
  function closeModalOnEscape(e) {

    // If the key being pressed is Esc, close modals
    if (evt.key === "Escape") {

      // Search for an opened modal
      const openedModal = document.querySelector('.modal__opened');
       // Close it
       closeModal(openedModal);
    }
  } 

// Close modals when users press Esc
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        openModalOnKeydown(modal);
        closeModalOnKeydown(modal);
        closeModalOnEscape(e);
    })
});

// Render card
function renderCard(cardElement, container) {

    // Prepend the new card
    container.prepend(cardElement);
}

// Create card
function createCardElement(card) {

    // Clone the content of the template tag
    const cardElement = cardTemplate.cloneNode(true);

    // Find the card title and image elements
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');

    // Fill in the card's name and link to the corresponding fields
    cardTitle.textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;

    // Add event listner for like button
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardLikeButton.addEventListener('click', () => {

        // add active class to card's like button
        cardLikeButton.classList.toggle('card__like-button_active');
    });

    // Add event listener for the delete button
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    
    // Remove element from the DOM on click
    cardDeleteButton.addEventListener('click', (e) => {
        e.target.closest('.card').remove();
    });

    // Add event listener for image
    cardImage.addEventListener('click', (e) => {

        // Open the modal
        openModal(imageModal);

        // Replace src with card link
        modalCardImage.src = card.link;

        // Replace alt with card title
        modalCardImage.alt = card.name;
        modalCardName.textContent = card.name;
    });

    return cardElement;
}

// Submit edit form
profileFormElement.addEventListener('submit', (event) => {

    // Prevent browser default behavior
    event.preventDefault();

    // Insert form values and display them on the page
    profileName.textContent = formInputName.value;
    profileTag.textContent = formInputTag.value;

    // Close the edit modal
    closeModal(editModal);
});

// Submit add form
cardFormElement.addEventListener('submit', (e) => {

    // Prevent browser default behavior
    e.preventDefault();

    // Find form elements
    const name = e.target.title.value;
    const link = e.target.link.value;

    // Create card
    const cardView = createCardElement({
        name,
        link,
    });

    // Render card
    renderCard(cardView, cardsList);
    
    // Clear the inputs
    e.target.reset();

    // Disable button
    const formElements = [...document.querySelectorAll(options.formSelector)];
    const submitButton = e.target.querySelector('.form__button');
    toggleButtonState(formElements, submitButton, options);

    // Close the add card modal
    closeModal(addModal);
})

// Create cards list
initialCards.forEach(function (cardData) {
    const cardView = createCardElement(cardData);
    renderCard(cardView, cardsList);
});