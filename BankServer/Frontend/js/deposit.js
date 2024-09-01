const formEl = document.querySelector(".deposit");

formEl.addEventListener('submit', async event => {
    event.preventDefault();


    let formData = new FormData(formEl);
    formData.append("username", sessionStorage.getItem("username"));
    const data = Object.fromEntries(formData);


    try {
        const response = await fetch('http://localhost:8080/depositFunds', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            window.location.href = "userpage.html";
        } else if(response.status === 401) {
            console.log(response);
            addAlert("Error", "Cannot deposit a negative value", "error");
        }else{
            addAlert("Error", "Something went wrong please try again", "error");
            console.log(response.status)
        }
    } catch (error) {
        console.error('Error during login request:', error);
        // window.location.href = "index.html";
    }

});