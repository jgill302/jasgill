const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn?.addEventListener("click", () => {
  const open = mobileNav?.style.display === "flex";
  if (!mobileNav) return;
  mobileNav.style.display = open ? "none" : "flex";
  menuBtn.setAttribute("aria-expanded", String(!open));
  mobileNav.setAttribute("aria-hidden", String(open));
});

mobileNav?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    mobileNav.style.display = "none";
    menuBtn?.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
  });
});

const revealEls = Array.from(document.querySelectorAll("[data-reveal]"));
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("in");
  });
}, { threshold: 0.12 });
revealEls.forEach((el) => io.observe(el));

const tilt = document.querySelector("[data-tilt]");
if (tilt) {
  const max = 8;
  tilt.addEventListener("mousemove", (e) => {
    const r = tilt.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    tilt.style.transform = `rotateX(${(y - 0.5) * -max}deg) rotateY(${(x - 0.5) * max}deg)`;
  });
  tilt.addEventListener("mouseleave", () => {
    tilt.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}

const typeEl = document.querySelector("[data-type]");
if (typeEl) {
  const full = typeEl.getAttribute("data-type") || "";
  let i = 0;
  const speed = 16;
  const tick = () => {
    i += 1;
    typeEl.textContent = full.slice(0, i);
    if (i < full.length) window.setTimeout(tick, speed);
  };
  tick();
}

const canvas = document.getElementById("matrix");
if (canvas) {
  const ctx = canvas.getContext("2d");
  const chars = "01アカサタナハマヤラワABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let cols = 0;
  let drops = [];

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / 16);
    drops = Array(cols).fill(1);
  };

  const draw = () => {
    if (!ctx) return;
    ctx.fillStyle = "rgba(2, 10, 7, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#6fffaa";
    ctx.font = "14px 'Share Tech Mono', monospace";

    for (let i = 0; i < drops.length; i += 1) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * 16, drops[i] * 16);
      if (drops[i] * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 1;
    }
  };

  resize();
  window.addEventListener("resize", resize);
  window.setInterval(draw, 42);
}

const y = document.getElementById("year");
if (y) y.textContent = String(new Date().getFullYear());
