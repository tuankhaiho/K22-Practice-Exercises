const themeToggleBtn = document.querySelector(".theme-toggle-btn");
const btnText = document.querySelector(".btn-text");
const themeIcon = document.querySelector(".theme-icon-container i");

function updateButton() {
    const isDark = document.documentElement.classList.contains("dark");

    themeIcon.classList.toggle("fa-moon", !isDark);
    themeIcon.classList.toggle("fa-sun", isDark);

    btnText.textContent = isDark ? "Chế độ sáng" : "Chế độ tối";
}

themeToggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    updateButton();
});

updateButton();