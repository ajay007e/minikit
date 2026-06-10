import "./dialog.js";
import "./tabs.js";
import "./tooltip.js";
import * as toast from "./toast.js";

window.mk ??= {};
window.mk.toast = toast.show;
window.mk.toastEl = toast.showElement;
window.mk.toastClear = toast.clear;
