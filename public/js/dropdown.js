// Drop Down Menu

/////////////////////////////////////////
// Need: 
///////////////////////////////////////
//<ul class="float-Right Handy-margin-top-100" id="Go-Left">
//<li><a href="#" class="Handy-Menu-Move Handy-margin-top-100">Home </a></li>
//<li id="dropdown">
//    <div class="pointer">Shader &#5156;
//    </div>
//    <ul class="Handy-Menu-Move display-none">

//   <li class="display-none">
//     <a href="html/shaderVersion3.html">Shader Beispiel 1</a>
//   <br>
// <a href="html/shader.html">Shader Beispiel 2</a></li>
// </ul>
//</li>
//<li><a href="#" class="Handy-Menu-Move">Games</a></li>
//<li><a href="#" class="Handy-Menu-Move">Login</a></li>
//<li><a href="#" class="Handy-Menu-Move" id="Sign-Up-button">Sign up</a></li>
//</ul>
window.addEventListener('load', function() {
    G_initDropDown();
});

function G_initDropDown() {
    $('#Go-Left>li').closest('li').
    find('>ul').hide();
    $('#Go-Left>li').hover(function() {
        $(this).closest('li').
        find('>ul').
        show().
        stop().
        animate({ 'margin-top': 0, 'opacity': 1 }, 300);
    }, function() {
        $(this).find('>ul').stop().fadeOut("slow");
    });
}