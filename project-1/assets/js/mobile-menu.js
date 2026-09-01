document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const hamburgerBtn = header?.querySelector("button.md\\:hidden");
    const desktopNav = header?.querySelector("nav.hidden.md\\:block");

    if (!hamburgerBtn || !desktopNav) return;
    const mobileMenu = document.createElement("div");
    mobileMenu.className =
        "fixed inset-0 bg-colorWhite z-[100] transform translate-x-full transition-transform duration-300 md:hidden flex flex-col overflow-y-auto";

    mobileMenu.innerHTML = `
        <div class="flex items-center justify-between px-5 py-6 bg-beige border-b border-grayBorder">
            <a href="./index.html">
                <img src="${header.querySelector("img")?.src || ""}" class="h-8 object-contain">
            </a>
            <button class="close-btn text-2xl text-primary focus:outline-none hover:text-orangePrimary transition-colors">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        <div class="px-5 py-8 menu-body"></div>
    `;

    const ul = desktopNav.querySelector("ul").cloneNode(true);
    ul.className =
        "flex flex-col gap-6 text-lg font-secondary font-medium text-primary";

    mobileMenu.querySelector(".menu-body").appendChild(ul);
    document.body.appendChild(mobileMenu);

    hamburgerBtn.addEventListener("click", () =>
        mobileMenu.classList.remove("translate-x-full"),
    );
    mobileMenu
        .querySelector(".close-btn")
        .addEventListener("click", () =>
            mobileMenu.classList.add("translate-x-full"),
        );

    ul.querySelectorAll("li").forEach((li) => {
        const link = li.querySelector("a");
        const submenuWrapper = li.querySelector("div");
        const chevron = link?.querySelector("i");

        if (submenuWrapper && chevron) {
            const submenuUl = submenuWrapper.querySelector("ul");
            submenuUl.className =
                "hidden flex-col gap-3 pl-4 mt-4 text-base text-grayDark";

            li.replaceChild(submenuUl, submenuWrapper);

            link.addEventListener("click", (e) => {
                e.preventDefault();
                submenuUl.classList.toggle("hidden");
                submenuUl.classList.toggle("flex");
                chevron.classList.toggle("rotate-180");
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    if (!("ontouchstart" in window || navigator.maxTouchPoints > 0)) return;
    const navLinks = document.querySelectorAll(
        "nav.hidden.md\\:block li.group > a",
    );
    navLinks.forEach((link) => {
        if (link.nextElementSibling?.tagName !== "DIV") return;
        link.addEventListener("click", (e) => {
            if (link.dataset.tapped) return;
            e.preventDefault();
            navLinks.forEach((l) => delete l.dataset.tapped);
            link.dataset.tapped = "true";
        });
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest("nav.hidden.md\\:block li.group")) {
            navLinks.forEach((l) => delete l.dataset.tapped);
        }
    });
});
