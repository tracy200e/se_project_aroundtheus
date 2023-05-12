// Open modal
function openModal(modal) {
    modal.classList.add('modal_opened');
    document.addEventListener('keydown', closeModalOnEscape);
    modal.addEventListener('mousedown', closeModalOnRemoteClick)
}

// Close modal
function closeModal(modal) {
    modal.classList.remove('modal_opened');
    document.removeEventListener('keydown', closeModalOnEscape);
    modal.removeEventListener('mousedown', closeModalOnRemoteClick)
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

    // If the key being pressed is Esc, close modals
    if (e.key === "Escape") {
               
        // Search for an opened modal
        const openedModal = document.querySelector('.modal_opened');

        // Close it
        closeModal(openedModal);
    }
}

// Close modals when users click their mouse
function closeModalOnRemoteClick(e) {

    // if they are the same then we should close the popup
    if (e.target === e.currentTarget) { 
        closeModal(e.target)
    }
}

export { openModal, closeModal, closeModalOnClick, closeModalOnRemoteClick };