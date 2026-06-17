const containers = new Map();

function getContainer(placement) {
  if (containers.has(placement)) {
    return containers.get(placement);
  }

  const container = document.createElement("div");

  container.className = "toast-container";

  container.setAttribute("popover", "manual");
  container.setAttribute("data-placement", placement);

  document.body.appendChild(container);

  containers.set(placement, container);

  return container;
}

function removeToast(toast, container) {
  if (toast.hasAttribute("data-exiting")) {
    return;
  }

  toast.setAttribute("data-exiting", "");

  const cleanup = () => {
    toast.remove();

    if (!container.children.length) {
      container.hidePopover();
    }
  };

  toast.addEventListener("transitionend", cleanup, { once: true });

  setTimeout(cleanup, 350);
}

function showToast(toast, options = {}) {
  const { placement = "top-right", duration = 4000 } = options;

  const container = getContainer(placement);

  toast.classList.add("toast");

  let timeoutId;

  toast.addEventListener("mouseenter", () => {
    clearTimeout(timeoutId);
  });

  toast.addEventListener("mouseleave", () => {
    if (duration > 0) {
      timeoutId = setTimeout(() => removeToast(toast, container), duration);
    }
  });

  toast.addEventListener("click", (event) => {
    if (event.target.closest("[data-close]")) {
      clearTimeout(timeoutId);
      removeToast(toast, container);
    }
  });

  toast.setAttribute("data-entering", "");

  container.appendChild(toast);
  container.showPopover();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.removeAttribute("data-entering");
    });
  });

  if (duration > 0) {
    timeoutId = setTimeout(() => removeToast(toast, container), duration);
  }

  return toast;
}

export function show(message, title = "", options = {}) {
  const { variant = "info", closeButton = false, ...rest } = options;

  const toast = document.createElement("output");

  toast.setAttribute("role", variant === "danger" ? "alert" : "status");

  toast.setAttribute("data-variant", variant);

  if (title) {
    const heading = document.createElement("div");

    heading.className = "toast-title";
    heading.textContent = title;

    toast.appendChild(heading);
  }

  const content = document.createElement("div");

  content.className = "toast-message";
  content.textContent = message;

  toast.appendChild(content);

  if (closeButton) {
    const button = document.createElement("button");

    button.type = "button";
    button.setAttribute("data-close", "");
    button.setAttribute("aria-label", "Close");

    button.innerHTML = `
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        stroke-width="2"
        fill="none"
        stroke-linecap="round"/>
    </svg>`;

    toast.appendChild(button);
  }

  return showToast(toast, rest);
}

export function showElement(element, options = {}) {
  let toast;

  if (element instanceof HTMLTemplateElement) {
    toast = element.content.firstElementChild?.cloneNode(true);
  } else if (element) {
    toast = element.cloneNode(true);
  }

  if (!toast) {
    return;
  }

  toast.removeAttribute("id");
  if (options.closeButton) {
    const button = document.createElement("button");

    button.type = "button";
    button.setAttribute("data-close", "");
    button.setAttribute("aria-label", "Close");

    button.textContent = "×";

    toast.appendChild(button);
  }
  return showToast(toast, options);
}

export function clear(placement) {
  if (placement) {
    const container = containers.get(placement);

    if (!container) {
      return;
    }

    container.replaceChildren();
    container.hidePopover();

    return;
  }

  containers.forEach((container) => {
    container.replaceChildren();
    container.hidePopover();
  });
}
