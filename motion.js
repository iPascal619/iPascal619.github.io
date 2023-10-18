// ----Effect in the About section -------------
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname, event) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// -----sideBar navigation for small screen -------------
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}

// -----Fetch Api for getting forms-------------
const scriptURL = "https://script.google.com/macros/s/AKfycbwa5HMYUiq-5LWSplOU6pSOKKRf8ef0O_YY5J1GAl0sQFGkJxMJC2UC9eOEKMrDG1p1eQ/exec"; //Don't copy this link. It's tailored to my google spreadsheet😒
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then((response) => {
            msg.innerHTML = "Message sent successfully!!";
            setTimeout(function () {
                msg.innerHTML = "";
            }, 5000);
            form.reset();
        })
        .catch((error) => console.error("Error!", error.message));
});
