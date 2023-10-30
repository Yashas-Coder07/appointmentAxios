var name1 = document.getElementById("name");
var mail = document.getElementById("mailId");
var number = document.getElementById("phoneNumber");
const form = document.querySelector(".form")
const items = document.querySelector(".items")
const userDisplay = document.querySelector("#user");


items.innerHTML = `<h2>New User's:-</h2>`
items.style.backgroundColor = "steelblue"

userDisplay.innerHTML = `<h2>Exisitng User's:-</h2>`
userDisplay.style.backgroundColor = "skyblue"

function createButton(classes, num) {
    const button = document.createElement('button');
    button.className = classes;
    if (num === 1) {
        button.innerHTML = "Delete";
        button.id = "del";

    }
    else {
        button.innerHTML = "Edit";
        button.id = "edit"
    }

    return button;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    var li = document.createElement("li");
    li.innerHTML = `${name1.value} - ${mail.value}- ${number.value} - `;


    items.appendChild(li);

    const delButton = createButton("btn btn-outline-secondary", 1);
    li.appendChild(delButton);

    delButton.addEventListener('click', () => {
        li.remove();
    })



    const editButton = createButton("btn btn-primary", 2);
    li.appendChild(editButton);

    items.appendChild(li);

    editButton.addEventListener('click', () => {


        setIntemToEdit(li);

        li.remove();

    })
    axios
        .post("https://crudcrud.com/api/58cd3421a6d648ddb55783592f5c45fe/saveData", {
            name: name1.value,
            mail: mail.value,
            number: number.value
        })
        .then((response) => console.log(response))
        .catch((err) =>
            console.log(err)
        );

    form.reset();
});

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/58cd3421a6d648ddb55783592f5c45fe/saveData")
        .then((res) => {

            for (let i = 0; i < res.data.length; i++) {

                displayUser(res.data[i]);
            }
        })
        .catch((err) => console.log(err))
})

function displayUser(user) {

    var li = document.createElement("li");
    li.innerHTML = `${user.name} - ${user.mail} - ${user.number}  -`


    const delButton = createButton("btn btn-outline-secondary", 1);
    li.appendChild(delButton);

    const editButton = createButton("btn btn-primary", 2);
    li.appendChild(editButton);

    userDisplay.appendChild(li);
    const id = user._id;

    delButton.addEventListener('click', () => {
        deleteUser(id, li);
    });

}

function setIntemToEdit(item) {
    const items = item.textContent;
    const ite = items.split("-");
    name1.value = ite[0];
    mail.value = ite[1];
    number.value = parseInt(ite[2]);
}



function deleteUser(id, li) {

    axios
        .delete(`https://crudcrud.com/api/58cd3421a6d648ddb55783592f5c45fe/saveData/${id}`)
        .then((res) => li.remove())
        .catch((err) => console.log(err))

}
