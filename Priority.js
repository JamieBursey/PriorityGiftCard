const tableHeader = ["Name", "Therapist", "Date", "Value", "Number", "Claimed", "Delete"];
const tableElement = document.getElementById("tableElement");
let inputDataArray = [];

const headerRow = document.createElement("tr");
tableElement.appendChild(headerRow);

tableHeader.forEach((item) => {
    const header = document.createElement("th");
    header.classList.add("table-header");
    header.innerHTML = item;
    headerRow.appendChild(header);
});

const addRow = (values) => {
    const tableRowObject = {}
    tableHeader.forEach((item, index) => {
        tableRowObject[item] = values[index] || "";
    });
    inputDataArray.push(tableRowObject);
    renderRows();
    updateLocalStorage();
};

const deleteRow = (index) => {
    inputDataArray.splice(index, 1);
    renderRows();
    updateLocalStorage();
};

const renderRows = () => {
    while (tableElement.firstChild) {
        tableElement.firstChild.remove();
    }
    tableElement.appendChild(headerRow);

    inputDataArray.forEach((rowData, index) => {
        const tableRow = document.createElement("tr");
        tableRow.setAttribute("data-row-id", index);

        tableHeader.forEach((item, columnIndex) => {
            const tableData = document.createElement("td");
            tableData.classList.add("table-data");

            if (item === "Delete") {
                const deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Delete";
                deleteButton.onclick = () => {
                    if (confirm("Are you sure you want to delete this row?")) {
                        deleteRow(index);
                    }
                };
                tableData.appendChild(deleteButton);
            } else {
                const dataInput = document.createElement("input");
                dataInput.type = "text";
                dataInput.classList.add("data-input");
                if (item === "Date") {
                    dataInput.type = "date";
                }
                tableData.appendChild(dataInput);
                dataInput.value = rowData[item];
                dataInput.addEventListener("input", () => {
                    rowData[item] = dataInput.value;
                    updateLocalStorage();
                });
            }

            tableRow.appendChild(tableData);
        });

        tableElement.appendChild(tableRow);
    });
};


const addRowButton = document.getElementById("addRow");
addRowButton.innerHTML = "Add Row";
addRowButton.onclick = () => {
    addRow([]);
};

addRowButton.disabled = true;
tableElement.style.pointerEvents = "none";
const logInDiv = document.getElementById("login-div");
const loginForm = document.getElementById("login-form");
const inputPin = document.createElement("input");
inputPin.type = "text";
inputPin.placeholder = "Password";
const loginSubmit = document.createElement("button");
loginSubmit.innerHTML = "Submit";
loginForm.appendChild(inputPin);
loginForm.appendChild(loginSubmit);

loginSubmit.onclick = (event) => {
    event.preventDefault();

    if (inputPin.value === "072021") {
        tableElement.style.pointerEvents = "auto";
        addRowButton.disabled = false;

        const storedData = localStorage.getItem("datainput");
        inputDataArray = storedData ? JSON.parse(storedData) : [];

        renderRows();
    }
};

const updateLocalStorage = () => {
    localStorage.setItem("datainput", JSON.stringify(inputDataArray));
};

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("datainput") && localStorage.getItem("loggedIn") === "true") {
        inputPin.value = "072021";
        loginSubmit.click();
    }
});



