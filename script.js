// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

function toggleMenu() {
  const open = mobileNav.style.display === "flex";
  mobileNav.style.display = open ? "none" : "flex";
  menuBtn?.setAttribute("aria-expanded", String(!open));
  mobileNav?.setAttribute("aria-hidden", String(open));
}
menuBtn?.addEventListener("click", toggleMenu);

mobileNav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mobileNav.style.display = "none";
    menuBtn?.setAttribute("aria-expanded", "false");
    mobileNav?.setAttribute("aria-hidden", "true");
  });
});

// Reveal on scroll
const revealEls = Array.from(document.querySelectorAll("[data-reveal]"));
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("in");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// Subtle tilt for the hero card (no libraries)
const tilt = document.querySelector("[data-tilt]");
if (tilt) {
  const max = 10;
  const onMove = (e) => {
    const r = tilt.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (y - 0.5) * -max;
    const ry = (x - 0.5) * max;
    tilt.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  };
  const reset = () => tilt.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px)";

  tilt.addEventListener("mousemove", onMove);
  tilt.addEventListener("mouseleave", reset);
  tilt.addEventListener("touchend", reset, { passive: true });
}

// Current year
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();
