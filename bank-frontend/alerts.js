let alertCounter = 0;

const colorSchemes = {
    error: {
        background: "#e57373",
        text: "#000000",
        border: "#d32f2f"
    },
};

const addAlert = (title, message, type) => {
    console.log("addAlert: ", title, message, type);
    const {background, text, border} = colorSchemes[type?.toLowerCase()] || {
        background: "teal",
        text: "black",
        border: "black",
    };

    const newAlert = {
        id: alertCounter++,
        title: title,
        message: message,
    };

    showAlert(newAlert, background, text, border);
}

const showAlert = (newAlert, backgroundColor, textColor, borderColor) => {
    console.log("showAlert: ", newAlert, backgroundColor, textColor, borderColor);

    const alertElement = document.createElement("div");
    alertElement.id = `alert-${newAlert.id}`;
    alertElement.className = "alert";

    const beforeElementAlert = alertElement.cloneNode(true);

    console.log("beforeAlertElement: ", beforeElementAlert);

    alertElement.style.backgroundColor = backgroundColor;
    alertElement.style.color = textColor;
    alertElement.style.borderColor = borderColor;

    alertElement.innerHTML = `
        <div>${newAlert.title}: ${newAlert.title}</div>
        <button onClick="closeAlert(${newAlert.id})" class = closeButton>
            <img src = "x.png" alt = "Close" width = "8" height = "8">
        </button>
    `;

    console.log("AfterAkertElement: ", alertElement);

    document.getElementById("alerts-container").appendChild(alertElement);
};

const closeAlert = (id) => {
    const alertElement = document.getElementById(`alert-${id}`);

    if(alertElement){
        alertElement.remove();
    }

};