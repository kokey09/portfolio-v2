import { reduced, touch } from "./env.js";

export function initCursor() {
  const el = document.querySelector(".cursor");
  const ring = document.querySelector(".cursor__ring");
  if (touch || !el) return;

  const point = { x: 0, y: 0, rx: 0, ry: 0 };
  el.hidden = false;

  window.addEventListener("pointermove", (event) => {
    point.x = event.clientX;
    point.y = event.clientY;
    el.style.transform = `translate(${point.x}px, ${point.y}px)`;
  });
  window.addEventListener("pointerdown", () => document.body.classList.add("is-pointer-down"));
  window.addEventListener("pointerup", () => document.body.classList.remove("is-pointer-down"));
  document.addEventListener("pointerover", (event) => {
    if (event.target.closest("a, button, input, select, textarea, .node")) {
      document.body.classList.add("is-hovering");
    }
  });
  document.addEventListener("pointerout", (event) => {
    if (event.target.closest("a, button, input, select, textarea, .node")) {
      document.body.classList.remove("is-hovering");
    }
  });

  if (reduced) return;
  const loop = () => {
    point.rx += (point.x - point.rx) * 0.18;
    point.ry += (point.y - point.ry) * 0.18;
    if (ring) {
      ring.style.transform = `translate(calc(-50% + ${point.rx - point.x}px), calc(-50% + ${point.ry - point.y}px))`;
    }
    requestAnimationFrame(loop);
  };
  loop();
}

export function initMagnetic() {
  if (touch || reduced) return;
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("pointermove", (event) => {
      const box = el.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.22}px)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  });
}
