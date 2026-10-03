const homeView = document.querySelector("#home-view");
const fingerprintView = document.querySelector("#fingerprint-view");

const statusIcon = document.querySelector("#status-icon");
const statusText = document.querySelector("#status-text");

const elLocation = document.querySelector("#location");
const elBrowser = document.querySelector("#browser");
const elOs = document.querySelector("#os");
const elLanguages = document.querySelector("#languages");
const elScreenSize = document.querySelector("#screen-size");
const elOrientation = document.querySelector("#orientation");

const btnGoToFingerprint = document.querySelector("#goToFingerprint");
const btnGoBack = document.querySelector("#goBack");

const elFingerprintRaw = document.querySelector("#fingerprint-raw");

const systemInfo = {
    location: "Đang lấy tọa độ...",
};

const getOS = function () {
    ua = navigator.userAgent;
    if (ua.includes("Windows")) return "Windows";
    if (ua.includes("Mac")) return "Mac OS";
    if (ua.includes("Linux")) return "Linux";
    if (ua.includes("Android")) return "Android";
    if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
    return "Unknown";
};

const getBrowser = function () {
    ua = navigator.userAgent;
    if (ua.includes("Edge")) return "Microsoft Edge";
    if (ua.includes("Chrome")) return "Google Chrome";
    if (ua.includes("Firefox")) return "Mozilla Firefox";
    if (ua.includes("Safari")) return "Safari";
    return "Unknown";
};

const updateOnlineStatus = function () {
    if (navigator.onLine) {
        statusText.innerText = "Online";
        statusText.className =
            "text-green-700 font-semibold text-sm tracking-wide";
        statusIcon.className =
            "w-3.5 h-3.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] transition-colors duration-300";
    } else {
        statusText.innerText = "Offline";
        statusText.className =
            "text-red-700 font-semibold text-sm tracking-wide";
        statusIcon.className =
            "w-3.5 h-3.5 rounded-full bg-red-500 shadow-[0_0_10px_#22c55e] transition-colors duration-300";
    }
};

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
updateOnlineStatus();

systemInfo.browser = getBrowser();
systemInfo.os = getOS();
systemInfo.languages = navigator.languages.join(", ");
systemInfo.screenSize = `${window.screen.width} x ${window.screen.height}`;
if (screen.orientation) {
    const type = screen.orientation.type;

    if (type.startsWith("portrait")) {
        systemInfo.orientation = "Màn hình dọc";
    } else if (type.startsWith("landscape")) {
        systemInfo.orientation = "Màn hình ngang";
    } else {
        systemInfo.orientation = "Không xác định";
    }
} else {
    systemInfo.orientation = "Không xác định";
}
elBrowser.innerText = systemInfo.browser;
elOs.innerText = systemInfo.os;
elLanguages.innerText = systemInfo.languages;
elScreenSize.innerText = systemInfo.screenSize;
elOrientation.innerText = systemInfo.orientation;

navigator.geolocation.getCurrentPosition(
    (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        systemInfo.location = `${lat}, ${lon}`;
        elLocation.innerText = systemInfo.location;
    },
    (error) => {
        const messages = {
            1: "Bạn đã chặn quyền truy cập vị trí",
            2: "Không xác định được vị trí",
            3: "Hết thời gian lấy vị trí",
        };
        const msg = messages[error.code] || "Không lấy được vị trí";
        systemInfo.location = msg;
        elLocation.innerText = msg;
    },
    { timeout: 10000 },
);

const buildFingerprintString = function (info) {
    return [
        `Location: ${info.location}`,
        `Browser: ${info.browser}`,
        `OS: ${info.os}`,
        `Languages: ${info.languages}`,
        `Screen: ${info.screenSize}`,
        `Orientation: ${info.orientation}`,
    ].join(" | ");
};

const showFingerprintView = function (state) {
    homeView.classList.add("hidden");
    fingerprintView.classList.remove("hidden");
    elFingerprintRaw.innerText = state.fingerprintString;
};

const showHomeView = function () {
    homeView.classList.remove("hidden");
    fingerprintView.classList.add("hidden");
};

const navigateToFingerprint = function () {
    const fingerprintString = buildFingerprintString(systemInfo);
    const state = { fingerprintString };
    history.pushState(state, "Fingerprint Page", "?page=fingerprint");
    showFingerprintView(state);
};

btnGoToFingerprint.addEventListener("click", navigateToFingerprint);
btnGoBack.addEventListener("click", () => history.back());

window.addEventListener("popstate", (event) => {
    if (event.state !== null) {
        showFingerprintView(event.state);
    } else {
        showHomeView();
    }
});
