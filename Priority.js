const tableHeader = ["Name", "Treatment", "Numer", "Price", "Claimed"];
const tableElement = document.getElementById("tableElement");

const headerRow = document.createElement("tr");
tableElement.appendChild(headerRow);

tableHeader.forEach((item) => {
    const header = document.createElement("th");
    header.classList.add("table-header")
    header.innerHTML = item;
    headerRow.appendChild(header);

});

const addRow = () => {
    const tableRow = document.createElement("tr")

    tableHeader.forEach(() => {
        const tableData = document.createElement("td")
        tableData.classList.add("table-data")
        const dataInput = document.createElement("input")
        dataInput.type = "text"
        dataInput.classList.add("data-input")
        tableData.appendChild(dataInput)
        tableRow.appendChild(tableData)
    })
    tableElement.appendChild(tableRow)
}

const addRowButton = document.getElementById("addRow")
addRowButton.innerHTML = "Add Row"
addRowButton.onclick = () => {
    addRow()
}
