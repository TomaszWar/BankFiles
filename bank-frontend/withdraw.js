let errorMessage = document.getElementById("errorMessage");

function toggleError(){
    if(errorMessage.style.display === "none"){
        errorMessage.style.display = "block";
    }else{
        errorMessage.style.display = "none";
    }
}

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
        } else {
            if(errorMessage.style.display === "none") {
                errorMessage.style.display = "block";
            }
        }
    } catch (error) {
        console.error('Error during login request:', error);
        window.location.href = "index.html";
    }

});