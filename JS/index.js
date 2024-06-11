var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("SiteURL");
var addbutton = document.getElementById("addbutton");
var datawrap = document.getElementById("tableBody");
var updatebutton = document.getElementById("updatebutton");
var searchInput = document.getElementById("search");

console.log(siteNameInput);
console.log(siteUrlInput);  

var allbookMark = [];
var bookMarkToBeUpdated;

if (localStorage.getItem('allBookMarks') != null){
    allbookMark = JSON.parse(localStorage.getItem('allBookMarks'));
    displayData(allbookMark);
}

function addBookMark(){
    if (validateURL(siteUrlInput.value) && siteUrlInput.value != "") {
        console.log("addbookmark");
        var newBookMark = {
            siteName: siteNameInput.value,
            siteUrl: siteUrlInput.value,
        };
        allbookMark.push(newBookMark);
        localStorage.setItem('allBookMarks', JSON.stringify(allbookMark));
        console.log(allbookMark);
        displayData(allbookMark);
        clearInputs();
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${siteNameInput.value == "" ? "Please enter site name." : ""} ${!validateURL(siteUrlInput.value) ? "Please enter a valid URL." : ""}`,
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
}


function displayData(arr){ 
    var cartona = "";
    for (var i = 0; i < arr.length; i++){
        cartona += `<tr>
        <td>${i + 1}</td>
        <td>${arr[i].siteName}</td>
        <td><a href="${arr[i].siteUrl}" class="btn btn-primary" target="_blank">Visit</a></td>
        <td><button class="btn btn-success" onclick="preupdate(${i})">Update</button></td>
        <td><button class="btn btn-danger" onclick="deleteBookMark(${i})">Delete</button></td>
      </tr>`;
    }
    datawrap.innerHTML = cartona;
}

function preupdate (index){
    bookMarkToBeUpdated = index;
    siteNameInput.value = allbookMark[index].siteName;
    siteUrlInput.value = allbookMark[index].siteUrl;
    updateButton();
    console.log(bookMarkToBeUpdated);
}

function updateButton(){
    document.getElementById("addbutton").classList.replace('d-block','d-none');
    document.getElementById("updatebutton").classList.replace('d-none','d-block');
}

function submitButton(){
    document.getElementById("addbutton").classList.replace('d-none','d-block');
    document.getElementById("updatebutton").classList.replace('d-block','d-none');
}

function finalUpdate(){
    var newBookMark = {
        siteName: siteNameInput.value,
        siteUrl: siteUrlInput.value,
    };

    allbookMark.splice(bookMarkToBeUpdated, 1, newBookMark);
    localStorage.setItem('allBookMarks', JSON.stringify(allbookMark));
    displayData(allbookMark);
    submitButton();
    clearInputs();
}

function deleteBookMark(index){
    allbookMark.splice(index, 1);
    localStorage.setItem('allBookMarks', JSON.stringify(allbookMark));
    displayData(allbookMark);
}

function clearInputs(){
    siteNameInput.value = '';
    siteUrlInput.value = '';
}

searchInput.addEventListener('input', function(e){
    var resultOfSearch = [];
    console.log(e.target.value);
    for(var i = 0; i < allbookMark.length; i++){
        if(allbookMark[i].siteName.toLowerCase().includes(e.target.value.toLowerCase())){
            resultOfSearch.push(allbookMark[i]);
        }
    }
    displayData(resultOfSearch);
});

function validateURL(url){
    var pattern = /^(https?:\/\/)?((([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,})|localhost)(:\d+)?(\/[a-zA-Z0-9\-_\/]*)?(\?[a-zA-Z0-9&=_-]*)?(#[a-zA-Z0-9\-_]*)?$/;
    console.log(pattern.test(url));
    return pattern.test(url);
}
