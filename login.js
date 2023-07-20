import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDySQ-sQqqWKROCPyP65YcmRAoIINxMpL0",
  authDomain: "final-thread-app.firebaseapp.com",
  projectId: "final-thread-app",
  storageBucket: "final-thread-app.appspot.com",
  messagingSenderId: "30011220335",
  appId: "1:30011220335:web:d2202197039b4937e8889a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const signupForm = document.querySelector("#signupForm");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = document.querySelector("#emailInput").value;
  const passwordInput = document.querySelector("#passwordInput").value;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, emailInput, passwordInput)
    .then((userCredential) => {
      // Signed in
      displayAlert("Login Successfully", "green");
      const user = userCredential.user;
      console.log(user);
      const currentUserUID = user.uid;
      const currentUserName = user.displayName;
      sessionStorage.setItem("currentUserUID", currentUserUID);
      sessionStorage.setItem("currentUserName", currentUserName);
      setTimeout(() => {
        location.assign("home/home.html");
      }, 2000);
      // ...
      signupForm.reset();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      displayAlert(errorMessage, "red");
      // ..
    });
});
const alertBox = document.querySelector("#alertBox");
const displayAlert = (txt, clss) => {
  alertBox.textContent = txt;
  alertBox.classList.add(clss);
  // remove alert
  setTimeout(() => {
    alertBox.textContent = "";
    alertBox.classList.remove(clss);
  }, 2000);
};
