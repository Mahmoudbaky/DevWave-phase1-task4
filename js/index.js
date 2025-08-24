const signUpForm = document.querySelector("#sign-up form");
const loginForm = document.querySelector("#login form");
const errorFields = {
  userNameError: signUpForm.querySelector("#userNameError"),
  emailError: signUpForm.querySelector("#emailError"),
  passwordError: signUpForm.querySelector("#passwordError"),
  emailLoginError: loginForm.querySelector("#emailLoginError"),
  passwordLoginError: loginForm.querySelector("#passwordLoginError"),
  loginError: loginForm.querySelector("#loginError"),
};

const signupFields = [
  signUpForm.querySelector("#signupUserName"),
  signUpForm.querySelector("#signupEmail"),
  signUpForm.querySelector("#signupPassword"),
];

const loginFields = [
  loginForm.querySelector("#loginEmail"),
  loginForm.querySelector("#loginPassword"),
];

//  reset form
const resetForms = (form) => {
  form.reset();
};

//  validate form inputs
const validateFormFields = (fields) => {
  let valid = false;
  let regex;
  fields.forEach((input) => {
    switch (input.id) {
      case "signupUserName":
        regex = /^[a-zA-Z]{3,20}$/;
        if (regex.test(input.value)) {
          errorFields.userNameError.textContent = "";
          errorFields.userNameError.classList.add("hidden");
          errorFields.userNameError.classList.remove("block");
        } else {
          errorFields.userNameError.textContent =
            "username not valid 'must be 3-20 characters with no spaces'";
          errorFields.userNameError.classList.add("block");
          errorFields.userNameError.classList.remove("hidden");
        }
        break;

      case "signupEmail":
        regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (regex.test(input.value)) {
          errorFields.emailError.textContent = "";
          errorFields.emailError.classList.add("hidden");
          errorFields.emailError.classList.remove("block");
        } else {
          errorFields.emailError.textContent = "email not valid";
          errorFields.emailError.classList.add("block");
          errorFields.emailError.classList.remove("hidden");
        }
        break;

      case "signupPassword":
        regex = /^[a-zA-Z0-9]{8,20}$/;
        if (regex.test(input.value)) {
          errorFields.passwordError.textContent = "";
          errorFields.passwordError.classList.add("hidden");
          errorFields.passwordError.classList.remove("block");
        } else {
          errorFields.passwordError.textContent =
            "password not valid 'must be 8-20 characters'";
          errorFields.passwordError.classList.add("block");
          errorFields.passwordError.classList.remove("hidden");
        }
        break;

      case "loginEmail":
        regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (regex.test(input.value)) {
          errorFields.emailLoginError.textContent = "";
          errorFields.emailLoginError.classList.add("hidden");
          errorFields.emailLoginError.classList.remove("block");
        } else {
          errorFields.emailLoginError.textContent = "email not valid";
          errorFields.emailLoginError.classList.add("block");
          errorFields.emailLoginError.classList.remove("hidden");
        }
        break;

      case "loginPassword":
        regex = /^[a-zA-Z0-9]{8,20}$/;
        regex.test(input.value);
        if (regex.test(input.value)) {
          errorFields.passwordLoginError.textContent = "";
          errorFields.passwordLoginError.classList.add("hidden");
          errorFields.passwordLoginError.classList.remove("block");
        } else {
          errorFields.passwordLoginError.textContent =
            "password not valid 'must be 8-20 characters'";
          errorFields.passwordLoginError.classList.add("block");
          errorFields.passwordLoginError.classList.remove("hidden");
        }
        break;

      default:
        break;
    }
  });
  fields.some((input) => input.classList.contains("block"))
    ? (valid = false)
    : (valid = true);
  return valid;
};

// add user to the local storage
const addUser = (inputField) => {
  let emailDublicate = false;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userObject = {
    userName: inputField[0].value,
    email: inputField[1].value,
    password: inputField[2].value,
  };
  emailDublicate = users.some((user) => user.email === userObject.email);
  if (!emailDublicate) {
    users.push(userObject);
    localStorage.setItem("users", JSON.stringify(users));
    resetForms(signUpForm);
  } else {
    errorFields.emailError.textContent = "email already exists";
  }
};

// query user from the local storage
const queryUser = (inputField) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userInput = {
    email: inputField[0].value,
    password: inputField[1].value,
  };
  let foundUser = null;
  users.forEach((user) => {
    if (
      user.email === userInput.email &&
      user.password === userInput.password
    ) {
      foundUser = user;
    }
  });
  foundUser
    ? (errorFields.loginError.textContent = "")
    : (errorFields.loginError.textContent = "email or password is incorrect");
  return foundUser;
};

// handle form submission
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = validateFormFields(signupFields);
  if (isValid) {
    addUser(signupFields);
  }
});

// handle login form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("********here in login form submission **************");
  let isValid = validateFormFields(loginFields);
  let foundUser = null;

  if (isValid) {
    foundUser = queryUser(loginFields);
    console.log(foundUser);
  }
  if (foundUser) {
    localStorage.setItem("loggedUser", JSON.stringify(foundUser));
    window.location.href = "profile.html";
  }
});
