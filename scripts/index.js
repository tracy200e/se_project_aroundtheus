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

// Identify edit button as an element
const editButton = document.querySelector('.profile__edit-button');

// // Identify the modal as an element
// let modal = document.querySelector('.modal');

// // Add class to open modal
// function renderModal() {
//     if (modal.classList.contains('modal_opened') != true) {
//         modal.classList.add('modal_opened');
//     };
// };

// Listen for 'click' events on the Edit Button
editButton.addEventListener("click", function(e) {
    const eventTarget = e.target;
    eventTarget.classList.add('modal_opened');
});