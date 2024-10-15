'use strict';

//selecting elements
const containerAdd = document.getElementById('container-add');

const deleteUser = (id) => {
    /*console.log(`deleted: ${id}`)*/
    axios
        .delete(`/deleteUser/${id}`)
        .then(response => {
            console.log(`user is removed`, id)
        })
        .catch(error => console.error(error))

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
        <div class="inside--content rounded-border background--pink">
            <div class="left--content">
                <img class="png-m-icons" src="images/icons8-path-white-50.png" alt="path"/>
                ${response.data[i].name}
                ${response.data[i].surname}
                ${response.data[i].email}
            </div>
                <button id="delete--${i}" class="butt butt--blue" onclick="deleteUser('${currentID}')">Delete</button>
        </div>
        </div>`

        containerAdd.insertAdjacentHTML('afterend', newContent);
    }
})


