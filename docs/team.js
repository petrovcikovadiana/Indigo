// Data
const employees = [
  {
    name: "Petr Petr",
    description:
      "Jan se holičství věnuje více než 10 let a specializuje se na klasické pánské účesy a precizní úpravu vousů. Jeho pozornost k detailu a cit pro styl dělají z každého střihu jedinečný zážitek.",
    photo: "./img/man_11zon.webp",
  },
  {
    name: "Petr Svoboda",
    description:
      "Petr je odborníkem na moderní pánské účesy a styling. Je znám svou kreativitou a vždy dokáže svým klientům nabídnout nejnovější trendy.",
    photo: "./img/allef_11zon.webp",
  },
  {
    name: "Lucie Dvořáková",
    description:
      "Lucie se specializuje na střihy vousů a pánskou péči o vlasy. Její přístup je vždy přátelský a profesionální.",
    photo: "./img/woman.webp",
  },
];

// Choice of HTML elements
const employeePhoto = document.getElementById("employee-photo");
const employeeName = document.getElementById("employee-name");
const employeeDescription = document.getElementById("employee-description");
const employeeSelectors = document.querySelectorAll(".employee-selector");

let currentIndex = 0;
let intervalId;

// Change employee function
const changeEmployee = (index) => {
  // If index is provided, update the current index to that value
  // Otherwise, increment the current index (or wrap around)
  currentIndex =
    index !== undefined ? index : (currentIndex + 1) % employees.length;

  const employee = employees[currentIndex];
  employeePhoto.src = employee.photo;
  employeeName.textContent = employee.name;
  employeeDescription.textContent = employee.description;

  // Remove 'selected' class from all images
  employeeSelectors.forEach((img) => img.classList.remove("selected"));

  // Add 'selected' class to the current image
  employeeSelectors[currentIndex].classList.add("selected");
};

// Automatic change
const startAutoChange = () => {
  stopAutoChange(); // Clear any existing interval
  intervalId = setInterval(() => changeEmployee(), 10000);
};

// Stop automatic change
const stopAutoChange = () => {
  clearInterval(intervalId);
};

// Event listener for manual change
employeeSelectors.forEach((selector, index) => {
  selector.addEventListener("click", (e) => {
    const selectedIndex = parseInt(e.target.getAttribute("data-index"), 10);

    stopAutoChange();
    changeEmployee(selectedIndex);

    startAutoChange();
  });
});

// Add 'selected' class to the first image on page load
document.addEventListener("DOMContentLoaded", () => {
  employeeSelectors[0].classList.add("selected");
});

// Automatic change start after page load
startAutoChange();
