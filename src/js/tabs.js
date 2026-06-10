// MiniKit - Tabs
//
// Accessible tabs with:
//
// - Arrow key navigation
// - Home / End navigation
// - ARIA synchronization
// - Panel visibility management
//
// Usage:
//
// <mk-tabs>
//   <div role="tablist">
//     <button role="tab">General</button>
//     <button role="tab">Security</button>
//   </div>
//
//   <section role="tabpanel">
//     ...
//   </section>
//
//   <section role="tabpanel">
//     ...
//   </section>
// </mk-tabs>

import { MkElement } from "./base.js";

class MkTabs extends MkElement {
    tabs = [];
    panels = [];

    init() {
        const tablist = this.$(':scope > [role="tablist"]');

        if (!tablist) return;

        this.tabs = [...tablist.querySelectorAll('[role="tab"]')];
        this.panels = this.$$(':scope > [role="tabpanel"]');

        if (!this.tabs.length || !this.panels.length) {
            return;
        }

        this.tabs.forEach((tab, index) => {
            const panel = this.panels[index];

            if (!panel) return;

            const tabId = tab.id || `mk-tab-${index}`;
            const panelId = panel.id || `mk-panel-${index}`;

            tab.id = tabId;
            panel.id = panelId;

            tab.setAttribute("aria-controls", panelId);
            panel.setAttribute("aria-labelledby", tabId);
        });

        tablist.addEventListener("click", this);
        tablist.addEventListener("keydown", this);

        const active = this.tabs.findIndex(
            (tab) => tab.getAttribute("aria-selected") === "true",
        );

        this.activate(active >= 0 ? active : 0);
    }

    cleanup() {
        const tablist = this.$(':scope > [role="tablist"]');

        if (!tablist) return;

        tablist.removeEventListener("click", this);
        tablist.removeEventListener("keydown", this);
    }

    onclick(event) {
        const tab = event.target.closest('[role="tab"]');

        if (!tab) return;

        const index = this.tabs.indexOf(tab);

        if (index >= 0) {
            this.activate(index);
        }
    }

    onkeydown(event) {
        const tab = event.target.closest('[role="tab"]');

        if (!tab) return;

        const current = this.tabs.indexOf(tab);

        const next = this.keyNav(
            event,
            current,
            this.tabs.length,
            "ArrowLeft",
            "ArrowRight",
            true,
        );

        if (next < 0) return;

        this.activate(next);
        this.tabs[next].focus();
    }

    activate(index) {
        this.tabs.forEach((tab, i) => {
            const active = i === index;

            tab.setAttribute("aria-selected", String(active));

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
        return this.tabs.findIndex(
            (tab) => tab.getAttribute("aria-selected") === "true",
        );
    }

    set activeIndex(index) {
        if (index >= 0 && index < this.tabs.length) {
            this.activate(index);
        }
    }
}

customElements.define("mk-tabs", MkTabs);
