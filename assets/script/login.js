async function loginUser() {
    const username = document.getElementById('username_input_login').value;
    const password = document.getElementById('password_input_login').value;
    const url = "URL_A_DEFINIR";  

   
    if (!username && !password) {
        setError('username_input_login', "Aucun nom d'utilisateur entré");
        setError('password_input_login', "Aucun mot de passe entré");
        return;
    }

   
    if (!username) {
        setError('username_input_login', "Aucun nom d'utilisateur entré");
        return;
    }
    if (!password) {
        setError('password_input_login', "Aucun mot de passe entré");
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

        
        switch(data.code) {
            case "LOGIN_NOT_FOUND":
                setError('username_input_login', "Le nom d'utilisateur n'existe pas");
                break;
            case "PASSWORD_INCORRECT":
                setError('password_input_login', "Mot de passe incorrect");
                break;
            case "LOGIN_SUCCESS":
                setSuccess();
                break;
            default:
                alert("Une erreur inattendue est survenue.");
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

function setSuccess() {
    alert("Connexion réussie !");
    
}
