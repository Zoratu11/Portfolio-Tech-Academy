const navbar = document.getElementById("navbar");
const hamburgerMenu = document.getElementById("hamburgerMenu");
hamburgerMenu.addEventListener("click", () => {
    if(navbar.className === "moveLeft") {
        navbar.className = "";
        console.log("does this work? SADFSADFSADFSDAFDSAFASD");
    } else {
        navbar.className = "moveLeft";
        console.log("does this work? in else thing");
    }
});