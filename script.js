const urlParams = new URLSearchParams(window.location.search);
const loc = (urlParams.get('loc') || "").replace(/\s/g, " ");
const off = Number(urlParams.get('utc') || 0);   
const output = document.querySelector("#output");

calcTime()
function calcTime() {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (3600000 * off));
    const timeString = nd.toLocaleString([], { hour: "2-digit", minute: "2-digit"});
    output.innerText = (loc !== "" ? loc + ": " : "") + timeString
    
    setTimeout(calcTime,1000)
}