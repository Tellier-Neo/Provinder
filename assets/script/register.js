async function registerUser() {
    event.preventDefault();

    console.log("Début de l'inscription...");

    const username = document.getElementById('username_input_register').value;
    const email = document.getElementById('mail_input').value;
    const name = document.getElementById('name_input').value;
    const overname = document.getElementById('overname_input').value;
    const birthday = document.getElementById('birthdaydate_input').value;
    const password = document.getElementById('password_input_register').value;
    const genre = document.getElementById('genre_select').value === "man" ? 1 : 2;
    const searching = document.getElementById('searching_select').value === "man" ? 1 : 
                      document.getElementById('searching_select').value === "woman" ? 2 : 3;

    console.log("Valeurs récupérées depuis les champs du formulaire :");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Name:", name);
    console.log("Overname:", overname);
    console.log("Birthday:", birthday);
    console.log("Password:", password);
    console.log("Genre:", genre);
    console.log("Searching:", searching);

    // Vérification côté client pour s'assurer que tous les champs sont remplis
    if (!username || !email || !name || !overname || !birthday || !password) {
        console.log("Champs manquants détectés.");
        setStatusMessage('Veuillez remplir tous les champs.');
        return;
    }

    // Vérification côté client pour s'assurer que l'âge est valide (18 ans ou plus)
    const today = new Date();
    const birthDate = new Date(birthday);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    console.log("Âge calculé :", age);
    if (age < 18) {
        console.log("Âge invalide détecté.");
        setError('birthdaydate_input', 'Âge invalide (doit être âgé de 18 ans ou plus)');
        setStatusMessage('Âge invalide (doit être âgé de 18 ans ou plus)');
        return;
    }

    const url = 'http://192.168.64.242:3000/register'; // Remplacer par l'URL du serveur

    try {
        console.log("Envoi des données au serveur...");

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

        console.log("Réponse du serveur :", data);
        handleResponse(data);
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        setStatusMessage('Erreur de connexion au serveur.');
    }
}

function handleResponse(data) {
    console.log("Traitement de la réponse du serveur :", data);
    clearErrors();
    if (data.success) {
        setStatusMessage('Création de compte réussie!');
        return;
    }

    // Affichage des erreurs côté serveur
    Object.keys(data.errors).forEach(key => {
        setError(key + '_input', data.errors[key]);
    });

    // Affichage d'une erreur globale
    if (data.globalError) {
        setStatusMessage(data.globalError);
    }
}

function setError(inputId, message) {
    console.log("Erreur :", message, "pour l'input :", inputId);
    const input = document.getElementById(inputId);
    input.style.outline = '2px solid red';
    input.title = message;
}

function clearErrors() {
    console.log("Effacement des erreurs...");
    const inputs = document.querySelectorAll('.register input, .register select');
    inputs.forEach(input => {
        input.style.outline = '';
        input.title = '';
    });
}

function setStatusMessage(message, isError = true) {
    const statusDiv = document.querySelector('.accountregister_statut');
    statusDiv.textContent = message;
    if (isError) {
        statusDiv.classList.add('error');
    } else {
        statusDiv.classList.remove('error');
    }
}

