const headerInfor = document.querySelectorAll(".header-infor a");

firebase.auth().onAuthStateChanged((user) => {
  // destructuring
  const [firstInfor, secondInfor] = headerInfor;

  if (user) {
    var uid = user.uid;
    console.log(user);
    firstInfor.textContent = user.email;
    secondInfor.textContent = "Log out";
    secondInfor.addEventListener("click", (e) => {
      e.preventDefault();
      firebase
        .auth()
        .signOut()
    });
  } else {
    firstInfor.textContent = "Sign In";
    firstInfor.setAttribute("href", "../html/signIn.html");
    secondInfor.textContent = "Sign Up";
    secondInfor.setAttribute("href", "../html/signUp.html");
  }
});
