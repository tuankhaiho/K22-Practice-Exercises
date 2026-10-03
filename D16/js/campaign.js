document.addEventListener("DOMContentLoaded", function () {
    const contentSection = document.querySelector("#campaign-content");
    const alertSection = document.querySelector("#no-params-alert");
    const elUtmSource = document.querySelector("#utm-source");
    const elUtmCampaign = document.querySelector("#utm-campaign");

    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("utm_source");
    const campaign = urlParams.get("utm_campaign");

    if (source !== null || campaign !== null) {
        elUtmSource.innerText = source || "Không có";
        elUtmCampaign.innerText = campaign || "Không có";
        contentSection.classList.remove("hidden");
    } else {
        alertSection.classList.remove("hidden");
    }
});
