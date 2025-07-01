document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const launchFreedosButton = document.getElementById('launch-freedos-static');
    const launchSectorforthButton = document.getElementById('launch-sectorforth-static');

    const modalOverlay = document.getElementById('static-modal-overlay');
    const modalContent = document.getElementById('static-modal-content'); // To potentially adjust class for Sectorforth
    const modalTitleElement = document.getElementById('static-modal-title');
    const modalIframe = document.getElementById('static-modal-iframe');
    const modalCloseButton = document.getElementById('static-modal-close-btn');

    const FREEDOS_URL = 'public/LIA_FC-Freedos-Tiny/start.html';
    const FREEDOS_TITLE = 'FreeDOS Tiny Emulator';
    const SECTORFORTH_URL = 'public/LIA_FC_Sectorforth/start.html';
    const SECTORFORTH_TITLE = 'Sectorforth Emulator';

    // Function to show the modal
    function showModal(emulatorUrl, emulatorTitle) {
        modalIframe.src = emulatorUrl;
        modalTitleElement.textContent = emulatorTitle;

        // For Sectorforth, we might want a wider modal or a specific class
        // This is a simplified approach. A more complex one might involve different modal HTML structures.
        if (emulatorUrl === SECTORFORTH_URL) {
            modalContent.classList.add('sectorforth-modal-dimensions');
            modalContent.classList.remove('freedos-modal-dimensions');
        } else {
            modalContent.classList.add('freedos-modal-dimensions');
            modalContent.classList.remove('sectorforth-modal-dimensions');
        }

        modalOverlay.classList.remove('static-modal-hidden');
        modalOverlay.classList.add('static-modal-visible');
    }

    // Function to hide the modal
    function hideModal() {
        modalOverlay.classList.add('static-modal-hidden');
        modalOverlay.classList.remove('static-modal-visible');
        modalIframe.src = 'about:blank'; // Stop emulator and clear iframe
        // Remove specific dimension classes
        modalContent.classList.remove('sectorforth-modal-dimensions');
        modalContent.classList.remove('freedos-modal-dimensions');
    }

    // Event listeners for launch buttons
    if (launchFreedosButton) {
        launchFreedosButton.addEventListener('click', () => {
            showModal(FREEDOS_URL, FREEDOS_TITLE);
        });
    }

    if (launchSectorforthButton) {
        launchSectorforthButton.addEventListener('click', () => {
            showModal(SECTORFORTH_URL, SECTORFORTH_TITLE);
        });
    }

    // Event listener for modal close button
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', hideModal);
    }

    // Event listener for overlay click (to close modal)
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (event) => {
            // Only close if the overlay itself was clicked, not its children (the modal content)
            if (event.target === modalOverlay) {
                hideModal();
            }
        });
    }
});
