let alertCounter = 0;

// Constant set of potenital color schemes for alerts to use
const colorSchemes = {
    error: {
        background: "#e57373",
        text: "#000000",
        border: "#d32f2f"
    },
    success: {
        background: "#81c784",
        text: "#000000",
        border: "#4caf50"
    },
};

// Creates a new alert when requested
const addAlert = (title, message, type) => {
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

// Displays new alerts to the screen.
const showAlert = (newAlert, backgroundColor, textColor, borderColor) => {

    const alertElement = document.createElement("div");
    alertElement.id = `alert-${newAlert.id}`;
    alertElement.className = "alert";

    alertElement.style.backgroundColor = backgroundColor;
    alertElement.style.color = textColor;
    alertElement.style.borderColor = borderColor;

    // Generated the HTML code of the alert to be displayed
    alertElement.innerHTML = `
        <div>${newAlert.title}: ${newAlert.message}</div>
        <button onClick="closeAlert(${newAlert.id})" class = close-button>
            <img src = "x.png" alt = "Close">
        </button>
    `;

    // Adds HTML to page to display the alert
    document.getElementById("alerts-container").appendChild(alertElement);
};

// Handles closing the alerts
const closeAlert = (id) => {
    const alertElement = document.getElementById(`alert-${id}`);

    if(alertElement){
        alertElement.remove();
    }

};