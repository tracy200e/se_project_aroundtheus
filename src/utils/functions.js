// Render loading
export function renderLoading(isLoading, selector) {
    const formButton = document.querySelector(selector);

    if (isLoading) {
        formButton.textContent = 'ing...';
    } else {
        formButton.textContent = 'e';
    }
}