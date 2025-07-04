const STORAGE_KEY = "feedback-form-state";
const form = document.querySelector(".feedback-form");
let formData = {
  email: "",
  message: "",
};

  form.addEventListener("input", onFormInput);
  form.addEventListener("submit", handleSubmit);
  populateForm();
  // Save the form data to localStorage
  function onFormInput(event) {
    const { name, value } = event.target;

  if (name === "email" || name === "message") {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }

  
  //  Submit button / reset
  function handleSubmit(event) {
    event.preventDefault();
    
    const { email, message } = formData;
    
    if (email === "" || message === "") {
    alert("Fill please all fields");
    return;
  }
  console.log(formData);

    form.reset();
    localStorage.removeItem(STORAGE_KEY);
    formData = {
      email: "",
      message: "",
    };
  }

  // fill the form
  function populateForm() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return;
    
    try {
        const parsedData = JSON.parse(savedData);

    if (parsedData.email) {
      form.elements.email.value = parsedData.email;
      formData.email = parsedData.email;
    }

    if (parsedData.message) {
      form.elements.message.value = parsedData.message;
      formData.message = parsedData.message;
    }
  } catch (err) {
    console.error("Error parsing localStorage data:", err);
  }
}