// Funkce pro načtení hodnoty cookie
const getCookie = (name) => {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  return parts.length < 2 ? undefined : parts.pop().split(";").shift();
};

// Funkce pro nastavení cookies
const setCookie = function (name, value, expiryDays, path = "/") {
  const exdate = new Date();
  exdate.setHours(
    exdate.getHours() + (typeof expiryDays !== "number" ? 365 : expiryDays) * 24
  );
  document.cookie =
    name + "=" + value + ";expires=" + exdate.toUTCString() + ";path=" + path;
};

document.addEventListener("DOMContentLoaded", () => {
  fetch("cookies.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("cookie-container").innerHTML = data;

      const $cookiesBanner = document.querySelector(".cookies-eu-banner");
      const $editSection = document.querySelector(".cookies-eu-edit");
      const $acceptButton = $cookiesBanner.querySelector(".accept");
      const $declineButton = $cookiesBanner.querySelector(".decline");
      const $editButton = $cookiesBanner.querySelector(".edit");
      const $saveButton = $editSection.querySelector(".save");
      const $cancelButton = $editSection.querySelector(".cancel");
      const $editLink = document.querySelector(".edit-cookies"); // Nový odkaz ve footeru
      const technicalCookiesCheckbox =
        document.getElementById("technical-cookies");
      const analyticalCookiesCheckbox =
        document.getElementById("analytical-cookies");
      const marketingCookiesCheckbox =
        document.getElementById("marketing-cookies");
      const cookieName = "cookiesBanner";
      const hasCookie = getCookie(cookieName);

      // Funkce pro načtení hodnoty cookies a nastavení checkboxů podle stavu cookies
      const loadCookiesSettings = () => {
        technicalCookiesCheckbox.checked = true; // Technické cookies jsou vždy povoleny a zaškrtnuté
        analyticalCookiesCheckbox.checked =
          getCookie("analyticalCookies") === "true";
        marketingCookiesCheckbox.checked =
          getCookie("marketingCookies") === "true";
      };

      // Zobrazíme cookies lištu, pokud cookie není nastavena
      if (!hasCookie) {
        $cookiesBanner.classList.remove("hidden");
      }

      // Kliknutí na tlačítko "Povolit vše"
      $acceptButton.addEventListener("click", () => {
        setCookie("technicalCookies", "true", 365);
        setCookie("analyticalCookies", "true", 365);
        setCookie("marketingCookies", "true", 365);
        setCookie(cookieName, "true", 365);
        $cookiesBanner.remove();
      });

      // Kliknutí na tlačítko "Odmítnout vše"
      $declineButton.addEventListener("click", () => {
        setCookie("technicalCookies", "true", 365);
        setCookie("analyticalCookies", "false", 365);
        setCookie("marketingCookies", "false", 365);
        setCookie(cookieName, "false", 365);
        $cookiesBanner.remove();
      });

      // Kliknutí na tlačítko "Upravit"
      $editButton.addEventListener("click", () => {
        $cookiesBanner.classList.add("hidden");
        $editSection.classList.remove("hidden");
        loadCookiesSettings(); // Při otevření načteme stav cookies a podle toho nastavíme checkboxy
      });

      // Kliknutí na odkaz ve footeru "Upravit nastavení cookies"
      $editLink.addEventListener("click", (e) => {
        e.preventDefault(); // Zamezíme výchozímu chování odkazu
        $editSection.classList.remove("hidden"); // Zobrazíme edit sekci
        loadCookiesSettings(); // Načteme stav cookies a podle toho nastavíme checkboxy
      });

      // Kliknutí na tlačítko "Uložit nastavení"
      $saveButton.addEventListener("click", () => {
        const analyticalCookies = analyticalCookiesCheckbox.checked;
        const marketingCookies = marketingCookiesCheckbox.checked;

        setCookie("technicalCookies", "true", 365);
        setCookie(
          "analyticalCookies",
          analyticalCookies ? "true" : "false",
          365
        );
        setCookie("marketingCookies", marketingCookies ? "true" : "false", 365);
        setCookie(cookieName, "true", 365);

        $editSection.classList.add("hidden");
      });

      // Kliknutí na tlačítko "Zrušit"
      $cancelButton.addEventListener("click", () => {
        $editSection.classList.add("hidden");
        $cookiesBanner.classList.remove("hidden");
      });
    })
    .catch((error) => console.error("Error loading the cookie banner:", error));
});
