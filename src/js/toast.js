const containers = {};

function getContainer(placement) {
    if (containers[placement]) {
        return containers[placement];
    }

    const container = document.createElement("div");

    container.className = "toast-container";

    container.setAttribute("popover", "manual");
    container.setAttribute("data-placement", placement);

    document.body.appendChild(container);

    containers[placement] = container;

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

    let timeout;

    toast.onmouseenter = () => {
        clearTimeout(timeout);
    };

    toast.onmouseleave = () => {
        if (duration > 0) {
            timeout = setTimeout(() => removeToast(toast, container), duration);
        }
    };

    toast.setAttribute("data-entering", "");

    container.appendChild(toast);
    container.showPopover();

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.removeAttribute("data-entering");
        });
    });

    if (duration > 0) {
        timeout = setTimeout(() => removeToast(toast, container), duration);
    }

    return toast;
}

export function show(message, title = "", options = {}) {
    const { variant = "info", ...rest } = options;

    const toast = document.createElement("output");

    toast.setAttribute("role", "status");
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

    return showToast(toast, options);
}

export function clear(placement) {
    if (placement && containers[placement]) {
        containers[placement].replaceChildren();
        containers[placement].hidePopover();

        return;
    }

    Object.values(containers).forEach((container) => {
        container.replaceChildren();
        container.hidePopover();
    });
}
