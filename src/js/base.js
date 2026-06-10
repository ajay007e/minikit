// MiniKit - Base Web Component
//
// Shared functionality for MiniKit components.
//
// Features:
// - Lifecycle hooks
// - Event delegation via handleEvent()
// - DOM query helpers
// - Attribute helpers
// - Keyboard navigation helpers
// - Custom event emission

export class MkElement extends HTMLElement {
    // Called when the element is connected to the DOM.
    connectedCallback() {
        this.init?.();
    }

    // Called when the element is removed from the DOM.
    disconnectedCallback() {
        this.cleanup?.();
    }

    // Override in subclasses.
    init() { }

    // Override in subclasses.
    cleanup() { }

    // EventTarget interface.
    //
    // Allows:
    //
    //   element.addEventListener("click", this)
    //
    // which dispatches to:
    //
    //   onclick(event)
    //
    handleEvent(event) {
        this[`on${event.type}`]?.(event);
    }

    // Emit a bubbling custom event.
    //
    // Example:
    //
    //   this.emit("change", value);
    //
    emit(type, detail = null) {
        return this.dispatchEvent(
            new CustomEvent(type, {
                bubbles: true,
                composed: true,
                cancelable: true,
                detail,
            }),
        );
    }

    // Query a single descendant.
    //
    // Example:
    //
    //   this.$('[role="tab"]');
    //
    $(selector) {
        return this.querySelector(selector);
    }

    // Query multiple descendants.
    //
    // Example:
    //
    //   this.$$('[role="tab"]');
    //
    $$(selector) {
        return [...this.querySelectorAll(selector)];
    }

    // Read an attribute.
    //
    // Example:
    //
    //   this.attr("placement", "bottom");
    //
    attr(name, fallback = null) {
        return this.getAttribute(name) ?? fallback;
    }

    // Check if an attribute exists.
    //
    // Example:
    //
    //   if (this.has("disabled")) { ... }
    //
    has(name) {
        return this.hasAttribute(name);
    }

    // Roving keyboard navigation helper.
    //
    // Supports:
    // - Previous key
    // - Next key
    // - Home
    // - End
    //
    // Example:
    //
    //   const next = this.keyNav(
    //     event,
    //     current,
    //     items.length,
    //     "ArrowLeft",
    //     "ArrowRight"
    //   );
    //
    keyNav(event, current, length, previousKey, nextKey, homeEnd = true) {
        let target = -1;

        if (event.key === nextKey) {
            target = (current + 1) % length;
        }

        if (event.key === previousKey) {
            target = (current - 1 + length) % length;
        }

        if (homeEnd) {
            if (event.key === "Home") {
                target = 0;
            }

            if (event.key === "End") {
                target = length - 1;
            }
        }

        if (target >= 0) {
            event.preventDefault();
        }

        return target;
    }
}
