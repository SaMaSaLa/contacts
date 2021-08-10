const conFormEl = document.getElementById("contact-form");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const phoneEl = document.getElementById("phone");

// Functions for local storage
const getContactsFromLocalStorage = () => {
  const contactsString = localStorage.getItem("contacts");
  const contacts = JSON.parse(contactsString);
  if (contacts === null) {
    return [];
  } else {
    return contacts;
  }
};

const saveContactsInLocalStorage = (contacts) => {
  localStorage.setItem("contacts", JSON.stringify(contacts));
};

const saveContactInLocalStorage = (contact) => {
  const contacts = getContactsFromLocalStorage();
  contacts.push(contact);
  saveContactsInLocalStorage(contacts);
};

const removeAllContactsInLocalStorage = () => {
  localStorage.clear();
};

const deleteContactInLocalStorage = (contactIndex) => {
  const contacts = getContactsFromLocalStorage();
  contacts.splice(contactIndex, 1);
  saveContactsInLocalStorage(contacts);
};

// For Rendering
const renderContactsFromLocalStorage = () => {
  const contacts = getContactsFromLocalStorage();
  // Empty contacts list
  const contactsEl = document.getElementById("contacts");
  contactsEl.innerText = "";

  // Create OL element
  const olEl = document.createElement("ol");
  contactsEl.appendChild(olEl);

  // Iterate on Contacts
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    // Add each contact
    const liEl = document.createElement("li");
    liEl.textContent = `
    ${contact.name} 
    (
      ${contact.email || "No Email"} / 
      ${contact.phone || "No Phone"}
      )
      `;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Contact";
    deleteButton.setAttribute("data-index", i);
    liEl.appendChild(deleteButton);

    olEl.appendChild(liEl);
  }

  if (contacts.length === 0) {
    const liEl = document.createElement("li");
    liEl.textContent = `No contacts found.`;
    olEl.appendChild(liEl);
  }
};

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

  // First save contact in local storage
  saveContactInLocalStorage({
    name,
    email,
    phone,
  });

  // Empty form
  const form = document.getElementById("contact-form");
  form.reset();

  // Render contacts from local storage
  renderContactsFromLocalStorage();
});

// Remove all
(function () {
  const removeAllButton = document.getElementById("remove-all");
  removeAllButton.addEventListener("click", () => {
    removeAllContactsInLocalStorage();
    renderContactsFromLocalStorage();
  });
})();

// Make sure to put the cursor in name element
nameEl.focus();

let contactsEl = document.getElementById("contacts");
contactsEl.addEventListener("click", (e) => {
  if (e.target.textContent === "Delete Contact") {
    let dataIndex = e.target.getAttribute("data-index");
    deleteContactInLocalStorage(dataIndex);
    renderContactsFromLocalStorage();
  }
});

// On the first load, make sure to render current contacts
renderContactsFromLocalStorage();
