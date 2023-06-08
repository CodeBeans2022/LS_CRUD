function validation() {
    let name = document.querySelector('#name');
    let age = document.querySelector('#age');
    let address = document.querySelector('#address');
    let email = document.querySelector('#email');

    if(name == "") {
        alert('Name is required');
        return false;
    }

    if(age == "") {
        alert('Age is required');
        return false;
    }else if(age < 1) {
        alert('Age must be more than zero')
        return false
    }

    if(address == "") {
        alert('Address is required');
        return false
    }

    if(email == "") {
        alert('Email is required')
        return false
    }else if(!email.value == '@') {
        alert('Invalid Email')
        return false
    }

    return true
}

function showData() {
    let list
    if(localStorage.getItem("list") == null ) {
        list = [];
    }else {
        list = JSON.parse(localStorage.getItem('list'))
    }

    let html = document.querySelector('#table');

    html.innerHTML = '';
    list.forEach(function (element, index) {

        html.innerHTML += `
        <tr>
        <td>${element.name}</td>
        <td>${element.age}</td>
        <td>${element.address}</td>
        <td>${element.email}</td>
        <td><button onclick="deleteData(${index})" class="btn btn-danger">Delete</button></td>
        <td><button onclick="updateData(${index})" class="btn btn-info">Update</button></td>
        </tr>`
    });
}

document.onload = showData();

function addData() {
    if(validation() == true) {
        let name = document.querySelector('#name').value;
        let age = document.querySelector('#age').value;
        let address = document.querySelector('#address').value;
        let email = document.querySelector('#email').value;

        let list;
        if(localStorage.getItem("list") == null ) {
            list = [];
        }else {
            list = JSON.parse(localStorage.getItem('list'))
        }
        list.push({
            name: name,
            age: age,
            address: address,
            email: email
        })
        localStorage.setItem('list', JSON.stringify(list));
        showData();

        document.querySelector('#name').value = '';
        document.querySelector('#age').value = '';
        document.querySelector('#address').value = '';
        document.querySelector('#email').value = '';
    }
}

function deleteData(index) {
    let list;
    if(localStorage.getItem("list") == null ) {
        list = [];
    }else {
        list = JSON.parse(localStorage.getItem('list'))
    }

    list.splice(index, 1) 
    localStorage.setItem('list', JSON.stringify(list));
    showData();
}

function updateData(index) {
    document.querySelector('#submit').style.display = "none"
    document.querySelector('#update').style.display = "block"

    let list;
    if(localStorage.getItem("peopleList") == null ) {
        list = [];
    }else {
        list = JSON.parse(localStorage.getItem('list'))
    }

    document.querySelector('#name').value = list[index].name;
    document.querySelector('#age').value = list[index].age;
    document.querySelector('#address').value = list[index].address;
    document.querySelector('#email').value = list[index].email;

    document.querySelector('#update').onclick = function() {
        if(validation() == true) {
            list[index].name = document.querySelector('#name').value;
            list[index].age = document.querySelector('#age').value;
            list[index].address = document.querySelector('#address').value;
            list[index].email = document.querySelector('#email').value;

            localStorage.setItem('list', JSON.stringify(list));
            showData();

            document.querySelector('#name').value = '';
            document.querySelector('#age').value = '';
            document.querySelector('#address').value = '';
            document.querySelector('#email').value = '';

            document.querySelector('#submit').style.display = "block"
            document.querySelector('#update').style.display = "none"
        }
    }
}