'use strict';

//selecting elements
const containerAdd = document.getElementById('container-add');
/*const editUserButton = document.getElementById(`edit--${i}`);*/

const addObject = document.getElementById('add-object');
const showForm = document.getElementById('form');


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


const toggleEditUserForm = (id) => {
    const form = document.getElementById(`form--${id}`);

    if(form.classList.contains('hidden')){
        form.classList.remove('hidden');
    } else{
        form.classList.add('hidden');
    }
}

const editUser = async(id) => {
    const user = {
        name: document.getElementById(`nameInput--${id}`).value,
        surname: document.getElementById(`surnameInput--${id}`).value,
        email: document.getElementById(`emailInput--${id}`).value,
    }
    await axios.put(`/editUser/${id}`, {
        data: user
    })
        .catch(error => console.error(error));

    document.location.reload();
}



//load users when page is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const response = await axios.get('/getUsers');
    console.log(response.data[0].name);
    console.log(response.data.length);

    for (let i = 0; i <= response.data.length - 1; ++i){

        const currentID = response.data[i]._id;
        console.log(currentID);

        const newContent = `<div class="content">
        <div class="inside--content rounded-border background--orange">
            <div class="left--content">
                <img class="png-m-icons" src="images/icons8-path-white-50.png" alt="path"/>
                ${response.data[i].name}
                ${response.data[i].surname}
                ${response.data[i].email}
            </div>
            <button id="edit--${i}" class="butt butt--blue" onclick="toggleEditUserForm('${currentID}')">Edit</button>
        </div>
            <div id="form--${currentID}" class="body--content content rounded-border form hidden">
                <strong>Add user to Database: </strong>
                <div>
                    <label class="form-label">Name:</label>
                    <input id="nameInput--${currentID}" type="text"/>
                </div>
                <div>
                    <label class="form-label">Surname:</label>
                    <input id="surnameInput--${currentID}" type="text"/>
                </div>
                <div>
                    <label class="form-label">Email:</label>
                    <input id="emailInput--${currentID}" type="text"/>
                </div>
                <button id="editUserButton--${currentID}" class="butt butt--black" onclick="editUser('${currentID}')"/>Submit</button>
            </div>
        </div>`

        containerAdd.insertAdjacentHTML('afterend', newContent);
    }
})