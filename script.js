const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const form = document.getElementById("repair-form");
const formStatus = document.getElementById("form-status");
const visitWrap = document.getElementById("visit-reason-wrap");
const visitReason = document.getElementById("visit-reason");
const submitToast = document.getElementById("submit-toast");
const counterNodes = document.querySelectorAll("[data-counter]");

function setNavState(isOpen) {
  navToggle.setAttribute("aria-expanded", String(isOpen));
  siteNav.classList.toggle("is-open", isOpen);
}

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  setNavState(!isOpen);
});

siteNav?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    setNavState(false);
  }
});

document.addEventListener("click", (event) => {
  if (!siteNav?.classList.contains("is-open")) return;
  if (siteNav.contains(event.target) || navToggle.contains(event.target)) return;
  setNavState(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setNavState(false);
  }
});

function showFieldError(fieldId, message) {
  const errorNode = document.querySelector(`[data-error-for="${fieldId}"]`);
  if (errorNode) {
    errorNode.textContent = message;
  }
}

function clearErrors() {
  document.querySelectorAll(".field-error").forEach((errorNode) => {
    errorNode.textContent = "";
  });
  formStatus.textContent = "";
  formStatus.style.color = "";
}

let toastTimer;

function showToast(message) {
  if (!submitToast) return;
  submitToast.textContent = message;
  submitToast.hidden = false;
  submitToast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    submitToast.classList.remove("is-visible");
    submitToast.hidden = true;
  }, 2600);
}

function isValidPhone(value) {
  if (!value.trim()) return true;
  return /^[0-9()+.\-\s]{7,}$/.test(value.trim());
}

function validateForm() {
  clearErrors();
  let valid = true;

  const requiredTextFields = [
    { id: "full-name", message: "Please enter your full name." },
    { id: "email-address", message: "Please enter a valid email address." },
    { id: "issue-description", message: "Please describe the problem so I can help." },
  ];

  requiredTextFields.forEach(({ id, message }) => {
    const field = document.getElementById(id);
    if (!field.value.trim()) {
      showFieldError(id, message);
      valid = false;
    }
  });

  const emailField = document.getElementById("email-address");
  if (emailField.value.trim() && !emailField.validity.valid) {
    showFieldError("email-address", "Please enter a valid email address.");
    valid = false;
  }

  const phoneField = document.getElementById("phone-number");
  if (!isValidPhone(phoneField.value)) {
    showFieldError("phone-number", "Please enter a valid phone number or leave this blank.");
    valid = false;
  }

  const calusaCheck = document.getElementById("calusa-park");
  if (!calusaCheck.checked) {
    showFieldError("calusa-park", "Please confirm that you live in Calusa Park.");
    valid = false;
  }

  const selectRequiredFields = [
    { id: "powers-on", message: "Please choose an option." },
    { id: "physical-damage", message: "Please choose an option." },
    { id: "contact-method", message: "Please choose your preferred contact method." },
  ];

  selectRequiredFields.forEach(({ id, message }) => {
    const field = document.getElementById(id);
    if (!field.value) {
      showFieldError(id, message);
      valid = false;
    }
  });

  const visitRequested = form.querySelector('input[name="inHomeVisitRequested"]:checked')?.value === "Yes";
  if (visitRequested && !visitReason.value.trim()) {
    showFieldError("visit-reason", "Please explain why you believe an in-home visit is necessary.");
    valid = false;
  }

  return valid;
}

form?.addEventListener("change", (event) => {
  if (event.target.name === "inHomeVisitRequested") {
    const showVisit = event.target.value === "Yes" && event.target.checked;
    visitWrap.classList.toggle("hidden", !showVisit);
    if (!showVisit) {
      visitReason.value = "";
      showFieldError("visit-reason", "");
    }
  }
});

form?.addEventListener("submit", async (event) => {
  if (!validateForm()) {
    event.preventDefault();
    formStatus.textContent = "Please review the highlighted fields and try again.";
    formStatus.style.color = "#b91c1c";
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  formStatus.textContent = "Submitted. I will review your request and contact you soon.";
  formStatus.style.color = "#1d4ed8";
  showToast("Submitted");
  submitButton.textContent = "Sending...";
  setTimeout(() => {
    submitButton.textContent = originalText;
  }, 1800);
});

function animateCounter(node) {
  const target = Number(node.dataset.counter || "0");
  const suffix = node.dataset.suffix || "";
  const duration = 1300;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    node.textContent = `${value}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counterNodes.forEach((node) => counterObserver.observe(node));
