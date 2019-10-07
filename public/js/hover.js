// window.addEventListener('load', function() {
//     // initMyHover();

// });
// // Social ICO
// function initMyHover() {
//     var linkSocial = [
//         "../images/Facebook.svg",
//         "../images/Twitter.svg",
//         "../images/Youtube.svg"
//     ];
//     var linkSocialHover = [
//         "../images/Facebook_hover.svg",
//         "../images/Twitter_hover.svg",
//         "../images/Youtube_hover.svg"
//     ];



//     var allTextureButtonsArray = document.getElementsByClassName('myhover');
//     for (var i = 0; i < allTextureButtonsArray.length; i++) {
//         allTextureButtonsArray[i].setAttribute("data-i", i);
//         allTextureButtonsArray[i].src = linkSocial[i];
//         allTextureButtonsArray[i].onmouseover = function() {
//             this.src = linkSocialHover[this.getAttribute("data-i")];

//         }

//         allTextureButtonsArray[i].onmouseout = function() {
//             this.src = linkSocial[this.getAttribute("data-i")];


//         }
//     }
// }