import { REGEX_EMAIl, REGEX_PW } from "./constants.js";
import Validation from "./Validation.js";

const accountEye = document.querySelector(".account-eye");
const accountForm = document.querySelector("#account-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const cf_passwordInput = document.querySelector("#cf_password");
const accountErr = document.querySelector(".account-info-error-2");

accountEye.addEventListener("click", () => {
  if (accountEye.className.includes("slash")) {
    password.type = "password";
    accountEye.className = "fa-regular fa-eye account-eye";
  } else {
    password.type = "text";
    accountEye.className = "fa-regular fa-eye-slash account-eye";
  }
});



accountForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {};
  const formData = new FormData(accountForm);
  for (const [key, value] of formData) {
    data[key] = value;
  }
  let chkErr = false;

  const validEmail = new Validation(REGEX_EMAIl);
  const validPw = new Validation(REGEX_PW);
  const validCfPw = new Validation();

  if (!validEmail.chkErr(data.email)) {
    validEmail.showErr(emailInput, "Email wrong 2");
    chkErr = true;
  } else {
    validEmail.hideErr(emailInput);
  }

  if (!validPw.chkErr(data.password)) {
    validPw.showErr(passwordInput, "Password wrong");
    chkErr = true;
  } else {
    validPw.hideErr(passwordInput);
  }

  if (!(data.password == data.cf_password)) {
    validCfPw.showErr(cf_passwordInput, "Password is not match");
    chkErr = true;
  } else {
    validCfPw.hideErr(cf_passwordInput);
  }

  if (!chkErr) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        var user = userCredential.user;
        const accountErr = document.querySelector(".account-info-error-2");
        window.location.href = "../index.html";
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }
});
