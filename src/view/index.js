const navButton = document.querySelector(".button-menu");
const navMenu = document.querySelector(".nav-link");

navButton.addEventListener("click", ()=> {
    navMenu.classList.toggle("nav-link_visible");
})