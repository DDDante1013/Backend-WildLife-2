
// function clickboton(){
//   console.log("hiciste click")
// }
// const submit = document.querySelector(".btn-1");
// const cuenta = document.querySelector(".miCuenta");

// submit.addEventListener("click", clickboton);
  // submit.addEventListener("click",()=> {
  //   cuenta.classList.remove("escondido")
  // }) 


// const laCookie = document.cookie     
// .split("; ")
// .find((cookie) => cookie.startsWith("jwt="))
// .slice(4);

const cuenta = document.querySelector(".miCuenta");

const form = document.querySelector(".login")
form.addEventListener("submit", (event)=>{
  event.preventDefault();
cuenta.classList.toggle("escondido", false);
 });
