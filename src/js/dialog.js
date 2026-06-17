// MiniKit - Dialog
//
// Enhances native <dialog> elements.
//
// Features:
// - Open dialogs via [data-dialog-open]
// - Close dialogs via [data-dialog-close]
// - Optional dialog return values
// - Backdrop click closes dialog
//
// Native browser features:
// - ESC key
// - Focus trap
// - Autofocus
// - Focus restoration
// - close/cancel events

document.addEventListener("click", (event) => {
  const open = event.target.closest("[data-dialog-open]");

  if (open) {
    const dialog = document.getElementById(
      open.getAttribute("data-dialog-open"),
    );

    if (!(dialog instanceof HTMLDialogElement) || dialog.open) {
      return;
    }

    dialog.showModal();
    return;
  }

  const close = event.target.closest("[data-dialog-close]");

  if (close) {
    const dialog = close.closest("dialog");

    if (!(dialog instanceof HTMLDialogElement)) {
      return;
    }

    dialog.close(close.getAttribute("data-dialog-close") ?? "");
    return;
  }

  if (!(event.target instanceof HTMLDialogElement)) {
    return;
  }

  const { left, right, top, bottom } = event.target.getBoundingClientRect();

  const inside =
    event.clientX >= left &&
    event.clientX <= right &&
    event.clientY >= top &&
    event.clientY <= bottom;

  if (!inside) {
    event.target.close();
  }
});
