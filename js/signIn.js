const accountEye = document.querySelector(".account-eye");
const password = document.querySelector("#password");
const accountForm = document.querySelector("#account-form");
const emailInput = document.querySelector("#email");
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

  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      return firebase.auth().signInWithEmailAndPassword(emailInput.value, password.value);
    })
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      accountErr.style.visibility = "hidden";
      window.location.href = "../index.html";
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      accountErr.style.visibility = "visible";
    });
});