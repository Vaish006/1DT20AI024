const numbersList = document.getElementById("numbers");
const numberInput = document.getElementById("numberInput");

function addNumber() {
    const number = Number(numberInput.value);
    if (!isNaN(number)) {
        const listItem = document.createElement("li");
        listItem.textContent = number;
        numbersList.appendChild(listItem);
        numberInput.value = "";
    }
}