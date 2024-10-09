// scrolling without navigation bar overlapping
document.addEventListener("DOMContentLoaded", function () {
  const navHeight = document.querySelector("nav").offsetHeight;
  const menuLinks = document.querySelectorAll('a[href^="#"]'); // Všechny odkazy na kotvy

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Zabrání základnímu chování

      const targetId = this.getAttribute("href").substring(1); // Získání ID cílové sekce
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const targetPosition = targetSection.offsetTop - navHeight; // Odsazení s ohledem na výšku navigace

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth", // Plynulé scrollování
        });
      }
    });
  });
});
