function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function openMenu(){
    document.getElementById("MyMenu").style.height = "100%"

    document.querySelector("HOME").addEventListener("click", e => {
        e.preventDefault();
        window.open("home.php", "_self");
    });
}

function closeMenu(){
    document.getElementById("MyMenu").style.height = "0%"
}


function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const resetPasswordForm = document.querySelector("#forgotPassword");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    document.querySelector("#passReset").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        resetPasswordForm.classList.remove("form--hidden");
    });

    document.querySelector("#backToLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        resetPasswordForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login

        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 3) {
                setInputError(inputElement, "Username must be at least 3 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});




//INTERACTING WITH THE DATABASE

const signupForm = document.getElementById("createAccount");

signupForm.addEventListener("submit", (event) => {
    //prevent the default from the submit behaviour
    event.preventDefault();

    //get the form data using the 'FormData' object
    const formData = new FormData(signupForm);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password")


    //ensure that the passwords match before interacting with the server
    if (password !== confirmPassword){
        alert("The passwords do not match. Please try again");
        return;
    }

    //now we error check before creating an instnace
    fetch(`http://localhost:9999/api/auth/checkUsername?username=${username}`)
        .then(response => response.json())
        .then(data => {
            if (data.exists){
                alert("Username already exists, please choose a different username");
                return;
            }
        })


            //if the username does NOT already exist, make a POST request to the /api/auth/signup
            return fetch("http://localhost:9999/api/auth/signup", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password  
                }),
                headers: {
                    "content-type" : "application/json"
                }
            });
        })
        .then(response => {
            if (response && !response.ok){
                //if the response was not okay, throw an error
                throw new Error("Network response was not ok");
            }
            return response ? response.json() : null;
        })
});
.then(result => {
    if (result) {
        console.log(result);
        alert("Sign up successful! Welcome, "+ username + ".");
    }
})
.catch(error => {
    //log the error to the console
    console,error("There was a problem with the fetch operation: ", error);
});

// app.post('/login', async (req, res) => {
//     const { username, password: plainTextPassword, email } = req.body;
//     const method = req.query.method;
  
//     const signupForm = document.getElementById("createAccount");
    
//     // validate the username and password
//     if (!username || typeof username !== 'string' || !plainTextPassword || typeof plainTextPassword !== 'string') {
//         return res.json({ status: 'error', error: 'Invalid username or password' })
//     }

//     if (method === 'login') {
//         // handle login request
//         // ...
//     } else if (method === 'signup') {
//         // handle signup request
//         signupForm.addEventListener("submit", (event) => {
//             //prevent the default from the submit behaviour
//             event.preventDefault();

//             //get the form data using the 'FormData' object
//             const formData = new FormData(signupForm);
//             const username = formData.get("username");
//             const email = formData.get("email");
//             const password = formData.get("password");
//             const confirmPassword = formData.get("confirm_password")


//             //ensure that the passwords match before interacting with the server
//             if (password !== confirmPassword){
//                 alert("The passwords do not match. Please try again");
//                 return;
//             }

//             //now we error check before creating an instnace
//             fetch('http://localhost:9999/api/auth/checkUsername?username=${username}')
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data.exists){
//                         alert("Username already exists, please choose a different username");
//                         return;
//                     }

//                     //if the username does NOT already exist, make a POST request to the /api/auth/signup
//                     return fetch("http://localhost:9999/api/auth/signup", {
//                         method: "POST",
//                         body: JSON.stringify({
//                             username: username,
//                             email: email,
//                             password: password  
//                         }),
//                         headers: {
//                             "content-type" : "application/json"
//                         }
//                     });
//                 })
//                 .then(response => {
//                     if (response && !response.ok){
//                         //if the response was not okay, throw an error
//                         throw new Error("Network response was not ok");
//                     }
//                     return response ? response.json() : null;
//                 })
//         })
//         .then(result => {
//             if (result) {
//                 console.log(result);
//                 alert("Sign up successful! Welcome, "+ username + ".");
//             }
//         })
//         .catch(error => {
//             //log the error to the console
//             console,error("There was a problem with the fetch operation: ", error);
//         });
        
//     } else {
//         return res.json({ status: 'error', error: 'Invalid request method' })
//     }
// })
