const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const subjectInput = document.querySelector("#subject");
const messageInput = document.querySelector("#message");

const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const phoneError = document.querySelector("#phone-error");
const subjectError = document.querySelector("#subject-error");
const messageError = document.querySelector("#message-error");

const contactForm = document.querySelector("#contact-form");
const successBox = document.querySelector(".contact-success");

const emailRegEx = /\S+@\S+\.\S+/;

function resetErrorMessages() {
    nameError.innerText = "";
    emailError.innerText = "";
    phoneError.innerText = "";
    subjectError.innerText = "";
    messageError.innerText = "";
}

contactForm.addEventListener("submit", (event) => {

    resetErrorMessages();
    successBox.classList.remove("d-block");
    successBox.classList.add("d-none");

    let error = false;

    if (nameInput.value.length < 6) {
        error = true;
        nameError.innerText = "Your name must be more than 5 characters long.";
    }

    if (emailInput.value === "" || !emailRegEx.test(emailInput.value)) {
        error = true;
        emailError.innerText = "Please provide a valid e-mail address";
    }

    if (phoneInput.value.toString().length < 8) {
        error = true;
        phoneError.innerText = "Your phone number must be at least 8 digits long.";
    }

    if (subjectInput.value.length < 16) {
        error = true;
        subjectError.innerText = "The subject must be more than 15 characters long.";
    }

    if (messageInput.value.length < 26) {
        error = true;
        messageError.innerText = "The message must be longer than 25 characters.";
    }

    if (!error) {
        // Show a success message
        successBox.classList.remove("d-none");
        successBox.classList.add("d-block");
    }

    event.preventDefault();
});
