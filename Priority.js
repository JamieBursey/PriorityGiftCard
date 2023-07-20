const tableHeader = ["Name", "Therapist", "Treatment", "Date", "Price", "Number", "Claimed"];
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
    const tableRow = document.createElement("tr");

    tableHeader.forEach((item, index) => {
        const tableData = document.createElement("td");
        tableData.classList.add("table-data");
        const dataInput = document.createElement("input");
        dataInput.type = "text";
        dataInput.classList.add("data-input");
        if (index === tableHeader.length - 4) {
            dataInput.type = "date"
        }
        tableData.appendChild(dataInput);
        tableRow.appendChild(tableData);
        if (index === tableHeader.length - 1) {
            dataInput.style.display = "none"
            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            deleteButton.addEventListener("click", () => {
                if (confirm("Are you sure you want to delete this row?")) {
                    tableElement.removeChild(tableRow);
                    const rowIndex = tableRow.rowIndex - 1;
                    inputDataArray.splice(rowIndex, 1);
                    updateLocalStorage();
                }
            });
            tableData.appendChild(deleteButton);
        } else {
            dataInput.value = values[index] || "";
            dataInput.addEventListener("input", () => {
                updateLocalStorage(tableRow.rowIndex - 1, getRowInputValues(tableRow));
            });
        }
    });
    tableElement.appendChild(tableRow);
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
const inputUserName = document.createElement("input");
inputUserName.type = "text";
inputUserName.placeholder = "User Name";
const inputPassword = document.createElement("input");
inputPassword.type = "password";
inputPassword.placeholder = "Password";
const loginSubmit = document.createElement("button");
loginSubmit.innerHTML = "Submit";
loginForm.appendChild(inputUserName);
loginForm.appendChild(inputPassword);
loginForm.appendChild(loginSubmit);

loginSubmit.onclick = (event) => {
    event.preventDefault();

    if (inputUserName.value === "test" && inputPassword.value === "test") {
        tableElement.style.pointerEvents = "auto";
        addRowButton.disabled = false;

        const storedData = localStorage.getItem("datainput");
        inputDataArray = storedData ? JSON.parse(storedData) : [];

        while (tableElement.firstChild) {
            tableElement.firstChild.remove();
        }

        tableElement.appendChild(headerRow);

        inputDataArray.forEach((item) => {
            addRow(item);
        });
    }
};

const updateLocalStorage = (index, value) => {
    inputDataArray[index] = value;
    localStorage.setItem("datainput", JSON.stringify(inputDataArray.filter(Boolean)));
};

const getRowInputValues = (row) => {
    const inputElements = row.getElementsByClassName("data-input");
    const values = [];
    for (let i = 0; i < inputElements.length; i++) {
        values.push(inputElements[i].value);
    }
    return values;
};

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("datainput") && localStorage.getItem("loggedIn") === "true") {
        inputUserName.value = "test";
        inputPassword.value = "test";
        loginSubmit.click();
    } else {

        while (tableElement.firstChild) {
            tableElement.firstChild.remove();
        }
    }
});


