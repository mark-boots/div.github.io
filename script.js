
let utcOffset = 0;

const outputTitleEl = document.querySelector("#output-title");
const outputTimeTextEl = document.querySelector("#output-time-text");
const outputTimeEl = document.querySelector("#output-time");

// inputs
const inputTitle = document.querySelector("#input-title");
const inputTimeText = document.querySelector("#input-time-text");
const inputUTCoffset = document.querySelector("#input-utc-offset")

// colors
const liveTextColor = document.querySelector("#live-text-color");
const liveBackgroundColor = document.querySelector("#live-background-color");

const timeTextColor = document.querySelector("#time-text-color");
const timeBackgroundColor = document.querySelector("#time-background-color");

const titleTextColor = document.querySelector("#title-text-color");
const titleBackgroundColor = document.querySelector("#title-background-color");

[
    inputTitle, 
    inputTimeText, 
    inputUTCoffset, 
    liveTextColor, 
    liveBackgroundColor, 
    timeTextColor, 
    timeBackgroundColor, 
    titleTextColor, 
    titleBackgroundColor
].forEach(el => {
    el.addEventListener("input", updateOptions);
})

getLocalStorage()

function getLocalStorage(){
    const inputValues = JSON.parse(window.localStorage.getItem("localtime")) || {};
    if(inputValues.inputTitle) inputTitle.value = inputValues.inputTitle
    if(inputValues.inputTimeText) inputTimeText.value = inputValues.inputTimeText
    if(inputValues.inputUTCoffset) inputUTCoffset.value = inputValues.inputUTCoffset
    if(inputValues.liveTextColor) liveTextColor.value = inputValues.liveTextColor
    if(inputValues.liveBackgroundColor) liveBackgroundColor.value = inputValues.liveBackgroundColor
    if(inputValues.timeTextColor) timeTextColor.value = inputValues.timeTextColor
    if(inputValues.timeBackgroundColor) timeBackgroundColor.value = inputValues.timeBackgroundColor
    if(inputValues.titleTextColor) titleTextColor.value = inputValues.titleTextColor
    if(inputValues.titleBackgroundColor) titleBackgroundColor.value = inputValues.titleBackgroundColor

    updateOptions()
    calcTime()
}

function updateOptions(e){
    outputTitleEl.innerText = inputTitle.value;
    outputTimeTextEl.innerText = inputTimeText.value;
    utcOffset = Number(inputUTCoffset.value);

    const inputValues = {
        inputTitle: inputTitle.value,
        inputTimeText: inputTimeText.value,
        inputUTCoffset: inputUTCoffset.value,
        liveTextColor: liveTextColor.value,
        liveBackgroundColor: liveBackgroundColor.value,
        timeTextColor: timeTextColor.value,
        timeBackgroundColor: timeBackgroundColor.value,
        titleTextColor: titleTextColor.value,
        titleBackgroundColor: titleBackgroundColor.value
    }
    window.localStorage.setItem("localtime", JSON.stringify(inputValues));

    document.body.style.setProperty("--liveTextColor", liveTextColor.value);
    document.body.style.setProperty("--liveBackgroundColor", liveBackgroundColor.value)
    document.body.style.setProperty("--timeTextColor", timeTextColor.value)
    document.body.style.setProperty("--timeBackgroundColor", timeBackgroundColor.value)
    document.body.style.setProperty("--titleTextColor", titleTextColor.value)
    document.body.style.setProperty("--titleBackgroundColor", titleBackgroundColor.value)
}
console.log({
    test: moment().format("h:mm:ss a")
})
function calcTime() {
    const time = moment().utcOffset(utcOffset * 60).format("h:mm:ss a");
    outputTimeEl.innerText = time.toUpperCase();

    setTimeout(calcTime,100)
}
