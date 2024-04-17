function loginhide() {
    var loginDiv = document.querySelector(".login");
    var registerDiv = document.querySelector(".register");

    loginDiv.style.display = "none";

    registerDiv.style.display = "flex";
}

function registerhide() {
    var loginDiv = document.querySelector(".login");
    var registerDiv = document.querySelector(".register");

    registerDiv.style.display = "none";

    loginDiv.style.display = "flex";
}





document.addEventListener("DOMContentLoaded", function() {
    var notRegisteredDiv = document.getElementById("notregistered");

    notRegisteredDiv.addEventListener("click", function() {
        loginhide();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var alreadyHaveH3 = document.getElementById("alreadyhave");

    alreadyHaveH3.addEventListener("click", function() {
        registerhide();
    });
});