const errorMessage = document.getElementById("errorMessage");

function toggleError(){
    if(errorMessage.style.display === "none"){
        errorMessage.style.display = "block";
    }else{
        errorMessage.style.display = "none";
    }
}

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
        } else {
            if(errorMessage.style.display === "none")
            {
                toggleError();
            }
        }
    } catch (error) {
        console.error('Error during login request:', error);
        window.location.href = "index.html";
    }

});