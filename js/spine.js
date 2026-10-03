export function initClock() {
  const timeEl = document.querySelector("[data-clock]");
  const dateEl = document.querySelector("[data-clock-date]");

  const tick = () => {
    const now = new Date();
    const time = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Manila",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);
    const date = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Manila",
      day: "2-digit",
      month: "short",
    }).format(now);
    if (timeEl) timeEl.textContent = `PHT ${time}`;
    if (dateEl) dateEl.textContent = date;
  };

  tick();
  window.setInterval(tick, 15000);
}

export function initProgress() {
  const bar = document.querySelector(".spine__progress b");
  if (!bar) return;

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? (window.scrollY / max) * 100 : 0;
    const vertical = window.innerWidth > 980;
    bar.style[vertical ? "height" : "width"] = `${value}%`;
    bar.style[vertical ? "width" : "height"] = "100%";
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

export function initNav() {
  const links = [...document.querySelectorAll("[data-nav]")];
  const sections = [...document.querySelectorAll("[data-section]")];

  const setActive = () => {
    let current = sections[0]?.dataset.section;
    const line = window.scrollY + window.innerHeight * 0.28;
    sections.forEach((section) => {
      if (section.offsetTop <= line) current = section.dataset.section;
    });
    links.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.nav === current);
    });
  };

  setActive();
  window.addEventListener("scroll", setActive, { passive: true });
}
