const formEl = document.querySelector(".deposit");

// Runs when the submit button is pressed
formEl.addEventListener('submit', async event => {
    event.preventDefault();


    let formData = new FormData(formEl);
    formData.append("username", sessionStorage.getItem("username"));
    const data = Object.fromEntries(formData);


    try { // Sends a request to the backend server to deposit funds to an account
        const response = await fetch('http://localhost:8080/depositFunds', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            addAlert("Success", "Deposit Successful", "success");
            setTimeout (() => {
                window.location.href = "userpage.html"
            }, 2000);
        } else if(response.status === 401) { // If a negative value was requested, prompts user
            console.log(response);
            addAlert("Error", "Cannot deposit a negative value", "error");
        }else{ // If an unexpected error occured, prompts user
            addAlert("Error", "Something went wrong please try again", "error");
            console.log(response.status)
        }
    } catch (error) {
        console.error('Error during login request:', error);
    }

});