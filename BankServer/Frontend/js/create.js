const formEl = document.querySelector('.form');

// Runs when the submit button is pressed
formEl.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);

    // Checks to ensure a negative starting balacne is not requested
    if(formData.get("balance") > 0){
        const response = await fetch('http://localhost:8080/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            window.location.href = "index.html";
        } else {
            addAlert("Error", "Username already taken", "error");
        }
    } else { // If a negative balance is requested adds a new alert to the screen to request a positive balance from user
        addAlert("Error", "Cannot start with a negative balance", "error");
    }
});