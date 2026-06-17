// MiniKit - Dropdown
//
// Accessible dropdown menus using the Popover API.

import { MkElement } from "./base.js";

class MkDropdown extends MkElement {
  menu;
  trigger;
  items = [];

  init() {
    this.menu = this.$(":scope > [popover]");
    this.trigger = this.$(":scope > [popovertarget]");

    if (!this.menu || !this.trigger) {
      return;
    }

    this.menu.addEventListener("toggle", this);
    this.menu.addEventListener("keydown", this);
  }

  cleanup() {
    this.menu?.removeEventListener("toggle", this);
    this.menu?.removeEventListener("keydown", this);

    window.removeEventListener("resize", this);
    window.removeEventListener("scroll", this, true);
  }

  ontoggle(event) {
    if (event.newState !== "open") {
      this.close();
      return;
    }

    this.open();
  }

  onresize() {
    this.position();
  }

  onscroll() {
    this.position();
  }

  onkeydown(event) {
    const item = event.target.closest('[role="menuitem"]');

    if (!item) {
      return;
    }

    if (event.key === "Escape") {
      this.menu.hidePopover();
      return;
    }

    const index = this.items.indexOf(item);

    const next = this.keyNav(
      event,
      index,
      this.items.length,
      "ArrowUp",
      "ArrowDown",
    );

    if (next >= 0) {
      this.items[next].focus();
    }
  }

  open() {
    this.position();

    window.addEventListener("resize", this);
    window.addEventListener("scroll", this, true);

    this.items = this.$$(
      ':scope [role="menuitem"]:not(:disabled):not([aria-disabled="true"])',
    );

    this.items[0]?.focus();

    this.trigger.setAttribute("aria-expanded", "true");

    this.emit("open");
  }

  close() {
    window.removeEventListener("resize", this);
    window.removeEventListener("scroll", this, true);

    this.trigger.setAttribute("aria-expanded", "false");
    this.trigger.focus();

    this.emit("close");
  }

  position() {
    const triggerRect = this.trigger.getBoundingClientRect();

    Object.assign(this.menu.style, {
      left: "0px",
      top: "0px",
    });

    const menuRect = this.menu.getBoundingClientRect();

    const viewportPadding = 8;

    let left = triggerRect.left;
    let top = triggerRect.bottom;

    if (left + menuRect.width > window.innerWidth - viewportPadding) {
      left = triggerRect.right - menuRect.width;
    }

    if (top + menuRect.height > window.innerHeight - viewportPadding) {
      top = triggerRect.top - menuRect.height;
    }

    left = Math.max(
      viewportPadding,
      Math.min(left, window.innerWidth - menuRect.width - viewportPadding),
    );

    top = Math.max(
      viewportPadding,
      Math.min(top, window.innerHeight - menuRect.height - viewportPadding),
    );

    Object.assign(this.menu.style, {
      left: `${left}px`,
      top: `${top}px`,
    });
  }
}

customElements.define("mk-dropdown", MkDropdown);
