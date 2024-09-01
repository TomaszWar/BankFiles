let usernameMenu = document.getElementById("usernameChange");
let passwordMenu = document.getElementById("passwordChange");

function showHideUsername(){
    if(usernameMenu.style.display === "none"){
        usernameMenu.style.display = "block";
    }else{
        usernameMenu.style.display = "none";
    }
}

function showHidePassword(){
    if(passwordMenu.style.display === "none"){
        passwordMenu.style.display = "block";
    }else{
        passwordMenu.style.display = "none";
    }
}

function hideMenus(){
    usernameMenu.style.display = "none";
    passwordMenu.style.display = "none";
}

const formElUser = document.querySelector(".usernameUpdate");

formElUser.addEventListener('submit', async event => {
    event.preventDefault();


    let formData = new FormData(formElUser);
    let newUsername = formData.get("username");
    formData.set("username", sessionStorage.getItem("username"));
    const data = Object.fromEntries(formData);
    try {
        let url = "http://localhost:8080/api/"
        url += formData.get("username");
        const response = await fetch(url);
        const json = await response.json();
        const correctPass = json.password;

        if(formData.get("password") === correctPass){
            let updateUrl = "http://localhost:8080/updateUsername/"
            updateUrl += newUsername;
            console.log(updateUrl)
            const updateResponse = await fetch(updateUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if(updateResponse.ok){
                sessionStorage.setItem("username", newUsername);
                addAlert("Success", "Username successfully changed", "success")
                setTimeout (() => {
                    window.location.href = "userpage.html"
                }, 2000);
            }else if(updateResponse.status === 409){
                addAlert("Error", "Username already taken", "error");
            }else{
                addAlert("Error", "Something went wrong, please try again", "error");
            }

        }else{
            addAlert("Error", "Current password does not match", "error");
        }

    } catch (error) {
        console.error('Error during login request:', error);
        window.location.href = "index.html";
    }

});

const formElPass = document.querySelector(".passwordUpdate");

formElPass.addEventListener('submit', async event => {
    event.preventDefault();


    let formData = new FormData(formElPass);
    const username = sessionStorage.getItem("username")
    const data = Object.fromEntries(formData);

    try {
        let url = "http://localhost:8080/api/"
        console.log(username);
        url += username;
        const response = await fetch(url);
        const json = await response.json();
        const correctPass = json.password;

        console.log("CurrentPass", formData.get("currentPassword"));
        console.log("Correctpass", correctPass);

        if(formData.get("currentPassword") === correctPass){

            if(formData.get("password") === formData.get("confirmPassword"))
            {
                let updateUrl = "http://localhost:8080/updatePassword/"
                updateUrl += username;
                formData.delete("currentPassword");
                formData.delete("confirmPassword");
                const updatedResponse = await fetch(updateUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                if(updatedResponse.ok){
                    addAlert("Success", "Password successfully changed", "success");
                    window.location.href = "userpage.html"
                }
            }
        }else{
            addAlert("Error", "Current password does not match", "error");
        }

    } catch (error) {
        console.error('Error during login request:', error);
    }
});