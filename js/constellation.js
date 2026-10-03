const nodes = [
  { id: "ts", name: "TypeScript", voice: "interface", x: 16, y: 20, about: "The common key across web, mobile, and the API." },
  { id: "react", name: "React", voice: "interface", x: 34, y: 14, about: "Web surfaces for Cavalry and Koobo." },
  { id: "rn", name: "React Native", voice: "interface", x: 48, y: 26, about: "The EVX charging client, on the phone." },
  { id: "expo", name: "Expo", voice: "interface", x: 28, y: 36, about: "How the EVX app leaves the laptop." },
  { id: "next", name: "Next.js", voice: "interface", x: 52, y: 40, about: "App Router on Cavalry and Koobo." },
  { id: "tq", name: "TanStack Query", voice: "interface", x: 18, y: 50, about: "Server state for charging sessions and plates." },
  { id: "node", name: "Node.js", voice: "systems", x: 68, y: 16, about: "The runtime under Nest and Express." },
  { id: "nest", name: "NestJS", voice: "systems", x: 82, y: 28, about: "APIs for Cavalry, EVX, and Koobo." },
  { id: "express", name: "Express", voice: "systems", x: 66, y: 40, about: "The other service voice on the Cavalry suite." },
  { id: "socket", name: "Socket.IO", voice: "systems", x: 84, y: 46, about: "Per-user rooms so Koobo messages arrive anywhere." },
  { id: "pg", name: "PostgreSQL", voice: "persistence", x: 22, y: 70, about: "Relational store, migrated in versions." },
  { id: "mysql", name: "MySQL", voice: "persistence", x: 40, y: 78, about: "The other SQL hall on the Zkript desk." },
  { id: "mongo", name: "MongoDB", voice: "persistence", x: 54, y: 64, about: "Koobo’s documents in the Turborepo." },
  { id: "prisma", name: "Prisma", voice: "persistence", x: 36, y: 58, about: "EVX schema, typed and migrated." },
  { id: "azure", name: "Azure", voice: "delivery", x: 72, y: 64, about: "Where the release actually lands." },
  { id: "docker", name: "Docker", voice: "delivery", x: 86, y: 74, about: "Cavalry, Santos, and Arrow environments." },
  { id: "stripe", name: "Stripe", voice: "delivery", x: 62, y: 78, about: "Charging sessions that have to bill once." },
  { id: "oidc", name: "OIDC / SSO", voice: "delivery", x: 80, y: 56, about: "One login across the Cavalry suite." },
];

const links = [
  ["ts", "react"],
  ["react", "rn"],
  ["rn", "expo"],
  ["react", "next"],
  ["ts", "tq"],
  ["rn", "tq"],
  ["next", "node"],
  ["node", "nest"],
  ["node", "express"],
  ["nest", "socket"],
  ["nest", "prisma"],
  ["prisma", "pg"],
  ["prisma", "mysql"],
  ["nest", "mongo"],
  ["nest", "docker"],
  ["docker", "azure"],
  ["nest", "oidc"],
  ["rn", "stripe"],
];

export function initConstellation() {
  const host = document.getElementById("constellation");
  const nodesEl = document.querySelector(".constellation__nodes");
  const svg = document.querySelector(".constellation__wires");
  const note = document.querySelector("[data-note]");
  if (!host || !nodesEl) return;

  let filter = "all";

  const drawWires = () => {
    if (!svg) return;
    const box = host.getBoundingClientRect();
    svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
    svg.innerHTML = links
      .map(([a, b]) => {
        const na = nodes.find((n) => n.id === a);
        const nb = nodes.find((n) => n.id === b);
        if (!na || !nb) return "";
        const dim = filter !== "all" && na.voice !== filter && nb.voice !== filter;
        return `<line x1="${(na.x / 100) * box.width}" y1="${(na.y / 100) * box.height}" x2="${(nb.x / 100) * box.width}" y2="${(nb.y / 100) * box.height}" stroke="currentColor" stroke-opacity="${dim ? 0.08 : 0.28}" stroke-width="1"/>`;
      })
      .join("");
  };

  const applyFilter = () => {
    nodesEl.querySelectorAll(".node").forEach((el) => {
      const on = filter === "all" || el.dataset.voice === filter;
      el.classList.toggle("is-dim", !on);
    });
    drawWires();
  };

  nodesEl.innerHTML = nodes
    .map(
      (node) =>
        `<button type="button" class="node" data-id="${node.id}" data-voice="${node.voice}" style="left:${node.x}%;top:${node.y}%">${node.name}</button>`
    )
    .join("");

  nodesEl.querySelectorAll(".node").forEach((el) => {
    const meta = nodes.find((n) => n.id === el.dataset.id);
    const show = () => {
      if (note && meta) note.textContent = `${meta.name} — ${meta.about}`;
      el.classList.add("is-hot");
    };
    const hide = () => {
      if (note) note.textContent = "Select a register, or rest on a node.";
      el.classList.remove("is-hot");
    };
    el.addEventListener("pointerenter", show);
    el.addEventListener("focus", show);
    el.addEventListener("pointerleave", hide);
    el.addEventListener("blur", hide);
  });

  document.querySelectorAll("[data-voice]").forEach((btn) => {
    if (!btn.classList.contains("voice-list__item")) return;
    btn.addEventListener("click", () => {
      filter = btn.dataset.voice;
      document.querySelectorAll(".voice-list__item").forEach((item) => {
        item.classList.toggle("is-active", item === btn);
      });
      applyFilter();
    });
  });

  drawWires();
  window.addEventListener("resize", drawWires);
}
