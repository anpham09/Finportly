// import { REGEX_EMAIl, REGEX_PW } from "./constants.js";
// import Validation from "./Validation.js";

const accountForm = document.querySelector("#account-form");
// const emailInput = document.querySelector("#email");
// const passwordInput = document.querySelector("#password");
// const cf_passwordInput = document.querySelector("#cf_password");

accountForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const data = {};
    const formData = new FormData(accountForm);
    for (const [key, value] of formData){
        data[key] = value;
    }
    console.log(data);
}); 