document.getElementById("accountForm").addEventListener("submit", function (event) {
    event.preventDefault(); // ❌ Prevent form from refreshing

    const fname = document.getElementById("fname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const errorMessage = document.getElementById("errorMessage");
    const modal = document.getElementById("modal");

    // Check if all fields are filled
    if (!fname || !email || !password || !confirmPassword) {
        errorMessage.textContent = "❌ All fields are required!";
        errorMessage.classList.remove("hidden");
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        errorMessage.textContent = "❌ Passwords do not match!";
        errorMessage.classList.remove("hidden");
        return;
    }

    // Hide error message if validation passes
    errorMessage.classList.add("hidden");

    // Show modal (successful account creation)
    modal.classList.remove("hidden");
    modal.classList.add("flex");
});

document.getElementById("closeModal").addEventListener("click", function () {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");

    // ✅ Reset the form
    document.getElementById("accountForm").reset();

    // ✅ Clear password validation messages
    document.getElementById("passwordError").textContent = "";
    document.getElementById("confirmError").textContent = "";
});

// Password strength check
document.getElementById("password").addEventListener("input", function () {
    const password = this.value;
    const passwordError = document.getElementById("passwordError");

    const regex = {
        length: /.{8,}/, // At least 8 characters
        uppercase: /[A-Z]/, // At least 1 uppercase letter
        lowercase: /[a-z]/, // At least 1 lowercase letter
        digit: /[0-9]/, // At least 1 digit
        specialChar: /[\W_]/ // At least 1 special character
    };

    let errors = [];

    if (!regex.length.test(password)) errors.push("At least 8 characters");
    if (!regex.uppercase.test(password)) errors.push("One uppercase letter");
    if (!regex.lowercase.test(password)) errors.push("One lowercase letter");
    if (!regex.digit.test(password)) errors.push("One digit");
    if (!regex.specialChar.test(password)) errors.push("One special character");

    if (errors.length === 0) {
        passwordError.textContent = "✅ Strong password!";
        passwordError.className = "success";
    } else {
        passwordError.textContent = "❌ " + errors.join(", ");
        passwordError.className = "error";
    }
});

// Confirm password check
document.getElementById("confirmPassword").addEventListener("input", function () {
    const password = document.getElementById("password").value;
    const confirmPassword = this.value;
    const confirmError = document.getElementById("confirmError");

    if (confirmPassword === password) {
        confirmError.textContent = "✅ Passwords match!";
        confirmError.className = "success";
    } else {
        confirmError.textContent = "❌ Passwords do not match!";
        confirmError.className = "error";
    }
});

// Display success message on button click
document.getElementById("createAccount").addEventListener("click", function () {
    const message = document.getElementById("message");
    message.textContent = "🎉 Account Created Successfully!";
    message.style.opacity = "1"; // Fades in the message
});
