let navButton = document.querySelector(".button-menu");
let navMenu = document.querySelector(".nav-link");


navButton.addEventListener("click", ()=> {
    navMenu.classList.toggle("nav-link_visible");
})

let logout = document.querySelector(".logout")
logout.addEventListener("click",() =>{
        document.cookie ='jwt=; Path=/; Expires= Thu, 01 Jan 1900 00:00:01 GMT;';
        document.location.href = "/login"
    })


