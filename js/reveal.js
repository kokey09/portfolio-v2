import { reduced } from "./env.js";

export function initReveal() {
  const items = document.querySelectorAll(".section, .prelude, .colophon");
  if (reduced) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("reveal");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );
  items.forEach((item) => io.observe(item));
}
