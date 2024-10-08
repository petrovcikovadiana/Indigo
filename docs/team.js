// data
const employees = [
  {
    name: "Petr Petr",
    description:
      "Jan se holičství věnuje více než 10 let a specializuje se na klasické pánské účesy a precizní úpravu vousů. Jeho pozornost k detailu a cit pro styl dělají z každého střihu jedinečný zážitek.",
    photo: "./img/man.jpeg",
  },
  {
    name: "Petr Svoboda",
    description:
      "Petr je odborníkem na moderní pánské účesy a styling. Je znám svou kreativitou a vždy dokáže svým klientům nabídnout nejnovější trendy.",
    photo: "./img/allef.jpg",
  },
  {
    name: "Lucie Dvořáková",
    description:
      "Lucie se specializuje na střihy vousů a pánskou péči o vlasy. Její přístup je vždy přátelský a profesionální.",
    photo: "./img/woman.jpeg",
  },
];

// choice of HTML elements
const employeePhoto = document.getElementById("employee-photo");
const employeeName = document.getElementById("employee-name");
const employeeDescription = document.getElementById("employee-description");
const employeeSelectors = document.querySelectorAll(".employee-selector");

let currentIndex = 0;
let intervalId;

// chamge employee function
// change employee function
const changeEmployee = (index) => {
  // If index is provided, update the current index to that value
  // Otherwise, increment the current index (or wrap around)
  currentIndex =
    index !== undefined ? index : (currentIndex + 1) % employees.length;

  const employee = employees[currentIndex];
  employeePhoto.src = employee.photo;
  employeeName.textContent = employee.name;
  employeeDescription.textContent = employee.description;
};

// automatic change
const startAutoChange = () => {
  // Clear any existing interval to prevent multiple intervals running at the same time
  stopAutoChange();

  // Set a new interval
  intervalId = setInterval(() => changeEmployee(), 15000);
};

// stop automatic change
const stopAutoChange = () => {
  clearInterval(intervalId);
};

// event listener for manual change
employeeSelectors.forEach((selector) => {
  selector.addEventListener("click", (e) => {
    const index = parseInt(e.target.getAttribute("data-index"), 10);

    stopAutoChange(); // stop automatic change
    changeEmployee(index); // switch employee to the clicked one
    startAutoChange(); // restart automatic change
  });
});

// automatic change start after page load
startAutoChange();
