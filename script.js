let utcOffset = 0;

const outputTitleEl = document.querySelector("#output-title");
const outputTimeTextEl = document.querySelector("#output-time-text");
const outputTimeEl = document.querySelector("#output-time");

const inputTitle = document.querySelector("#input-title");
const inputTimeText = document.querySelector("#input-time-text");
const inputUTCoffset = document.querySelector("#input-utc-offset")
const inputTextColor = document.querySelector("#input-text-color");
const inputBackgroundColor = document.querySelector("#input-background-color");


inputTitle.addEventListener("keyup", updateOptions);
inputTimeText.addEventListener("keyup", updateOptions);
inputUTCoffset.addEventListener("keyup", updateOptions);
inputTextColor.addEventListener("change", updateOptions);
inputBackgroundColor.addEventListener("change", updateOptions);


getLocalStorage()

function getLocalStorage(){
    const inputValues = JSON.parse(window.localStorage.getItem("inputValues")) || {};
    if(inputValues.inputTitle) inputTitle.value = inputValues.inputTitle
    if(inputValues.inputTimeText) inputTimeText.value = inputValues.inputTimeText
    if(inputValues.inputUTCoffset) inputUTCoffset.value = inputValues.inputUTCoffset
    if(inputValues.inputTextColor) inputTextColor.value = inputValues.inputTextColor
    if(inputValues.inputBackgroundColor) inputBackgroundColor.value = inputValues.inputBackgroundColor

    updateOptions()
    calcTime()
}

function updateOptions(e){
    outputTitleEl.innerText = inputTitle.value;
    outputTimeTextEl.innerText = inputTimeText.value;
    utcOffset = Number(inputUTCoffset.value);
    document.body.style.setProperty("--output-text-color", inputTextColor.value)
    document.body.style.setProperty("--output-background-color", inputBackgroundColor.value);
    const inputValues = {
        inputTitle: inputTitle.value,
        inputTimeText: inputTimeText.value,
        inputUTCoffset: inputUTCoffset.value,
        inputTextColor: inputTextColor.value,
        inputBackgroundColor: inputBackgroundColor.value
    }
    window.localStorage.setItem("inputValues", JSON.stringify(inputValues));
}

function calcTime() {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (3600000 * utcOffset));
    const timeString = nd.toLocaleString([], { hour: "numeric", minute: "2-digit"});
    outputTimeEl.innerText = timeString
    
    setTimeout(calcTime,1000)
}
