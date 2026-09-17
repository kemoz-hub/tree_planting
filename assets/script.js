// Mobile navigation drawer
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  const header = document.querySelector(".site-header");
  const drawerId = "mobile-nav-backdrop";
  let backdrop = document.getElementById(drawerId);

  // Add transition styles here so the drawer remains smooth without changing
  // the desktop navigation styles.
  if (!document.getElementById("mobile-nav-drawer-styles")) {
    const style = document.createElement("style");
    style.id = "mobile-nav-drawer-styles";
    style.textContent = `
      @media (max-width: 800px) {
        .site-header { position: sticky; }
        .nav {
          display: flex !important;
          visibility: hidden;
          pointer-events: none;
          opacity: 0;
          transform: translateY(-12px);
          transition: opacity .24s ease, transform .24s ease, visibility 0s linear .24s;
          z-index: 30;
        }
        .nav.open {
          visibility: visible;
          pointer-events: auto;
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0s;
        }
        #${drawerId} {
          position: fixed;
          inset: 68px 0 0;
          z-index: 19;
          background: rgba(16, 38, 26, .28);
          opacity: 0;
          pointer-events: none;
          transition: opacity .24s ease;
        }
        #${drawerId}.visible { opacity: 1; pointer-events: auto; }
        body.nav-is-open { overflow: hidden; }
      }
      @media (min-width: 801px) {
        #${drawerId} { display: none; }
      }
    `;
    document.head.appendChild(style);
  }

  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.id = drawerId;
    backdrop.setAttribute("aria-hidden", "true");
    (header || document.body).after(backdrop);
  }

  const setDrawerState = (open) => {
    nav.classList.toggle("open", open);
    backdrop.classList.toggle("visible", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    document.body.classList.toggle("nav-is-open", open);
  };

  menuToggle.addEventListener("click", () => {
    setDrawerState(!nav.classList.contains("open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setDrawerState(false));
  });

  backdrop.addEventListener("click", () => setDrawerState(false));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      setDrawerState(false);
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) setDrawerState(false);
  });
}

// Automatic Home page slideshow
const slides = document.querySelectorAll(".slideshow .slide");
const dots = document.querySelectorAll(".slide-dots .dot");

let currentSlide = 0;
let slideshowTimer = null;
const slideDuration = 4000;

function showSlide(index) {
  if (!slides.length) return;

  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
    dot.setAttribute("aria-current", i === currentSlide ? "true" : "false");
  });
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function startSlideshow() {
  if (slides.length < 2) return;
  clearInterval(slideshowTimer);
  slideshowTimer = setInterval(nextSlide, slideDuration);
}

function resetSlideshow() {
  startSlideshow();
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    resetSlideshow();
  });
});

const slideshow = document.querySelector(".slideshow");

if (slideshow && slides.length) {
  showSlide(0);
  startSlideshow();

  slideshow.addEventListener("mouseenter", () => clearInterval(slideshowTimer));
  slideshow.addEventListener("mouseleave", startSlideshow);
  slideshow.addEventListener("focusin", () => clearInterval(slideshowTimer));
  slideshow.addEventListener("focusout", startSlideshow);
}

// Partnership form
const form = document.getElementById("partnerForm");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = document.getElementById("formMessage");

    if (message) {
      message.textContent =
        "Thank you! Your partnership request has been received. Connect this form to your email/PHP backend to process submissions.";
    }

    form.reset();
  });
}
