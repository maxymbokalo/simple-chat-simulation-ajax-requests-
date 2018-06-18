const addUserBtn = document.getElementById("addUser");
const usersList = document.getElementById("usersLi");
const chat = document.getElementById("chatLi");
const getOnline = document.getElementById("getOnline")

let users = new Map();
let counter = 0;

function ajaxGetUser (){
    sendRequest("https://randomuser.me/api/",function (data) {
        let randomUser = JSON.parse(data);
        let user = randomUser.results[0];
        user.messageTime = getRandomInt(5000,30000);
        addUs(user);
        users.set(counter++,user);
        getOnline.innerHTML = counter + " Users are online";
        console.log(counter,user.messageTime);
        sendMessage(user);
    });
}

function addUs(user){
    usersList.innerHTML += "<td>"+
        "<img src=" + getUserLogo(user) + ">" +
        "<h3>" + getUserFullName(user) + "</h3>" +
        "<h4>" + "City: " + ucFirst(getUserCity(user)) + "</h4>" +
        "<h4>" + getUserEmail(user) + "</h4>"
        + "<td/>";
}
function sendMessage(user) {
    setInterval(function () {
        sendRequest("http://www.randomtext.me/api/gibberish/h4/5-15",function (data) {
            let randomText = JSON.parse(data);
            chat.innerHTML += "<td>"+
                "<img src=" + getUserLogo(user) + ">" +
                "<h3>" + getUserFullName(user) + "</h3>" +
                randomText.text_out
                + "<td/>";
        })
    },user.messageTime)
}

function getUserCity(user) {
    return user.location.city;
}

function getUserEmail(user) {
    return user.email;
}

function getUserFullName(user){
    return ucFirst(user.name.first) +
        ' ' + ucFirst(user.name.last);
}

function getUserLogo(user){
    return user.picture.thumbnail;
}

function ucFirst(str) {
    return str.charAt(0).toUpperCase()
        + str.substring(1,str.length);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function sendRequest(url, success) {
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status===200) success(xhr.responseText);
    };
    //xhr.setRequestHeader('Access-Control-Allow-Origin', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}

addUserBtn.addEventListener("click",ajaxGetUser);