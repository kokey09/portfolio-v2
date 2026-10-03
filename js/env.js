export const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
export const root = document.documentElement;

export function initEnv() {
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
  if (touch) document.body.classList.add("has-touch");
}
