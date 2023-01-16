// Create an initial list of cards
const initialCards = [
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

// Identify the modals as elements
const editModal = document.querySelector('#edit-modal');
const addModal = document.querySelector('#add-modal');

// Identify edit and close buttons as elements
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeEditButton = editModal.querySelector('.modal__close-button');
const closeAddButton = addModal.querySelector('.modal__close-button');

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

function toggleModal(modal) {
    modal.classList.toggle('modal_opened');
}

// Open the modal when users click on the edit button
editButton.addEventListener("click", () => {

    // Make sure the saved profile details are filled in the form when modal is opened
    formInputName.value = profileName.textContent;
    formInputTag.value = profileTag.textContent;

    toggleModal(editModal);
});

// Open the modal when users click on the add button
addButton.addEventListener("click", () => {
    toggleModal(addModal)
});

// Close the modal when users click on the cross button
closeEditButton.addEventListener("click", () => {
    toggleModal(editModal);
});

// Close the modal when users click on the cross button
closeAddButton.addEventListener("click", () => {
    toggleModal(addModal);
});

// Find the edit and add forms in the DOM
const profileFormElement = document.querySelector('#edit-profile-form');
const cardFormElement = document.querySelector('#add-card-form');

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

    // Add event listener for delete
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    
    // Remove element from the DOM on click
    cardDeleteButton.addEventListener('click', (e) => {
        e.target.closest('.card').remove();
    });

    // Add event listener image
        // Open the modal
        // Find image element inside the modal
        // Replace src with card link
        // Replace alt with card title

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
    toggleModal(editModal);
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

    // Close the add card modal
    toggleModal(addModal);
})

// Create cards list
initialCards.forEach(function (cardData) {
    const cardView = createCardElement(cardData);
    renderCard(cardView, cardsList);
});