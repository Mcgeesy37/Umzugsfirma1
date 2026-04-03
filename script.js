
// script.js (unverändert, weiterhin passend)
const revealItems = document.querySelectorAll("[data-reveal]");
const siteHeader = document.getElementById("siteHeader");
const heroImage = document.querySelector(".hero-image");
const filters = document.querySelectorAll(".gallery-filter");
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach((item) => observer.observe(item));

if (siteHeader || heroImage) {
  document.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (siteHeader) {
      siteHeader.classList.toggle("scrolled", y > 24);
    }
    if (heroImage) {
      heroImage.style.transform = `scale(1.03) translateY(${Math.min(y * 0.035, 16)}px)`;
    }
  }, { passive: true });
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filters.forEach((el) => el.classList.remove("is-active"));
    button.classList.add("is-active");

    galleryItems.forEach((item) => {
      const visible = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("hidden", !visible);
    });
  });
});

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");
    const caption = item.querySelector("figcaption");
    if (!image || !lightbox || !lightboxImage || !lightboxCaption) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption ? caption.textContent : "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

if (lightbox && lightboxClose) {
  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  };

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "Danke. Ihre Anfrage wurde in der Vorschau gespeichert. Live-Versand kann als naechster Schritt angebunden werden.";
  });
}
