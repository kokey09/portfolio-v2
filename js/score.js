import { reduced, root } from "./env.js";

export function initScore() {
  const canvas = document.getElementById("score");
  if (!canvas) return;

  const pointer = { x: 0.5, y: 0.45 };
  const voices = [
    { colorVar: "--voice-i", freq: 0.012, amp: 32, phase: 0.2, weight: 1.7 },
    { colorVar: "--voice-ii", freq: 0.0085, amp: 40, phase: 1.1, weight: 1.45 },
    { colorVar: "--voice-iii", freq: 0.015, amp: 24, phase: 2.4, weight: 1.35 },
    { colorVar: "--voice-iv", freq: 0.0065, amp: 46, phase: 3.6, weight: 1.6 },
  ];

  let ctx;
  let w = 0;
  let h = 0;
  let t = 0;

  const color = (name) => getComputedStyle(root).getPropertyValue(name).trim();

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    w = rect.width;
    h = rect.height;
  };

  const draw = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);
    const mid = h * 0.52;
    voices.forEach((voice, index) => {
      ctx.beginPath();
      ctx.lineWidth = voice.weight;
      ctx.strokeStyle = color(voice.colorVar);
      ctx.globalAlpha = 0.92;
      for (let x = 0; x <= w; x += 2) {
        const nx = x / w;
        const pull = Math.exp(-Math.pow((nx - pointer.x) * 2.4, 2));
        const y =
          mid +
          Math.sin(x * voice.freq + t * (0.7 + index * 0.08) + voice.phase) *
            (voice.amp + pointer.y * 26 * pull) +
          Math.sin(x * voice.freq * 0.37 + voice.phase) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    });
    ctx.globalAlpha = 1;
  };

  resize();
  draw();
  window.addEventListener("resize", () => {
    resize();
    draw();
  });
  canvas.addEventListener("pointermove", (event) => {
    const box = canvas.getBoundingClientRect();
    pointer.x = (event.clientX - box.left) / box.width;
    pointer.y = (event.clientY - box.top) / box.height;
  });

  if (reduced) return;
  const loop = () => {
    t += 0.016;
    draw();
    requestAnimationFrame(loop);
  };
  loop();
}
