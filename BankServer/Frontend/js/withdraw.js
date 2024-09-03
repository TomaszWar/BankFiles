const formEl = document.querySelector(".withdraw");

// Runs when the submit button is pressed
formEl.addEventListener('submit', async event => {
    event.preventDefault();

    let formData = new FormData(formEl);
    formData.append("username", sessionStorage.getItem("username"));
    const data = Object.fromEntries(formData);

    try { // Sends a request to the backend server to withdraw funds from the user
        const response = await fetch('http://localhost:8080/withdrawFunds', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.ok) { // If the request is successful, redirects the user to the main user page
            addAlert("Success", "Withdraw Successful!", "success")
            setTimeout (() => {
                window.location.href = "userpage.html"
            }, 2000);
        } else if (response.status === 401) { // If the withdraw value is more than the user has, prompts user
            addAlert("Error", "Insufficent Balance", "error");
        } else if (response.status === 400) { // If the withdraw value is negative, prompts user
            addAlert("Error", "Cannot withdraw a negative value", "error")
        } else { // If an unexpected error occurs, prompts user to try again
            addAlert("Error", "Something went wrong, please try again", "error");
        }

    } catch (error) { // Logs any unexpected errors
        console.error('Error during login request:', error);
    }

});