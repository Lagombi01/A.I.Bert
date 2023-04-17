// Get both the login and sign-up forms
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

// Attach a submit event listener to the login form
loginForm.addEventListener("submit", (event) => {
  // Prevent the default form submit behavior
  event.preventDefault();

  // Get the form data using the `FormData` object
  const formData = new FormData(loginForm);
  const username = formData.get("username");
  const password = formData.get("password");

  // Make a POST request to the "/api/auth/login" endpoint with the form data
  fetch("http://localhost:9999/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    // Check if the response was successful (status code in the 200-299 range)
    .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Invalid username or password");
          } else {
            throw new Error("Network response was not ok");
          }
        }
        return response.json();
      })
    // Log the result to the console and show an alert
    .then(result => {
      console.log(result);
      alert("Login successful! Welcome, " + username + ".");
      window.location.href = "profile.html";
    })
    // Catch any errors that occur during the fetch operation or in a previous then() block
    .catch(error => {
      // Log the error to the console
      console.error("There was a problem with the fetch operation:", error);
    });
});

// Attach a submit event listener to the sign-up form
signupForm.addEventListener("submit", (event) => {
  // Prevent the default form submit behavior
  event.preventDefault();

  // Get the form data using the `FormData` object
  const formData = new FormData(signupForm);
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm_password");

  // Check if the password and confirm password fields match
  if (password !== confirmPassword) {
    alert("The passwords do not match. Please try again.");
    return;
  }

  // Make a POST request to the "/api/auth/signup" endpoint with the form data
  fetch("http://localhost:9999/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      email: email,
      password: password
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    // Check if the response was successful (status code in the 200-299 range)
    .then(response => {
        if (!response.ok) {
            // If the response was not successful, throw an error
            throw new Error("Network response was not ok");
        }
            return response.json();
    })
    // Log the result to the console and show an alert
    .then(result => {
        console.log(result);
        alert("Sign up successful! Welcome, " + username + ".");
    })
    // Catch any errors that occur during the fetch operation or in a previous then() block
    .catch(error => {
        // Log the error to the console
        console.error("There was a problem with the fetch operation:", error);
        });
    });