// Render loading
export function renderLoading(isLoading, buttonElement, loadingText) {

    if (isLoading) {
        buttonElement.textContent = loadingText;
    } else {
        return buttonElement;
    }
}