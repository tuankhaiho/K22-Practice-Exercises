const mainImage = document.querySelector("#main-image");
const thumbnails = document.querySelectorAll(".thumbnail");
thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
        mainImage.src = thumb.src;
        mainImage.alt = thumb.alt;
        thumbnails.forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");
    });
});