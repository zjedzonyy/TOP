
let countEl = document.getElementById("count-el")
let entries = document.getElementById("save-el")

let counter = 0
function increment(){
    counter++;
    countEl.innerText = counter
}

function decrement(){
    counter--;
    countEl.innerText = counter
}


function save(){
    let entry = counter
    entries.innerText += " " + counter + " -"
    counter = 0
    countEl.innerText = counter
}