function redirectHome(){
    sleep(2000).then( () => { window.location.href = "userpage.html" });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}