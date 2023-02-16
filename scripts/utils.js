// Open modal
function openModal(modal) {
    modal.classList.add('modal_opened');
    document.addEventListener('keydown', closeModalOnEscape);
}

// Close modal
function closeModal(modal) {
    modal.classList.remove('modal_opened');
    document.removeEventListener('keydown', closeModalOnEscape);
}

// Close modals when users click on the overlay
function closeModalOnClick (e) {

    // If the target event is the overlay, close the current modal
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
}

// Close modals when users press Esc
function closeModalOnEscape(e) {
    console.log(e); 
    // If the key being pressed is Esc, close modals
    if (e.key === "Escape") {
               
        // Search for an opened modal
        const openedModal = document.querySelector('.modal_opened');

        // Close it
        closeModal(openedModal);
    }
}

export { openModal, closeModal, closeModalOnClick };