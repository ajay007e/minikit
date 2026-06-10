// MiniKit - Dialog
//
// Enhances native <dialog> elements.
//
// Features:
// - Open dialogs via [data-dialog-open]
// - Close dialogs via [data-dialog-close]
// - Backdrop click closes dialog
// - Escape key remains native

function getDialog(id) {
    return document.getElementById(id);
}

// Open dialog buttons.
//
// Example:
//
// <button data-dialog-open="settings">
//
document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-dialog-open]");

    if (!trigger) return;

    const dialog = getDialog(trigger.getAttribute("data-dialog-open"));

    if (!(dialog instanceof HTMLDialogElement)) {
        return;
    }

    if (!dialog.open) {
        dialog.showModal();
    }
});

// Close dialog buttons.
//
// Example:
//
// <button data-dialog-close>
//
document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-dialog-close]");

    if (!trigger) return;

    const dialog = trigger.closest("dialog");

    if (!(dialog instanceof HTMLDialogElement)) {
        return;
    }

    dialog.close();
});

// Close when backdrop is clicked.
//
// Native dialog does not consistently support
// backdrop click closing across browsers.
//
document.addEventListener("click", (event) => {
    const dialog = event.target;

    if (!(dialog instanceof HTMLDialogElement)) {
        return;
    }

    const rect = dialog.getBoundingClientRect();

    const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

    if (!inside) {
        dialog.close();
    }
});
