let usernameMenu = document.getElementById("usernameChange");
let passwordMenu = document.getElementById("passwordChange");

function showHideUsername(){ // Used to display or hide the username change form
    if(usernameMenu.style.display === "none"){
        usernameMenu.style.display = "block";
    }else{
        usernameMenu.style.display = "none";
    }
}

function showHidePassword(){ // Used to display and hide the password change form
    if(passwordMenu.style.display === "none"){
        passwordMenu.style.display = "block";
    }else{
        passwordMenu.style.display = "none";
    }
}

function hideMenus(){ // Used to hide the menus on page load
    usernameMenu.style.display = "none";
    passwordMenu.style.display = "none";
}

const formElUser = document.querySelector(".usernameUpdate");
// Runs when the submit button is pressed
formElUser.addEventListener('submit', async event => {
    event.preventDefault();


    let formData = new FormData(formElUser);
    let newUsername = formData.get("username");
    formData.set("username", sessionStorage.getItem("username"));
    const data = Object.fromEntries(formData);
    try { // Sends a request to the backend server to fetch the user that is currently logged in
        let url = "http://localhost:8080/api/"
        url += formData.get("username");
        const response = await fetch(url);
        const json = await response.json();
        const correctPass = json.password;
        // Checks the ensure the passwor dprovided matches the users account
        if(formData.get("password") === correctPass){
            let updateUrl = "http://localhost:8080/updateUsername/"
            updateUrl += newUsername;
            const updateResponse = await fetch(updateUrl, { // Sends a request the the backend server to update the username of the user
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if(updateResponse.ok){ // If the request works, updates the local username and redirects the user back to the main user page
                sessionStorage.setItem("username", newUsername);
                addAlert("Success", "Username successfully changed", "success")
                setTimeout (() => {
                    window.location.href = "userpage.html"
                }, 2000);
            }else if(updateResponse.status === 409){ // If the new username is taken, prompts user
                addAlert("Error", "Username already taken", "error");
            }else{ // If an unexpected error occurs, prompts user to try again
                addAlert("Error", "Something went wrong, please try again", "error");
            }

        }else{ // If the password does not match, prompts user
            addAlert("Error", "Current password does not match", "error");
        }

    } catch (error) { // Logs any unexpetced errors that occur
        console.error('Error during login request:', error);
    }

});

const formElPass = document.querySelector(".passwordUpdate");
// Runs when the submit button is pressed
formElPass.addEventListener('submit', async event => {
    event.preventDefault();


    let formData = new FormData(formElPass);
    const username = sessionStorage.getItem("username")
    const data = Object.fromEntries(formData);

    try { // Sends a request to fetch the current user
        let url = "http://localhost:8080/api/"
        url += username;
        const response = await fetch(url);
        const json = await response.json();
        const correctPass = json.password;

        // Ensures the current password matches what was provided
        if(formData.get("currentPassword") === correctPass){

            // Ensures the new password matchs the confirmation
            if(formData.get("password") === formData.get("confirmPassword"))
            {
                let updateUrl = "http://localhost:8080/updatePassword/"
                updateUrl += username;
                formData.delete("currentPassword");
                formData.delete("confirmPassword");
                const updatedResponse = await fetch(updateUrl, { //Sends a request to the backend server to update the current users password
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                if(updatedResponse.ok){ // If the request is successful, redirects the user back to the main user page
                    addAlert("Success", "Password successfully changed", "success");
                    setTimeout (() => {
                        window.location.href = "userpage.html"
                    }, 2000);
                }
            }else{ // If the new password and confirmation do not match, prompts the user
                addAlert("Error", "Passwords are not the same", "error")
            } 
        }else{ // If the current password does not match, prompts user
            addAlert("Error", "Current password does not match", "error");
        }

    } catch (error) { // Logs any unexpected errors
        console.error('Error during login request:', error);
    }
});