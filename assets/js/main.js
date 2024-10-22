let URL = 'https://stuinfo.tele-ict.com/api/students';
function getAllData() {
    fetch(URL)
        .then(res => res.json())
        .then(json => {
            let box = '';
            for (let element of json.data) {
                box += `<div class="col-3">
                    <div class="card overflow-hidden" data-stuid="${ element.id }">
                        <div class="card-img">
                            <img src="${ element.avarta }"
                                alt="">
                        </div>
                        <div class="card-description p-3 position-relative">
                            <h3>${ element.name }</h3>
                            <p>${ element.class }</p>
                            <div class="btn-group position-absolute">
                                <button type="button" class="btn btn-success btn-action">
                                    <div class="btn-icon w-100 h-100 d-flex align-item justify-content-center" data-bs-toggle="modal" data-bs-target="#editStudent">
                                        <img src="assets/img/edit.png" onclick="loadData(this)" alt="">
                                    </div>
                                </button>
                                <button type="button" class="btn btn-danger btn-action" onclick = "DeleteData(this)">
                                    <div class="btn-icon w-100 h-100 d-flex align-item justify-content-center">
                                        <img src="assets/img/delete.png" alt="">
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
            document.getElementById('row').innerHTML = box;
        })
}
getAllData();

document.getElementById('searchbox').addEventListener('input', searchData);

function searchData() {
    let result = document.getElementById('searchbox').value;
    fetch(URL + '?name=' + result)
        .then(res => res.json())
        .then(json => {
            let box = '';
            let element;
            for (element of json.data) {
                box += `<div class="col-3">
                    <div class="card overflow-hidden" data-stuid="${ element.id }">
                        <div class="card-img">
                            <img src="${ element.avarta }"
                                alt="">
                        </div>
                        <div class="card-description p-3 position-relative">
                            <h3>${ element.name }</h3>
                            <p>${ element.class }</p>
                            <div class="btn-group position-absolute">
                                <button type="button" class="btn btn-success btn-action">
                                    <div class="btn-icon w-100 h-100 d-flex align-item justify-content-center" data-bs-toggle="modal" data-bs-target="#editStudent">
                                        <img src="assets/img/edit.png" onclick="loadData(this)" alt="">
                                    </div>
                                </button>
                                <button type="button" class="btn btn-danger btn-action" onclick = "DeleteData(this)">
                                    <div class="btn-icon w-100 h-100 d-flex align-item justify-content-center">
                                        <img src="assets/img/delete.png" alt="">
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
            if (element === undefined) {
                document.getElementById('row').innerHTML = `<h1 class="text-center my-5">🔍Not found '${ result }' !!!🧐</h1>`;
            }
            else {
                document.getElementById('row').innerHTML = box;
            }
        })
}

function CreateData() {

    let name = document.getElementById('createName').value;
    let Title = document.getElementById('createTitle').value;
    let Image = document.getElementById('createImage').files[0];

    let formData = new FormData();
    formData.append("name", name);
    formData.append("class", Title);
    formData.append("avarta", Image);

    fetch(URL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
        },
        body: formData,
    })
        .then(res => res.json())
        .then(json => {
            getAllData();
            document.getElementById('closeCreate').setAttribute('data-bs-dismiss','modal');
        })
}

let storeID;
let storeImage;

function loadData(data) {
    storeID = data.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.stuid;
    fetch(URL + '/' + storeID)
        .then(res => res.json())
        .then(json => {
            document.getElementById('updateName').value = json.data[0].name;
            document.getElementById('updateTitle').value = json.data[0].class;
            storeImage = document.getElementById('currentImage').src = 'https://stuinfo.tele-ict.com/avarta/' + json.data[0].avarta;
            document.getElementById('oldname').innerHTML = json.data[0].name;
            document.getElementById('oldclass').innerHTML = json.data[0].class;
        })
}

function UpdateData() {
    let name = document.getElementById('updateName').value;
    let Title = document.getElementById('updateTitle').value;
    let Image = document.getElementById('updateImage');

    if (Image === undefined) {
        Image = storeImage;
    }
    else {
        Image = Image.files[0];
    }
    let formData = new FormData();
    formData.append("name", name);
    formData.append("class", Title);
    formData.append("avarta", Image);

    fetch(URL + '/' + storeID, {
        method: 'PUT',
        body: formData,
    })
        .then(res => res.json())
        .then(json => {
            getAllData();
        })
}
function DeleteData(info) {
    ID = info.parentElement.parentElement.parentElement.dataset.stuid;
    console.log(ID);
    fetch(URL + '/' + ID, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(json => {
            getAllData();

        })
}
