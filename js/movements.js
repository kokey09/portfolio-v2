export function initMovements() {
  document.querySelectorAll(".movement").forEach((item) => {
    const button = item.querySelector(".movement__head");
    const body = item.querySelector(".movement__body");
    if (!button || !body) return;
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      body.hidden = open;
      item.classList.toggle("is-open", !open);
    });
  });
}
