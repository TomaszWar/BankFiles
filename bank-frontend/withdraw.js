const formEl = document.querySelector(".withdraw");

formEl.addEventListener('submit', async event => {
    event.preventDefault();

    let formData = new FormData(formEl);
    formData.append("username", sessionStorage.getItem("username"));
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('http://localhost:8080/withdrawFunds', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            window.location.href = "userpage.html";
        } else if (response.status === 401) {
            addAlert("Error", "Insufficent Balance", "error");
        } else if (response.status === 400) {
            addAlert("Error", "Cannot withdraw a negative value", "error")
        } else {
            addAlert("Error", "Something went wrong, please try again", "error");
        }

    } catch (error) {
        console.error('Error during login request:', error);
    }

});