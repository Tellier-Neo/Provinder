async function loginUser() {
    const username = document.getElementById('username_input_login').value;
    const password = document.getElementById('password_input_login').value;
    const url = "192.168.64.242:3000/login";

    if (!username && !password) {
        setError('username_input_login', "Aucun nom d'utilisateur entré");
        setError('password_input_login', "Aucun mot de passe entré");
        setStatusMessage("Veuillez remplir tous les champs.");
        return;
    }

    if (!username) {
        setError('username_input_login', "Aucun nom d'utilisateur entré");
        setStatusMessage("Veuillez entrer un nom d'utilisateur.");
        return;
    }
    if (!password) {
        setError('password_input_login', "Aucun mot de passe entré");
        setStatusMessage("Veuillez entrer un mot de passe.");
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        const loginStatus = document.querySelector('.loginstatus');
        if (data.code === "LOGIN_NOT_FOUND" || data.code === "PASSWORD_INCORRECT") {
            loginStatus.style.color = "red";
            loginStatus.style.fontWeight = "bold";
            loginStatus.textContent = data.message;
        } else if (data.code === "LOGIN_SUCCESS") {
            loginStatus.style.color = "green";
            loginStatus.style.fontWeight = "bold";
            loginStatus.textContent = "Connexion réussie !";
        } else {
            loginStatus.style.color = "red";
            loginStatus.style.fontWeight = "bold";
            loginStatus.textContent = "Une erreur inattendue est survenue.";
        }
    } catch (error) {
        alert("Erreur de connexion au serveur");
    }
}

function setError(inputId, message) {
    const input = document.getElementById(inputId);
    input.style.outline = "2px solid red";
    input.title = message;
}

function setStatusMessage(message) {
    const loginStatus = document.querySelector('.loginstatus');
    loginStatus.textContent = message;
    loginStatus.style.color = "red";
    loginStatus.style.fontWeight = "bold";
}