const urlParams = new URLSearchParams(window.location.search);
const title = (urlParams.get('title') || "").replaceAll("_", " ");
const off = Number(urlParams.get('utc') || 0);
const text = urlParams.get('text') || "";
const bg = urlParams.get('bg') || "";

if(text!=="" && isHexColor(text)) document.body.style.setProperty("--text", "#" + text )
if(bg!=="" && isHexColor(bg)) document.body.style.setProperty("--bg", "#" + bg )

const output = document.querySelector("#output");


calcTime()
function calcTime() {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (3600000 * off));
    const timeString = nd.toLocaleString([], { hour: "numeric", minute: "2-digit"});
    output.innerHTML = (title !== "" ? title + "<br>" : "") + "Local Time: " + timeString
    
    setTimeout(calcTime,1000)
}

function isHexColor(hex){
    return /^[0-9A-F]{6}$/i.test(hex);
}