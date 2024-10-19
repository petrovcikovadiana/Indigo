// Scrolling without navigation bar overlapping
document.addEventListener("DOMContentLoaded", function () {
  const navHeight = document.querySelector("nav").offsetHeight;
  const menuLinks = document.querySelectorAll('a[href^="#"]');

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const targetPosition = targetSection.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
