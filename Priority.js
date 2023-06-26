const tableHeader = ["Name", "Treatment", "Price", "Claimed"];
const tableElement = document.getElementById("tableElement");

const headerRow = document.createElement("tr");
tableElement.appendChild(headerRow);

tableHeader.forEach((item) => {
    const header = document.createElement("th");
    header.classList.add("table-header")
    header.innerHTML = item;
    headerRow.appendChild(header);
});


