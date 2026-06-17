import "./dialog.js";
import "./dropdown.js";
import "./tabs.js";
import "./tooltip.js";

import * as toast from "./toast.js";

window.mk ??= Object.create(null);

Object.assign(window.mk, {
  toast: toast.show,
  toastElement: toast.showElement,
  clearToasts: toast.clear,
});
