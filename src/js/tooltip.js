// MiniKit - Tooltip Enhancement
//
// Adds accessibility attributes to elements using
// the MiniKit tooltip API.
//
// Usage:
//
// <button
//   data-tooltip="Save changes">
// </button>
//
// Optional:
//
// <button
//   data-tooltip="Save changes"
//   aria-label="Save">
// </button>

function enhance(el) {
    const text = el.getAttribute("data-tooltip");

    if (!text) {
        return;
    }

    if (!el.hasAttribute("aria-label")) {
        el.setAttribute("aria-label", text);
    }
}

document.querySelectorAll("[data-tooltip]").forEach(enhance);

new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (!(node instanceof Element)) {
                continue;
            }

            if (node.hasAttribute("data-tooltip")) {
                enhance(node);
            }

            node.querySelectorAll?.("[data-tooltip]").forEach(enhance);
        }
    }
}).observe(document.body, {
    childList: true,
    subtree: true,
});
