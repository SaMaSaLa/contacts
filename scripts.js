const conFormEl = document.getElementById("contact-form");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const phoneEl = document.getElementById("phone");

const hideError = () => {
  const errorEl = document.getElementById("error");
  errorEl.style.display = "none";
};

const showError = (error) => {
  const errorEl = document.getElementById("error");
  errorEl.style.display = "block";
  errorEl.textContent = error;
};

const validateInput = (name, email, phone) => {
  hideError();

  if (name !== "" && (email !== "" || phone !== "")) {
    return true;
  } else {
    showError("Name and (email or phone) are mandatory!");
    return false;
  }
};



conFormEl.addEventListener("submit", (e) => {
  // Stop submitting the form
  e.preventDefault();

  // Get input values
  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const phone = phoneEl.value.trim();

  // Validate input
  const isInputValid = validateInput(name, email, phone);
  if (!isInputValid) {
    return;
  }

  // Input is valid
  console.log("Do next!");
});

// Make sure to put the cursor in name element
nameEl.focus();
