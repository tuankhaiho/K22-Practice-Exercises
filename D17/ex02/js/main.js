const SESSION_KEY = "checkout_draft"; 
const REMEMBER_KEY = "checkout_remembered";
const REMEMBER_FLAG = "checkout_remember_flag"; 

const form = document.getElementById("checkout-form");
const fullnameInput = document.getElementById("fullname");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const addressInput = document.getElementById("address");
const rememberCheckbox = document.getElementById("remember");
const clearBtn = document.getElementById("clear-btn");

function getSessionDraft() {
    try {
        return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || null;
    } catch {
        return null;
    }
}

function saveSessionDraft() {
    const draft = {
        fullname: fullnameInput.value,
        phone: phoneInput.value,
        email: emailInput.value,
        address: addressInput.value,
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(draft));
}

function getRemembered() {
    try {
        return JSON.parse(localStorage.getItem(REMEMBER_KEY)) || null;
    } catch {
        return null;
    }
}

function saveRemembered() {
    const data = {
        fullname: fullnameInput.value,
        phone: phoneInput.value,
        email: emailInput.value,
    };
    localStorage.setItem(REMEMBER_KEY, JSON.stringify(data));
    localStorage.setItem(REMEMBER_FLAG, "1");
}

function clearRemembered() {
    localStorage.removeItem(REMEMBER_KEY);
    localStorage.removeItem(REMEMBER_FLAG);
}

function initForm() {
    const remembered = getRemembered();
    const rememberFlag = localStorage.getItem(REMEMBER_FLAG);

    if (remembered) {
        fullnameInput.value = remembered.fullname || "";
        phoneInput.value = remembered.phone || "";
        emailInput.value = remembered.email || "";
    }
    if (rememberFlag === "1") {
        rememberCheckbox.checked = true;
    }

    const draft = getSessionDraft();
    if (draft) {
        fullnameInput.value = draft.fullname ?? fullnameInput.value;
        phoneInput.value = draft.phone ?? phoneInput.value;
        emailInput.value = draft.email ?? emailInput.value;
        addressInput.value = draft.address ?? "";
    }
}

[fullnameInput, phoneInput, emailInput, addressInput].forEach((input) => {
    input.addEventListener("input", () => {
        saveSessionDraft();
        if (rememberCheckbox.checked) {
            saveRemembered();
        }
    });
});

rememberCheckbox.addEventListener("change", () => {
    if (rememberCheckbox.checked) {
        saveRemembered();
    } else {
        clearRemembered();
    }
});

clearBtn.addEventListener("click", () => {
    const confirmed = confirm(
        "Xóa toàn bộ thông tin đã lưu?",
    );
    if (!confirmed) return;

    sessionStorage.removeItem(SESSION_KEY);
    clearRemembered();

    fullnameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
    addressInput.value = "";
    rememberCheckbox.checked = false;
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Đặt hàng thành công!");
});

document.addEventListener("DOMContentLoaded", initForm);
