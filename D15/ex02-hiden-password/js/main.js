const passwordInput = document.querySelector("#password");
const toggleBtn = document.querySelector("#toggle-btn");
const toggleIcon = document.querySelector("#toggle-btn i");

toggleBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    toggleIcon.classList.toggle("fa-eye", !isHidden);
    toggleIcon.classList.toggle("fa-eye-slash", isHidden);
});
