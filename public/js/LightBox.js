window.addEventListener('load', function() {
    G_initLightBox();
});
//////////////////////////////////////
// Need:
////////////////////////////
// <img src="images/Aiui_500x429.png" alt="Game Aiui" class="img-Low-Zoom !!!img-lightBox!!!">
// Class:  img-lightBox, Ligh-Box-Spawn-Point-In, img-Zoom-ligth-box-big
// ids: Background-black-JS, Ligh-Box-Spawn-Point
function G_initLightBox() {

    // Buttons
    var black = document.getElementById("Background-black-JS");
    var spawnPointID = document.getElementById("Ligh-Box-Spawn-Point");
    var imgLightBoxButtonArray = document.getElementsByClassName('img-lightBox');
    for (var i = 0; i < imgLightBoxButtonArray.length; i++) {
        imgLightBoxButtonArray[i].onclick = function() {
            // Add class
            SwapLightBox(this);
        }
    }
    // Swap
    function SwapLightBox(buttonSrc) {
        if (buttonSrc) {
            spawnPointID.firstChild.src = buttonSrc.src;
        }
        spawnPointID.classList.toggle("Ligh-Box-Spawn-Point-In");
        black.classList.toggle("Blackback-gruond-in-JS");
        black.onclick = function() {
            SwapLightBox();
        }
        spawnPointID.firstChild.classList.toggle("img-Zoom-ligth-box-big");
    }

} // End G_initLightBox()