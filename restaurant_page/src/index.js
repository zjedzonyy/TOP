// index.js
import "./styles.css";
import { greeting } from "./greeting.js";
import loadHomePage from "./loadHomePage.js";
import loadMenuPage from "./loadMenuPage.js";


function addListenersToButtons() {
    const home = document.getElementById("home");
    const menu = document.getElementById("menu");
    const about = document.getElementById("about");
    const content = document.getElementById("content");

    // remove html and style for the content div
    function cleanContent() {
        const styleSheet = document.getElementById("dynamicStyles");
        if (styleSheet) {
            styleSheet.remove();
        }
        content.innerHTML = "";
    }

    console.log(home);
    home.addEventListener("click", () => {
        cleanContent();
        loadHomePage();
    })

    menu.addEventListener("click", () => {
        cleanContent();
        loadMenuPage();
    })
}

addListenersToButtons();