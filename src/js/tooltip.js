// MiniKit - Tooltip Enhancement
//
// Adds accessibility attributes to elements using
// the MiniKit tooltip API.
//
// Usage:
//
// <button data-tooltip="Save changes"></button>
//
// Optional:
//
// <button
//   data-tooltip="Save changes"
//   aria-label="Save">
// </button>

function enhance(element) {
  const text = element.getAttribute("data-tooltip");

  if (!text || element.hasAttribute("aria-label")) {
    return;
  }

  element.setAttribute("aria-label", text);
}

document.querySelectorAll("[data-tooltip]").forEach(enhance);

new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "attributes" && mutation.target instanceof Element) {
      enhance(mutation.target);
      continue;
    }

    for (const node of mutation.addedNodes) {
      if (!(node instanceof Element)) {
        continue;
      }

      if (node.hasAttribute("data-tooltip")) {
        enhance(node);
      }

      node.querySelectorAll("[data-tooltip]").forEach(enhance);
    }
  }
}).observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["data-tooltip"],
});
