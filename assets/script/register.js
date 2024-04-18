async function registerUser() {
    event.preventDefault(); // Empêche le formulaire de se soumettre traditionnellement

    // Récupérer les valeurs des champs
    const username = document.getElementById('username_input_register').value;
    const email = document.getElementById('mail_input').value;
    const name = document.getElementById('name_input').value;
    const overname = document.getElementById('overname_input').value;
    const birthday = document.getElementById('birthdaydate_input').value;
    const password = document.getElementById('password_input_register').value;
    const genre = document.getElementById('genre_select').value;
    const searching = document.getElementById('searching_select').value;

    const url = 'URL_A_DEFINIR'; // Remplacer par l'URL du serveur

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, email, name, overname, birthday, password, genre, searching
            })
        });

        const data = await response.json();

        handleResponse(data);
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        setStatusMessage('Erreur de connexion au serveur.');
    }
}

function handleResponse(data) {
    clearErrors();
    if (data.success) {
        setStatusMessage('Création de compte réussie!');
        return;
    }

    // Traiter les erreurs spécifiques aux champs
    Object.keys(data.errors).forEach(key => {
        setError(key + '_input', data.errors[key]);
    });
}

function setError(inputId, message) {
    const input = document.getElementById(inputId);
    input.style.outline = '2px solid red';
    input.title = message;  // Affichage du message d'erreur en infobulle
}

function clearErrors() {
    const inputs = document.querySelectorAll('.register input, .register select');
    inputs.forEach(input => {
        input.style.outline = '';
        input.title = '';
    });
}

function setStatusMessage(message) {
    const statusDiv = document.querySelector('.accountregister_statut');
    statusDiv.textContent = message;
}