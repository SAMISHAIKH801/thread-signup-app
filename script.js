import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
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
  const userName = document.querySelector("#userName").value;
  const emailInput = document.querySelector("#emailInput").value;
  const passwordInput = document.querySelector("#passwordInput").value;
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, emailInput, passwordInput)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      await updateProfile(auth.currentUser, {
        displayName: userName,
      })
        .then(() => {
          // Profile updated!
          // ...
          const currentUserName = user.displayName;
          sessionStorage.setItem("currentUserName", currentUserName);
          displayAlert("SignUp Successfully", "green");
        })
        .catch((error) => {
          // An error occurred
          // ...
        });
      const currentUserUID = user.uid;
      console.log(currentUserUID);
      sessionStorage.setItem("currentUserUID", currentUserUID);
      setTimeout(() => {
        location.assign("home/home.html");
      }, 2000);
      signupForm.reset();
      // ...
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
