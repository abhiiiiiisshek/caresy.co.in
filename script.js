const navToggle = document.querySelector(".nav-toggle");
const bookingForm = document.querySelector("#bookingForm");
const bookingId = document.querySelector("#bookingId");
const bookingStatus = document.querySelector("#bookingStatus");
const dateInput = document.querySelector('input[name="date"]');
const revealItems = document.querySelectorAll(".reveal");

if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

if (bookingForm && bookingId && bookingStatus) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const patientName = String(formData.get("patientName") || "Patient").trim();
    const service = String(formData.get("service") || "Hospital Companion");
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const isUrgent = document.body.querySelector(".urgent-page");

    bookingId.textContent = `CRS-${randomId}`;
    bookingStatus.textContent = isUrgent
      ? `Urgent call-back requested for ${patientName} - ${service}`
      : `Pending assignment for ${patientName} - ${service}`;
    bookingForm.querySelector("button")?.focus();
  });
}
