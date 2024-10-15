const containerAdd = document.getElementById('container-add');

const renderUsers = async () => {
    const response = await axios.get('/getUsers');

    const databaseLength = response.data.length;

    for (let i = 0; i <= databaseLength - 1; ++i) {

        const newContent = `<div class="content">
        <div class="inside--content rounded-border background--blue">
            <div class="left--content">
                <img class="png-m-icons" src="images/icons8-path-white-50.png" alt="path"/>
                ${response.data[i].name}
                ${response.data[i].surname}
                ${response.data[i].email}
            </div>
            <div class="button-container">
            </div>

        </div>
        </div>`

        containerAdd.insertAdjacentHTML('afterend', newContent);
    }
}

renderUsers();