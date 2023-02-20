
console.log(localStorage.getItem("jwt"))
// Make a GET request to the "/api/user" endpoint to get the user's information
fetch("http://localhost:9999/api/user", {
  method: "GET",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("jwt")
  }
})
  // Check if the response was successful (status code in the 200-299 range)
  .then(response => {
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error("Network response was not ok");
      }
    }
    return response.json();
  })
  // Log the result to the console and display the user's information on the profile page
  .then(result => {
    console.log(result);
    const username = result.username;
    document.querySelector("#username").textContent = "Welcome, " + username + "!";
  })
  // Catch any errors that occur during the fetch operation or in a previous then() block
  .catch(error => {
    // Log the error to the console
    console.error("There was a problem with the fetch operation:", error);
  });
