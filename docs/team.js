document.addEventListener("DOMContentLoaded", async () => {
  const employeePhoto = document.getElementById("employee-photo");
  const employeeName = document.getElementById("employee-name");
  const employeeDescription = document.getElementById("employee-description");
  const employeeSignature = document.getElementById("employee-signature");
  const employeeSelectors = document.querySelectorAll(".employee-selector");
  let employees = [];
  let currentIndex = 0;
  let intervalId;

  // Fetch employees data from backend
  const fetchEmployees = async () => {
    const tenantId = "ecf0167ee40f57fc"; // Replace with your tenant ID or fetch dynamically

    try {
      const response = await fetch(
        `https://eclipse.cloudylake.io/api/v1/tenants/${tenantId}/employees`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Chyba při načítání zaměstnanců");
      }

      const data = await response.json();
      if (data && data.data && data.data.employees) {
        employees = data.data.employees.map((employee, index) => ({
          name: employee.name,
          description: employee.description,
          photo: `https://eclipse.cloudylake.io/img/employees/${employee.imageName}`,
          signature: employee.signature,
          index: index, // Add index for selectors
        }));

        updateSelectors(employees);
        changeEmployee(0); // Display the first employee
        startAutoChange();
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Update employee selectors dynamically
  const updateSelectors = (employees) => {
    const selectorContainer = document.querySelector(
      ".employee-selector-container"
    );
    selectorContainer.innerHTML = ""; // Clear existing selectors

    employees.forEach((employee) => {
      const img = document.createElement("img");
      img.src = employee.photo;
      img.alt = employee.name;
      img.className = "object-cover w-16 h-16 rounded-full employee-selector";
      img.setAttribute("data-index", employee.index);
      selectorContainer.appendChild(img);
    });
  };

  // Change employee function
  const changeEmployee = (index) => {
    currentIndex =
      index !== undefined ? index : (currentIndex + 1) % employees.length;

    const employee = employees[currentIndex];
    employeePhoto.src = employee.photo;
    employeeName.textContent = employee.name;
    employeeDescription.textContent = employee.description;
    employeeSignature.textContent = employee.signature;

    // Update selected class
    const selectors = document.querySelectorAll(".employee-selector");
    selectors.forEach((img) => img.classList.remove("selected"));
    if (selectors[currentIndex])
      selectors[currentIndex].classList.add("selected");
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

  // Manual change event listener
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("employee-selector")) {
      const selectedIndex = parseInt(e.target.getAttribute("data-index"), 10);
      stopAutoChange();
      changeEmployee(selectedIndex);
      startAutoChange();
    }
  });

  // Fetch employees data
  await fetchEmployees();
});
