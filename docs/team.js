// Data
const employees = [
  {
    name: "Radek",
    description:
      "Radek je zkušený barber s vášní pro klasické pánské střihy a precizní úpravu vousů. Díky své pozornosti k detailu a citlivému přístupu vytváří účesy a vousy, které zaručují stylový a upravený vzhled.",
    photo: "./img/man_11zon.webp",
    signature: "Radek",
  },
  {
    name: "Markéta",
    description:
      "Markéta se holičství věnuje více než 10 let a specializuje se na klasické pánské účesy a precizní úpravu vousů. Její pozornost k detailu a cit pro styl dělají z každého střihu jedinečný zážitek.",
    photo: "./img/woman.webp",
    signature: "Markéta",
  },
  {
    name: "Marky",
    description:
      "Marky se specializuje na moderní střihy a barvení, přičemž vždy přináší styl a kreativitu, které podtrhnou jedinečný vzhled každého klienta.",
    photo: "./img/Marka.webp",
    signature: "Marky",
  },
];

// Choice of HTML elements
const employeePhoto = document.getElementById("employee-photo");
const employeeName = document.getElementById("employee-name");
const employeeDescription = document.getElementById("employee-description");
const employeeSelectors = document.querySelectorAll(".employee-selector");
const employeeSignature = document.getElementById("employee-signature");

let currentIndex = 0;
let intervalId;

// Add 'selected' class to the first image on page load and show the first employee
document.addEventListener("DOMContentLoaded", () => {
  employeeSelectors[0].classList.add("selected");
  changeEmployee(0); // Display the first employee immediately
  startAutoChange(); // Start automatic change after initial display
});

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
  employeeSignature.textContent = employee.signature;

  // Remove 'selected' class from all images
  employeeSelectors.forEach((img) => img.classList.remove("selected"));

  // Add 'selected' class to the current image
  employeeSelectors[currentIndex].classList.add("selected");
};

// Automatic change
const startAutoChange = () => {
  stopAutoChange(); // Clear any existing interval
  intervalId = setInterval(() => changeEmployee(), 5000);
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
