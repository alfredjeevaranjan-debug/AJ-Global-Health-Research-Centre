
import {
  signup,
  login,
  logout,
  resetPassword
} from "./auth.js";

import { auth } from "../firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

let mode = "login";

const form = document.getElementById("authForm");
const section = document.getElementById("authSection");
const message = document.getElementById("authMessage");

function updateForm() {
  const isSignup = mode === "signup";

  document.getElementById("authTitle").textContent =
    isSignup ? "Create Your Account" : "Welcome Back";

  document.getElementById("authSubmit").textContent =
    isSignup ? "Sign Up" : "Login";

  document.getElementById("confirmGroup").hidden = !isSignup;
  document.getElementById("confirmPassword").required = isSignup;
  document.getElementById("forgotPassword").hidden = isSignup;

  document.getElementById("switchAuth").textContent =
    isSignup
      ? "Already have an account? Login"
      : "Don't have an account? Sign Up";
}

window.showAuth = function(type) {
  mode = type;
  form.reset();
  message.textContent = "";
  section.hidden = false;
  updateForm();
};

window.closeAuth = function() {
  section.hidden = true;
};

document.getElementById("switchAuth").addEventListener("click", () => {
  mode = mode === "login" ? "signup" : "login";
  form.reset();
  message.textContent = "";
  updateForm();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("authEmail").value.trim();
  const password = document.getElementById("authPassword").value;
  const button = document.getElementById("authSubmit");

  button.disabled = true;
  message.textContent = "Please wait...";

  try {
    if (mode === "signup") {
      const confirm =
        document.getElementById("confirmPassword").value;

      if (password !== confirm) {
        throw new Error("Passwords do not match.");
      }

      await signup(email, password);
      message.textContent = "Account created successfully!";
    } else {
      await login(email, password);
      message.textContent = "Login successful!";
    }

    setTimeout(() => {
      section.hidden = true;
    }, 1000);

  } catch (error) {
    message.textContent =
      error.code === "auth/email-already-in-use"
        ? "This email is already registered."
        : error.code === "auth/invalid-credential"
        ? "Incorrect email or password."
        : error.message || "Something went wrong.";

  } finally {
    button.disabled = false;
  }
});

document.getElementById("forgotPassword").addEventListener("click", async () => {
  const email = document.getElementById("authEmail").value.trim();

  if (!email) {
    message.textContent = "Enter your email address first.";
    return;
  }

  try {
    await resetPassword(email);
    message.textContent = "Check your email for password reset instructions.";
  } catch {
    message.textContent = "Unable to send password reset email.";
  }
});

window.logout = async function() {
  try {
    await logout();
  } catch (error) {
    alert(error.message);
  }
};

// CHECK LOGIN STATUS AND DISPLAY DASHBOARD

onAuthStateChanged(auth, (user) => {
  const dashboard = document.getElementById("dashboard");
  const buttons = document.querySelector(".account-buttons");

  dashboard.hidden = !user;
  buttons.hidden = !!user;

  if (user) {
    document.getElementById("dashboardEmail").textContent =
      "Logged in as: " + user.email;
  }
});

updateForm();
                                           
