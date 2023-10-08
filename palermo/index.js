var startScreen = $("#startScreen");
var startButton = $("#startButton");
var playersScreen = $("#playersScreen");
var addPlayerButton = $("#addPlayerButton");
var playerList = $("#playerList > tbody");
var selectRolesScreen = $("#selectRolesScreen");
var roleList = $("#roleList > tbody");
var showRolesScreen = $("#showRolesScreen");
var showRolesList = $("#showRolesList > tbody");
var voteScreen = $("#voteScreen");
var voteList = $("#voteList > tbody");
var killScreen = $("#killScreen");
var killList = $("#killList > tbody");
var gun_shot_sfx = document.getElementById("gun_shot_sfx");
var gun_ready_sfx = document.getElementById("gun_ready_sfx");

var backBtn = $("#backBtn");
var nextBtn = $("#nextBtn");

var currentPage = startScreen;
var Roles;
var goodAlive = 3;
var badAlive = 2;
var Alexisferos = true
const pages = {startScreen:null, playersScreen:null, selectRolesScreen:checkPlayerCount, showRolesScreen:assignRoles, voteScreen:()=>{backBtn.remove(); nextBtn.remove();startVote()}};
const PrimaryRoles = [
    ["Πολίτης", "G", 1],
    ["Πολίτης", "G", 1],
    ["Αστυνομικός", "G", 1],
    ["Φανερός Δολοφόνος", "B", 1],
    ["Κρυφός Δολοφόνος", "B", 1]
]
const SecondaryRoles = {
    "Τρέλα": [false, 1, "N"],
    "Καμικάζι": [false, 1, "G"],
    "Ερωτευμένος": [false, 2, "G"],
    "Αλεξίσφαιρος": [false, 1, "G"]
}
const PlayerList = [];
const Votes = {};

reenterPlayerLists()

function resetSelectedRoles() {
    roleList.empty();
    for (const name of Object.keys(SecondaryRoles)) {
        roleList.append(`<tr onclick="toggleRole('${name}', this)"><td>✖ | ${name}</td></tr>`);
    }
}
resetSelectedRoles()

function reenterPlayerLists() {
    playerList.empty();
    showRolesList.empty();
    for (const [index, data] of Object.entries(PlayerList)) {
        playerList.append(`<tr onclick="remPlayer('${index}')"><td>${data[0]}</td></tr>`);
        showRolesList.append(`<tr onclick="showRole('${index}')"><td>${data[0]}</td></tr>`);
    }
}

function toggleRole(name, e) {
    var minPlayers = [];
    for (const value of Object.values(SecondaryRoles)) {if (value[0]) {minPlayers.push(value[1])}}
    var role = SecondaryRoles[name]
    if (!role[0]) {
        if (PlayerList.length >= 5 + role[1] + minPlayers.reduce((a, b) => a + b, 0)) {
            role[0] = !role[0];
            e.innerHTML = `<td>${role[0] ? "✔" : "✖"} | ${name}</td>`;
            gun_ready_sfx.play();
        } else {
            alert("Ανεπαρκής αριθμός παικτών")
        }
    } else {
        role[0] = !role[0];
        e.innerHTML = `<td>${role[0] ? "✔" : "✖"} | ${name}</td>`;
        if (role[0]) {
            if (role[2] == "G") {goodAlive += role[1]}
            if (role[2] == "B") {badAlive += role[1]}
        } else {
            if (role[2] == "G") {goodAlive -= role[1]}
            if (role[2] == "B") {badAlive -= role[1]}
        }
        gun_ready_sfx.play();
    }
}

function checkPlayerCount() {
    if (PlayerList.length < 5) {
        alert("Ανεπαρκής αριθμός παικτών")
        return false
    }
    for (const name of Object.keys(SecondaryRoles)) {SecondaryRoles[name][0]=false}
    resetSelectedRoles()
}

function assignRoles() {
    var minPlayers = [];
    for (const value of Object.values(SecondaryRoles)) {if (value[0]) {minPlayers.push(value[1])}}
    var RolesNum = 5 + minPlayers.reduce((a, b) => a + b, 0)
    Roles = []
    for (const values of PrimaryRoles) {Roles.push([values[0], values[1], 1])}
    for (const [k, v] of Object.entries(SecondaryRoles)) {
        if (v[0]) {
            Roles.push([k, v[2], v[1]]);
            if (k == "Ερωτευμένος") {Roles.push([k, v[2], v[1]]);}
        }
    }
    if (PlayerList.length > RolesNum) {
        for (let i=0; i<PlayerList.length-RolesNum; i++) {
            Roles.push(["Πολίτης", "G"]);
        }
    }
    var gameRoles = [...Roles]
    var l = gameRoles.length
    for (let i=0; i<l; i++) {
        var index = Math.floor(Math.random() * (l-i))
        var role = gameRoles[index][0];
        gameRoles.splice(index, 1);
        PlayerList[i][1] = role;
    }
}

function showRole(index) {
    if (confirm(`Εμφάνιση ρόλου του παίκτη ${PlayerList[index][0]};`)) {alert(PlayerList[index][1])}
}

function changePage(page) {
    currentPage.fadeOut();
    currentPage = $("#"+page);
    currentPage.fadeIn();
}

function remPlayer(index, e) {
    if (confirm(`Διαγραφή του παίκτη ${PlayerList[index][0]};`)) {PlayerList.splice(index, 1); e.remove()}
}

function checkWin(index) {
    var roleType = "N";
    var remNum = 0;
    Roles.forEach((v)=>{if (v[0] == PlayerList[index][1]) {roleType = v[1]; remNum = v[2];}})
    if (roleType == "G") {console.log(1); goodAlive -= remNum;}
    if (roleType == "B") {console.log(2); badAlive -= remNum;}
    if (goodAlive == 0) {alert("Οι κακοί νίκησαν"); window.location.reload()}
    if (badAlive == 0) {alert("Οι καλοί νίκησαν"); window.location.reload()}
}    

function votePlayer(index, e) {
    var name = PlayerList[index][0];
    if (confirm(`Θέλετε να ψηφίσετε τον παίκτη: ${name};`)) {
        Votes[name] += 1;
        e.innerHTML = `<td>${Votes[name]} | ${name}</td>`;
        var vnums = Object.values(Votes);
        if (vnums.reduce((a, b) => a + b, 0) == PlayerList.filter(x => x[2] == true).length) {
            vmaxv = vnums.reduce((a, b) => {return Math.max(a, b);});
            vmaxp = vnums.filter(x => x === vmaxv).length;
            if (vmaxp > 1) {
                alert("Ισοψηφία, δεν κρίνετε κανείς ένοχος");
                voteList.empty();
                startKill();
            }
            else {
                imax = vnums.indexOf(vmaxv);
                checkWin(imax);
                if (PlayerList[imax][1] == "Τρέλα") {
                    alert("Ο παίκτης που κρίθηκε ένοχος ήταν η Τρέλα, η Τρέλα νίκησε");
                    window.location.reload();
                }
                else if (PlayerList[imax][1] == "Ερωτευμένος") {
                    for (const [i, player] of Object.entries(PlayerList)) {
                        if (player[1] == "Ερωτευμένος") {
                            PlayerList[i][2] = false;
                        }
                    }
                }
                else {
                    alert(`Ο παίκτης ${PlayerList[imax][0]} κρίθηκε ένοχος`);
                }
                PlayerList[imax][2] = false;
                for (const key in Votes) {delete Votes[key];}
                voteList.empty();
                gun_shot_sfx.play();
                startKill();
            }
        }
    }
}

function killPlayer(index) {
    if (confirm(`Θέλετε να δολοφονίσετε τον παίκτη: ${PlayerList[index][0]};`)) {
        checkWin(index);
        if (PlayerList[index][1] == "Τρέλα") {
            alert("Ο παίκτης που σκοτώθηκε ήταν η Τρέλα, η Τρέλα νίκησε");
            window.location.reload();
        }
        else if (PlayerList[index][1] == "Αλεξίσφαιρος" && Alexisferos) {
            alert("Ο παίκτης που προσπάθησαν να σκοτώσουν οι δολοφόνοι ήταν ο Αλεξίσφαιρος");
            Alexisferos = false;
        }
        else if (PlayerList[index][1] == "Ερωτευμένος") {
            for (const [i, player] of Object.entries(PlayerList)) {
                if (player[1] == "Ερωτευμένος") {
                    PlayerList[i][2] = false;
                }
            }
        }
        else {
            PlayerList[index][2] = false;
        }
        killList.empty();
        gun_shot_sfx.play();
        startVote();
    }
}

function startVote() {
    killScreen.fadeOut();
    voteScreen.fadeIn();
    for (const [index, data] of Object.entries(PlayerList)) {
        Votes[data[0]] = 0
        voteList.append(`<tr ${data[2] ? `onclick="votePlayer('${index}', this)"` : ""}><td>${data[2] ? 0 : "✖"} | ${data[0]}</td></tr>`);
    }
    console.log(PlayerList)
}

function startKill() {
    voteScreen.fadeOut();
    killScreen.fadeIn();
    for (const [index, data] of Object.entries(PlayerList)) {
        killList.append(`<tr ${data[2] ? `onclick="killPlayer('${index}')"` : ""}><td>${data[2] ? "" : "✖ "}${data[0]}</td></tr>`);
    }
}

backBtn.click(function(){
    cpIndex = Object.keys(pages).indexOf(currentPage.attr("id"));
    if (cpIndex != -1) {
        let f;
        if (Object.values(pages)[cpIndex-1] != null) {f=Object.values(pages)[cpIndex-1]();}
        else {f = null;}
        if (f != false) {
            gun_shot_sfx.play();
            if (cpIndex-1 <= 0) {backBtn.fadeOut();}
            nextBtn.fadeIn();
            changePage(Object.keys(pages)[cpIndex-1])
        }
    }
});
nextBtn.click(function(){
    cpIndex = Object.keys(pages).indexOf(currentPage.attr("id"));
    if (cpIndex != -1) {
        let f;
        if (Object.values(pages)[cpIndex+1] != null) {f=Object.values(pages)[cpIndex+1]();}
        else {f = null;}
        if (f != false) {
            gun_shot_sfx.play();
            if (cpIndex+1 == Object.keys(pages).length-1) {nextBtn.fadeOut();}
            backBtn.fadeIn();
            changePage(Object.keys(pages)[cpIndex+1])
        }
    }
});

startButton.click(function(){nextBtn.click();});

addPlayerButton.click(function(){
    var name = prompt("Όνομα Παίχτη");
    if (name){
        var index = PlayerList.push([name, null, true]) - 1
        playerList.append(`<tr onclick="remPlayer('${index}', this)"><td>${name}</td></tr>`);
        showRolesList.append(`<tr onclick="showRole('${index}')"><td>${name}</td></tr>`);
    }
})