async function getUser(){
    const username = sessionStorage.getItem("username");
    document.getElementById("welcome-message").innerHTML += username;

    let url = "http://localhost:8080/api/"
    url += username;

    try {
        const response = await fetch(url);

        if(response.ok){

        }else{
            throw new Error("There was an issue loading this page");
        }

        const json = await response.json();
        const balance = json.balance;

        document.getElementById("balance").innerHTML += balance;
    } catch (error) {
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