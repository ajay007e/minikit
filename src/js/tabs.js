// MiniKit - Tabs
//
// Accessible tabs with:
//
// - Arrow key navigation
// - Home / End navigation
// - ARIA synchronization
// - Panel visibility management

import { MkElement } from "./base.js";

class MkTabs extends MkElement {
  static count = 0;

  uid = ++MkTabs.count;

  tabs = [];
  panels = [];

  init() {
    const tablist = this.$(':scope > [role="tablist"]');

    if (!tablist) {
      return;
    }

    this.tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    this.panels = this.$$(':scope > [role="tabpanel"]');

    if (!this.tabs.length || !this.panels.length) {
      return;
    }

    this.tabs.forEach((tab, index) => {
      const panel = this.panels[index];

      if (!panel) {
        return;
      }

      tab.id ||= `mk-tab-${this.uid}-${index}`;
      panel.id ||= `mk-panel-${this.uid}-${index}`;

      tab.setAttribute("aria-controls", panel.id);
      panel.setAttribute("aria-labelledby", tab.id);
    });

    tablist.addEventListener("click", this);
    tablist.addEventListener("keydown", this);

    this.activate(this.activeIndex >= 0 ? this.activeIndex : 0);
  }

  cleanup() {
    this.$(':scope > [role="tablist"]')?.removeEventListener("click", this);

    this.$(':scope > [role="tablist"]')?.removeEventListener("keydown", this);
  }

  onclick(event) {
    const tab = event.target.closest('[role="tab"]');

    if (!tab || tab.disabled) {
      return;
    }

    const index = this.tabs.indexOf(tab);

    if (index < 0 || index === this.activeIndex) {
      return;
    }

    this.activate(index);
  }

  onkeydown(event) {
    const tab = event.target.closest('[role="tab"]');

    if (!tab || tab.disabled) {
      return;
    }

    const enabledTabs = this.tabs.filter((tab) => !tab.disabled);

    const current = enabledTabs.indexOf(tab);

    const next = this.keyNav(
      event,
      current,
      enabledTabs.length,
      "ArrowLeft",
      "ArrowRight",
    );

    if (next < 0) {
      return;
    }

    const target = enabledTabs[next];
    const index = this.tabs.indexOf(target);

    this.activate(index);
    target.focus();
  }

  activate(index) {
    this.tabs.forEach((tab, i) => {
      const active = i === index;

      tab.ariaSelected = String(active);
      tab.tabIndex = active ? 0 : -1;
    });

    this.panels.forEach((panel, i) => {
      panel.hidden = i !== index;
    });

    this.emit("tab-change", {
      index,
      tab: this.tabs[index],
      panel: this.panels[index],
    });
  }

  get activeIndex() {
    return this.tabs.findIndex((tab) => tab.ariaSelected === "true");
  }

  set activeIndex(index) {
    if (index >= 0 && index < this.tabs.length) {
      this.activate(index);
    }
  }
}

customElements.define("mk-tabs", MkTabs);
