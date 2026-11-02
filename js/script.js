/* ============================================================
   Skyshore Taxi Service
   js/script.js  -  all the website's interactivity

   FUNCTIONS IN THIS FILE (6 jobs):
   1. Mobile menu (hamburger) toggle
   2. Header shadow + back-to-top button while scrolling
   3. Booking form validation
   4. WhatsApp booking message generation
   5. Photo gallery lightbox
   6. Small helpers (image fallback, footer year)
   ============================================================ */

// WhatsApp number for the booking form: country code + number,
// no "+" sign, no spaces - the official wa.me format.
const WHATSAPP_NUMBER = "94773964515";

/* ------------------------------------------------------------
   1. MOBILE MENU TOGGLE
   On phones the menu is hidden. Tapping the hamburger opens a
   slide-down menu. Tapping a link closes it.
   ------------------------------------------------------------ */

const hamburger = document.getElementById("hamburger");
const siteNav = document.getElementById("siteNav");
const siteHeader = document.getElementById("siteHeader");

const closeMenu = () => {
  siteNav.classList.remove("open");
  hamburger.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
};

hamburger.addEventListener("click", () => {
  const willOpen = !siteNav.classList.contains("open");
  siteNav.classList.toggle("open", willOpen);
  hamburger.classList.toggle("open", willOpen);
  hamburger.setAttribute("aria-expanded", String(willOpen));
});

// Tapping any navigation link closes the mobile menu
document.querySelectorAll(".nav-link, .nav-list .btn").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close the menu with the Escape key too (desktop accessibility)
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

/* ------------------------------------------------------------
   2. HEADER SHADOW + BACK-TO-TOP BUTTON (on scroll)
   ------------------------------------------------------------ */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  const scrolledDown = window.scrollY > 8;

  // Soft shadow on the header once the page is moving
  siteHeader.classList.toggle("scrolled", scrolledDown);

  // Show back-to-top after 500px of scrolling
  backToTop.classList.toggle("show", window.scrollY > 500);
});

// Smoothly return to the very top
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ------------------------------------------------------------
   3. BOOKING FORM VALIDATION
   Every required field is checked. Errors show as short red
   messages under each field. Valid input opens WhatsApp.
   ------------------------------------------------------------ */

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the browser reloading the page

  // Read what the customer typed (trim removes extra spaces)
  const values = {
    fullName: document.getElementById("fullName").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    pickup: document.getElementById("pickup").value.trim(),
    destination: document.getElementById("destination").value.trim(),
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    vehicle: document.getElementById("vehicle").value,
    message: document.getElementById("message").value.trim(),
  };

  let valid = true;

  // Small helper: show or clear the error message under a field
  const setError = (fieldId, message) => {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + "Error");

    if (message) {
      error.textContent = message;      // show the red text...
      error.classList.add("show");
      input.classList.add("invalid");   // ...and a red border
      valid = false;
    } else {
      error.textContent = "";
      error.classList.remove("show");
      input.classList.remove("invalid");
    }
  };

  // --- Name: at least 2 characters ---
  if (values.fullName.length < 2) {
    setError("fullName", "Please enter your name.");
  } else {
    setError("fullName", "");
  }

  // --- Phone: 7 to 15 digits (spaces and dashes allowed) ---
  const digits = values.phone.replace(/[^0-9]/g, "");
  if (digits.length < 7 || digits.length > 15) {
    setError("phone", "Please enter a valid phone number.");
  } else {
    setError("phone", "");
  }

  if (values.pickup === "") {
    setError("pickup", "Please enter a pickup location.");
  } else {
    setError("pickup", "");
  }

  if (values.destination === "") {
    setError("destination", "Please enter a destination.");
  } else {
    setError("destination", "");
  }

  // --- Date: must be chosen, and not in the past ---
  if (values.date === "") {
    setError("date", "Please choose a travel date.");
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosen = new Date(values.date + "T00:00:00");
    if (chosen < today) {
      setError("date", "Please choose today or a later date.");
    } else {
      setError("date", "");
    }
  }

  if (values.time === "") {
    setError("time", "Please choose a pickup time.");
  } else {
    setError("time", "");
  }

  if (values.vehicle === "") {
    setError("vehicle", "Please select a vehicle.");
  } else {
    setError("vehicle", "");
  }

  // --- Send to WhatsApp when everything is valid ---
  if (valid) {
    const enquiry =
      "New taxi booking enquiry - Skyshore Taxi Service\n" +
      "------------------------------------------------\n" +
      "Name: " + values.fullName + "\n" +
      "Phone: " + values.phone + "\n" +
      "Pickup: " + values.pickup + "\n" +
      "Destination: " + values.destination + "\n" +
      "Date: " + values.date + "\n" +
      "Time: " + values.time + "\n" +
      "Vehicle: " + values.vehicle + "\n" +
      "------------------------------------------------\n" +
      "Notes: " + (values.message || "-") + "\n" +
      "(Sent from the Skyshore Taxi Service website)";

    // encodeURIComponent turns new lines/spaces into URL-safe text
    window.open(
      "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(enquiry),
      "_blank"
    );
  }
});

/* ------------------------------------------------------------
   4. GALLERY LIGHTBOX
   Click a photo -> large version opens in a dark overlay.
   Arrows move between photos; X, Esc or the dark area closes.
   ------------------------------------------------------------ */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const galleryImages = document.querySelectorAll(".gallery-item img");

let currentPhoto = 0; // index of the photo being viewed

const openLightbox = (index) => {
  currentPhoto = index;
  lightboxImg.src = galleryImages[index].src;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
};

const closeLightbox = () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
};

const showNextPhoto = () => {
  currentPhoto = (currentPhoto + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentPhoto].src;
};

const showPrevPhoto = () => {
  currentPhoto = (currentPhoto - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentPhoto].src;
};

// Make every gallery photo clickable
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
document.getElementById("lightboxNext").addEventListener("click", showNextPhoto);
document.getElementById("lightboxPrev").addEventListener("click", showPrevPhoto);

// Clicking the dark background (not the photo or buttons) closes it
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

// Keyboard: Esc closes, left/right arrows change photos
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") showNextPhoto();
  if (event.key === "ArrowLeft") showPrevPhoto();
});

/* ------------------------------------------------------------
   5. IMAGE FALLBACK
   If a photo file is missing, replace it with a neat note
   instead of a broken image icon. (Only for gallery photos;
   the lightbox image starts empty on purpose.)
   ------------------------------------------------------------ */

document.querySelectorAll(".vehicle-photo img, .gallery-item img, .about-photos img, .hero-photo img").forEach((img) => {
  img.addEventListener("error", () => {
    const note = document.createElement("div");
    note.className = "img-fallback";
    note.textContent = "Photo unavailable";
    img.replaceWith(note);
  });
});

/* ------------------------------------------------------------
   6. FOOTER YEAR
   Updates automatically every year, e.g. 2026.
   ------------------------------------------------------------ */

document.getElementById("year").textContent = new Date().getFullYear();
