const REGISTER_URL = "http://localhost:8080/api/farmer/register";
const LOGIN_URL = "http://localhost:8080/api/farmer/login";


const loginFormElement = document.getElementById('loginForm');
const registerFormElement = document.getElementById('registerForm');
const toSignUp = document.getElementById('toSignUp');
const toSignIn = document.getElementById('toSignIn');


toSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    loginFormElement.classList.add('hidden');
    registerFormElement.classList.remove('hidden');
});

toSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    registerFormElement.classList.add('hidden');
    loginFormElement.classList.remove('hidden');
});


registerFormElement.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    
    const registrationPackage = {
        fullName: document.getElementById('reg-fullname').value,
        userName: document.getElementById('reg-username').value,
        email: document.getElementById('reg-email').value,
        phoneNumber: document.getElementById('reg-phone').value,
        password: document.getElementById('reg-password').value,
        farmLocation: document.getElementById('reg-location').value,
        farmSizeHectares: parseFloat(document.getElementById('reg-size').value) || 0.0,
        historicAverageYieldKg: parseFloat(document.getElementById('reg-yield').value) || 0.0
    };

    try {
        const response = await fetch(REGISTER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registrationPackage)
        });

        const result = await response.json(); 

        if (response.ok) {
            alert("Registration Complete! Server says: " + (result.message || "Account Created"));
        } else {
            alert("Registration failed: " + (result.message || "Check your details."));
        }
    } catch (error) {
        alert("Cannot reach IntelliJ. Make sure Spring Boot is running on port 8080!");
    }
});


loginFormElement.addEventListener('submit', async (event) => {
    event.preventDefault();

    
    const loginPackage = {
        userName: document.getElementById('login-email').value, 
        password: document.getElementById('login-password').value
    };

    try {
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginPackage)
        });

        const result = await response.json(); 

        if (response.ok) {
            alert("Logged in successfully! Welcome back.");
        } else {
            alert("Login failed: " + (result.message || "Invalid credentials"));
        }
    } catch (error) {
        alert("Cannot reach IntelliJ server for logging in.");
    }
});
