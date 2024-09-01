const formEl = document.querySelector('.form');

formEl.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);

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
    } else {
        balanceError.style.display = "block";
    }
});