const formEl = document.querySelector('.logIn');

// Runs when the submit button is pressed
formEl.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);

    try { // Sends a request to the backend server to login the user
        const response = await fetch('http://localhost:8080/loginRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.ok) { // If user is found, redirected to the main user page
            sessionStorage.setItem("username", document.getElementById("username").value);
            addAlert("Success", "Logging you in!", "success");
            setTimeout (() => {
                window.location.href = "userpage.html"
            }, 2000);
        } else if (response.status === 401) {
            addAlert("Error", "Username or password do not match", "error");
        } else {
            addAlert("Error", "Something went wrong, please try again", "error");
        }
    } catch (error) {
        console.error('Error during login request:', error);
    }

});