'use strict';

//selecting elements
const addObject = document.getElementById('add-object');
const showForm = document.getElementById('form');
const addNewUserButton = document.getElementById('addNewUserButton');
//schema inputs to database
const nameInput = document.getElementById('nameInput');
const surnameInput = document.getElementById('surnameInput');
const emailInput = document.getElementById('emailInput');
//console.log(addNewUserButton);

//initialization values (starting)
let clicked;
const init = function(){
    showForm.classList.add('hidden');

    clicked = true;
}
init();


//add object function
addObject.addEventListener('click', () => {
    if(clicked) {
        showForm.classList.remove('hidden');
        document.getElementById(`add-object`).textContent = "hide";
        clicked = false;
    } else{
        showForm.classList.add('hidden');
        document.getElementById(`add-object`).textContent = "Add new object";
        clicked = true;
    }
});



//adding new data to database
const checkIfEmail = (input) => {
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegEx.test(input);
}

//adding new data to database
addNewUserButton.addEventListener('click', async () => {
    const user = {
        name: nameInput.value,
        surname: surnameInput.value,
        email: emailInput.value,
    }

    if (checkIfEmail(user.email)) {

        await axios.post("/addUser", {
            data: user
        });

        document.location.reload();

    } else {
        alert('Wrong email format');
    }
});


//load users when page is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const buttonContainers = document.getElementsByClassName('button-container');

    for (let buttonContainer of buttonContainers) {
        buttonContainer.insertAdjacentHTML('afterend', `<button id="copyID--${i}" class="butt butt--blue hidden">copy user data</button>`);
    }
})
