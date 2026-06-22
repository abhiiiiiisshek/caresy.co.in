// Navigation menu toggle
const navToggle = document.querySelector(".nav-toggle");
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

// Reveal items on scroll (IntersectionObserver)
const revealItems = document.querySelectorAll(".reveal");
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
    { threshold: 0.05 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Set minimum date to today for planned booking page
const dateInput = document.querySelector('input[name="date"]');
if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

// ----------------------------------------------------
// 1. Homepage Simulator Interactive Logic
// ----------------------------------------------------
const simulatorTabs = document.querySelectorAll(".simulator-tab");
const simulatorPanels = document.querySelectorAll(".simulator-panel");

if (simulatorTabs.length > 0 && simulatorPanels.length > 0) {
  simulatorTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      // Deactivate all tabs
      simulatorTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      // Hide all panels
      simulatorPanels.forEach((p) => {
        p.classList.remove("active");
        p.setAttribute("hidden", "true");
      });

      // Activate selected tab and panel
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      
      const panelId = tab.getAttribute("aria-controls");
      const activePanel = document.getElementById(panelId);
      if (activePanel) {
        activePanel.classList.add("active");
        activePanel.removeAttribute("hidden");
      }
    });
  });
}

// ----------------------------------------------------
// 2. Trust Page Companion Profile Accordion
// ----------------------------------------------------
const profileCards = document.querySelectorAll(".profile-card");
if (profileCards.length > 0) {
  profileCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Collapse all profiles
      profileCards.forEach((c) => {
        c.classList.remove("active");
        const details = c.querySelector(".profile-expanded-details");
        if (details) details.style.display = "none";
      });

      // Expand clicked profile
      card.classList.add("active");
      const details = card.querySelector(".profile-expanded-details");
      if (details) details.style.display = "block";
    });
  });
}

// ----------------------------------------------------
// 3. Booking Form Dynamic Request Preview and Matcher
// ----------------------------------------------------
const bookingForm = document.querySelector("#bookingForm");
const bookingId = document.querySelector("#bookingId");
const bookingStatus = document.querySelector("#bookingStatus");

// Form Inputs
const inputPatientName = document.querySelector("#bookingPatientName");
const inputHospital = document.querySelector("#bookingHospital");
const inputDept = document.querySelector("#bookingDept");
const selectService = document.querySelector("#bookingService");

// Preview Elements
const previewPatient = document.querySelector("#previewPatient");
const previewHospital = document.querySelector("#previewHospital");
const previewDept = document.querySelector("#previewDept");
const previewService = document.querySelector("#previewService");
const previewNextStep = document.querySelector("#previewNextStep");

// Companion Matcher Elements
const matcherStatus = document.querySelector("#matcherStatus");
const matcherResult = document.querySelector("#matcherResult");
const matcherName = document.querySelector("#matcherName");
const matcherRating = document.querySelector("#matcherRating");
const matcherAvatar = document.querySelector("#matcherAvatar");
const matcherLang = document.querySelector("#matcherLang");
const matcherSpecialty = document.querySelector("#matcherSpecialty");

// Companion Database Mock
const companionDatabase = {
  cardiology: {
    name: "Priya Sharma",
    avatar: "PS",
    rating: "★ 4.9 (82 visits)",
    verification: "Police Verified",
    lang: "Hindi, English",
    specialty: "Cardiology",
    color: "#08796f"
  },
  orthopedics: {
    name: "Anil Kumar",
    avatar: "AK",
    rating: "★ 4.8 (120 visits)",
    verification: "Police Verified",
    lang: "Kannada, Tamil, English",
    specialty: "Orthopedics",
    color: "#e77f62"
  },
  general: {
    name: "Sarah Mathews",
    avatar: "SM",
    rating: "★ 4.9 (65 visits)",
    verification: "Police Verified",
    lang: "Malayalam, Telugu, English",
    specialty: "General Care",
    color: "#a45b9a"
  }
};

function updateBookingPreview() {
  if (!bookingForm) return;

  const patientNameVal = inputPatientName ? inputPatientName.value.trim() : "";
  const hospitalVal = inputHospital ? inputHospital.value.trim() : "";
  const deptVal = inputDept ? inputDept.value.trim() : "";
  const serviceVal = selectService ? selectService.value : "";
  
  let servicePrice = "₹499";
  if (serviceVal && serviceVal.includes("Pickup")) servicePrice = "₹899";
  else if (serviceVal && serviceVal.includes("Full Day")) servicePrice = "₹1,299";
  else if (serviceVal && serviceVal.includes("Custom")) servicePrice = "Quote after review";

  // Update preview fields
  if (previewPatient) previewPatient.textContent = patientNameVal || "—";
  if (previewHospital) previewHospital.textContent = hospitalVal || "—";
  if (previewDept) previewDept.textContent = deptVal || "—";
  if (previewService) {
    previewService.textContent = serviceVal ? `${serviceVal} (${servicePrice})` : `Hospital Companion (₹499)`;
  }

  // Update Status & Next Step
  if (patientNameVal && hospitalVal) {
    if (bookingId && (bookingId.textContent === "CRS-XXXX" || bookingId.textContent === "Pending assignment" || bookingId.textContent === "Pending")) {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      bookingId.textContent = `CRS-${randomId}`;
    }
    if (bookingStatus) bookingStatus.textContent = "Ready to Request";
    if (previewNextStep) previewNextStep.textContent = "Submit form to contact dispatch";
  } else {
    if (bookingId) bookingId.textContent = "CRS-XXXX";
    if (bookingStatus) bookingStatus.textContent = "Form incomplete";
    if (previewNextStep) previewNextStep.textContent = "Fill in required details";
  }

  // Companion Matcher logic
  if (matcherStatus && matcherResult) {
    if (patientNameVal || hospitalVal || deptVal) {
      matcherStatus.style.display = "none";
      matcherResult.style.display = "block";

      // Match based on department keywords
      const deptLower = deptVal.toLowerCase();
      let matchedCompanion = companionDatabase.general; // fallback

      if (deptLower.includes("cardio") || deptLower.includes("heart")) {
        matchedCompanion = companionDatabase.cardiology;
      } else if (deptLower.includes("ortho") || deptLower.includes("physio") || deptLower.includes("bone") || deptLower.includes("joint")) {
        matchedCompanion = companionDatabase.orthopedics;
      }

      // Render companion details
      if (matcherName) matcherName.textContent = matchedCompanion.name;
      if (matcherRating) matcherRating.textContent = matchedCompanion.rating;
      if (matcherAvatar) {
        matcherAvatar.textContent = matchedCompanion.avatar;
        matcherAvatar.style.background = matchedCompanion.color;
      }
      if (matcherLang) matcherLang.textContent = matchedCompanion.lang;
      if (matcherSpecialty) matcherSpecialty.textContent = matchedCompanion.specialty;
    } else {
      matcherStatus.style.display = "block";
      matcherResult.style.display = "none";
    }
  }
}

// Add input event listeners to trigger dynamic preview updates
if (bookingForm) {
  [inputPatientName, inputHospital, inputDept, selectService].forEach((input) => {
    if (input) {
      input.addEventListener("input", updateBookingPreview);
      input.addEventListener("change", updateBookingPreview);
    }
  });

  // Handle Form Submit
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const patientName = String(formData.get("patientName") || "Patient").trim();
    const service = String(formData.get("service") || "Hospital Companion");
    const isUrgent = document.body.querySelector(".urgent-page");

    if (bookingId && (bookingId.textContent === "CRS-XXXX" || bookingId.textContent === "Pending assignment")) {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      bookingId.textContent = `CRS-${randomId}`;
    }

    if (bookingStatus) {
      bookingStatus.textContent = isUrgent
        ? `Urgent call-back requested for ${patientName} - ${service}`
        : `Request submitted for ${patientName} - ${service}`;
    }

    if (previewNextStep) {
      previewNextStep.textContent = "Operations desk is verifying details. Call-back in progress.";
    }

    bookingForm.querySelector("button")?.focus();
  });

  // Initialize preview on page load
  updateBookingPreview();
}

// ----------------------------------------------------
// 4. Premium Interactive Legal Pages Logic
// ----------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const legalSections = document.querySelectorAll(".legal-section");
  const tocLinks = document.querySelectorAll(".legal-toc-link");
  const searchInput = document.getElementById("legalSearch");
  const noResultsDiv = document.getElementById("searchNoResults");
  const plainToggle = document.getElementById("plainEnglishToggle");
  const plainCards = document.querySelectorAll(".plain-english-card");

  // 4a. Scroll Spy for Table of Contents
  if (legalSections.length > 0 && tocLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Trigger when section occupies the upper-middle region
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      // Find the first visible intersecting section
      let activeSectionId = null;
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSectionId = entry.target.getAttribute("id");
          break;
        }
      }

      if (activeSectionId) {
        tocLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${activeSectionId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    }, observerOptions);

    legalSections.forEach((section) => observer.observe(section));
  }

  // 4b. Plain English Toggle Logic
  if (plainToggle) {
    // Sync UI with initial checkbox state (checked by default in HTML)
    const updatePlainCards = () => {
      const isEnabled = plainToggle.checked;
      plainCards.forEach((card) => {
        if (isEnabled) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    };

    plainToggle.addEventListener("change", updatePlainCards);
    updatePlainCards(); // Initial run
  }

  // 4c. Live Search Keyword Filtering & Highlighting
  if (searchInput && legalSections.length > 0) {
    // Cache original HTML elements inside legal text content and plain English cards
    const searchableElements = [];
    const elementsToCache = document.querySelectorAll(
      ".legal-text-content h2, .legal-text-content p, .legal-text-content li, .plain-english-card p"
    );

    elementsToCache.forEach((el) => {
      searchableElements.push({
        element: el,
        originalHTML: el.innerHTML,
        originalText: el.textContent
      });
    });

    // Highlight text matching searchTerm
    const highlightElementText = (element, searchTerm) => {
      const text = element.textContent;
      const termLower = searchTerm.toLowerCase();
      const index = text.toLowerCase().indexOf(termLower);

      if (index === -1) return;

      const spanContainer = document.createElement("span");
      let remainingText = text;

      while (true) {
        const matchIdx = remainingText.toLowerCase().indexOf(termLower);
        if (matchIdx === -1) {
          if (remainingText) {
            spanContainer.appendChild(document.createTextNode(remainingText));
          }
          break;
        }

        const prefix = remainingText.substring(0, matchIdx);
        const match = remainingText.substring(matchIdx, matchIdx + searchTerm.length);

        if (prefix) {
          spanContainer.appendChild(document.createTextNode(prefix));
        }

        const highlightSpan = document.createElement("span");
        highlightSpan.className = "highlight";
        highlightSpan.appendChild(document.createTextNode(match));
        spanContainer.appendChild(highlightSpan);

        remainingText = remainingText.substring(matchIdx + searchTerm.length);
      }

      element.innerHTML = "";
      element.appendChild(spanContainer);
    };

    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.trim();

      // Reset all elements back to original content
      searchableElements.forEach((item) => {
        item.element.innerHTML = item.originalHTML;
      });

      if (!searchTerm) {
        // Show all sections and TOC links
        legalSections.forEach((section) => section.classList.remove("filtered-out"));
        tocLinks.forEach((link) => link.style.display = "block");
        if (noResultsDiv) noResultsDiv.style.display = "none";
        return;
      }

      let visibleSectionsCount = 0;

      legalSections.forEach((section) => {
        const sectionId = section.getAttribute("id");
        // Get elements belonging to this section
        const elementsInThisSection = searchableElements.filter((item) =>
          section.contains(item.element)
        );

        // Check if any element contains the search term
        const hasMatch = elementsInThisSection.some((item) =>
          item.originalText.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const tocLink = document.querySelector(`.legal-toc-link[href="#${sectionId}"]`);

        if (hasMatch) {
          section.classList.remove("filtered-out");
          visibleSectionsCount++;
          if (tocLink) tocLink.style.display = "block";

          // Apply highlights
          elementsInThisSection.forEach((item) => {
            highlightElementText(item.element, searchTerm);
          });
        } else {
          section.classList.add("filtered-out");
          if (tocLink) tocLink.style.display = "none";
        }
      });

      // Show/hide empty state
      if (noResultsDiv) {
        if (visibleSectionsCount === 0) {
          noResultsDiv.style.display = "block";
        } else {
          noResultsDiv.style.display = "none";
        }
      }
    });
  }
});

