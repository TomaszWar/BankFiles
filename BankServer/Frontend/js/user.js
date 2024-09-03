async function getUser(){ // Gets the username of the current user and adds it to the page to be displayed
    const username = sessionStorage.getItem("username");
    document.getElementById("welcome-message").innerHTML += username;

    let url = "http://localhost:8080/api/"
    url += username;

    try { // Sends a request to the backend server to find the current user
        const response = await fetch(url);

        if(response.ok){ // If user is found, displays their balance on the page
            const json = await response.json();
            const balance = json.balance;
    
            document.getElementById("balance").innerHTML += balance;
        }else{ // If user not found, throws an error
            throw new Error("There was an issue loading this page");
        }
    } catch (error) { // Logs any unexpected errors
        console.log(error);
    }
}

function redirectDeposit(){
    window.location.href = "deposit.html";
}

function redirectWithdraw(){
    window.location.href = "withdraw.html";
}

function redirectSettings(){
    window.location.href = "accountsettings.html";
}