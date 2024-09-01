const formEl = document.querySelector('.logIn');

formEl.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('http://localhost:8080/loginRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            sessionStorage.setItem("username", document.getElementById("username").value);
            window.location.href = "successfulrequest.html";
        } else if (response.status === 401) {
            addAlert("Error", "Username or password do not match", "error");
        } else {
            addAlert("Error", "Something went wrong, please try again", "error");
        }
    } catch (error) {
        console.error('Error during login request:', error);
        window.location.href = "index.html";
    }

});