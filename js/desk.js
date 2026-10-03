import { root } from "./env.js";

export function initDesk() {
  const key = "rata-desk";
  const button = document.querySelector(".desk-toggle");
  const label = document.querySelector("[data-desk-label]");

  const apply = (mode) => {
    root.dataset.desk = mode;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      mode === "night" ? "#12110e" : "#efe6d0"
    );
    button?.setAttribute("aria-pressed", String(mode === "night"));
    if (label) label.textContent = mode === "night" ? "Day desk" : "Night desk";
  };

  const saved = localStorage.getItem(key);
  const prefersNight = window.matchMedia("(prefers-color-scheme: dark)").matches;
  apply(saved || (prefersNight ? "night" : "day"));

  button?.addEventListener("click", () => {
    const next = root.dataset.desk === "night" ? "day" : "night";
    localStorage.setItem(key, next);
    apply(next);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() !== "d" || event.metaKey || event.ctrlKey || event.altKey) return;
    const tag = event.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    button?.click();
  });
}
