function switchToNotRegister() {
    const loginDiv = document.querySelector('.login');
    const registerDiv = document.querySelector('.register');


    loginDiv.classList.add('transition');


    loginDiv.style.transform = 'translateX(-100%)';
    loginDiv.style.opacity = '0';

    
    registerDiv.style.display = 'flex';

    
    setTimeout(() => {
        loginDiv.classList.remove('transition');
    }, 500); 
}

document.addEventListener('DOMContentLoaded', function () {
    const notRegisteredHeading = document.getElementById('notregistered');

    notRegisteredHeading.addEventListener('click', switchToNotRegister);
});

function switchToAlreadyRegistered() {
    const loginDiv = document.querySelector('.login');
    const registerDiv = document.querySelector('.register');

 
    registerDiv.classList.add('transition');

 
    registerDiv.style.transform = 'translateX(-100%)';
    registerDiv.style.opacity = '0';

    loginDiv.style.display = 'flex';

    
    setTimeout(() => {
        registerDiv.classList.remove('transition');
    }, 500); 
}

document.addEventListener('DOMContentLoaded', function () {
    const alreadyHaveHeading = document.getElementById('alreadyhave');

    alreadyHaveHeading.addEventListener('click', switchToAlreadyRegistered);
});