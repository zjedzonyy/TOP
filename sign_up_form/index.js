const form = document.getElementById("form");


const user_phone = document.getElementById("phone");
const user_password = document.getElementById("password");
const user_confirm_password= document.getElementById("confirm_password");

const phoneError = document.querySelector('#phone + small');
const passwordError = document.querySelector('#password + small')
const inputs = document.querySelectorAll('input');

const phoneRegex = /^\d{9}$/;

inputs.forEach(input => {
    input.addEventListener('input', checkInputs);
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs(); 
});


function checkInputs() {
    const phoneValue = user_phone.value.trim();
    const passwordValue = user_password.value.trim();
    const confirmPasswordValue = user_confirm_password.value.trim();

    if (passwordValue != '') {
    if (passwordValue != confirmPasswordValue && passwordValue){
        passwordError.textContent = "Passwords do not match";
        passwordError.style.visibility = 'visible';
        return;
    } 

    if (passwordValue.length < 10 || !/[A-Z]/.test(passwordValue) || !/[0-9]/.test(passwordValue) || !/[^A-Za-z0-9]/.test(passwordValue)) {
        passwordError.textContent = "Password must be at least 10 characters long with 1 uppercase letter, 1 digit, and 1 special character.";
        passwordError.style.visibility = 'visible';
        return;
    }    

    // If valid => hide error msg
    passwordError.style.visibility = 'hidden';
    return;
    }

    if (!phoneRegex.test(phoneValue)) {
        phoneError.textContent = "Must contain 9 digits, no whitespace.";
        phoneError.style.visibility = 'visible';
        return;
    }

    // If vallid => hide error msg
    phoneError.style.visibility = 'hidden';

}
