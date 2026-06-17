export class MkElement extends HTMLElement {
  #initialized = false;

  connectedCallback() {
    if (this.#initialized) return;
    this.#initialized = true;
    this.init();
  }

  disconnectedCallback() {
    this.cleanup();
    this.#initialized = false;
  }

  init() {}

  cleanup() {}

  handleEvent(event) {
    this[`on${event.type}`]?.(event);
  }

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

  $(selector) {
    return this.querySelector(selector);
  }

  $$(selector) {
    return Array.from(this.querySelectorAll(selector));
  }

  attr(name, fallback = null) {
    return this.getAttribute(name) ?? fallback;
  }

  has(name) {
    return this.hasAttribute(name);
  }

  keyNav(event, current, length, previousKey, nextKey, homeEnd = true) {
    let target = -1;

    if (event.key === nextKey) {
      target = (current + 1) % length;
    } else if (event.key === previousKey) {
      target = (current - 1 + length) % length;
    } else if (homeEnd && event.key === "Home") {
      target = 0;
    } else if (homeEnd && event.key === "End") {
      target = length - 1;
    }

    if (target >= 0) {
      event.preventDefault();
    }

    return target;
  }
}
