// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
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

// Dot controls
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    resetSlideshow();
  });
});

// Pause while the pointer is over the slideshow
const slideshow = document.querySelector(".slideshow");

if (slideshow && slides.length) {
  showSlide(0);
  startSlideshow();

  slideshow.addEventListener("mouseenter", () => {
    clearInterval(slideshowTimer);
  });

  slideshow.addEventListener("mouseleave", () => {
    startSlideshow();
  });

  slideshow.addEventListener("focusin", () => {
    clearInterval(slideshowTimer);
  });

  slideshow.addEventListener("focusout", () => {
    startSlideshow();
  });
}

// Partnership form
const form = document.getElementById("partnerForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = document.getElementById("formMessage");

    if (message) {
      message.textContent =
        "Thank you! Your partnership request has been received. Connect this form to your email/PHP backend to process submissions.";
    }

    form.reset();
  });
}
