window.addEventListener('load', function() {
    G_intiHandyMenu();
});
///////////////////////////////////////
// Handy Menu
//////////////////////////////////////
// Need:
//////////////////////////////////
// id: Handy-Menu-Button, Handy-Background-black-JS, Go-Left
// class: Blackback-gruond-in-JS
function G_intiHandyMenu() {
    var buttonID = document.getElementById("Handy-Menu-Button");
    var black = document.getElementById("Handy-Background-black-JS"); // black = white
    buttonID.onclick = function() {
        handyMenu();
    }

    black.onclick = function() {
        handyMenu();
    }

    // Swap
    function handyMenu() {
        black.classList.toggle("Blackback-gruond-in-JS");

        if (document.getElementById("Go-Left").style.left == "40%") {
            document.getElementById("Go-Left").style.left = "-1000%";
        } else {
            document.getElementById("Go-Left").style.left = "40%";
        }
    }
}