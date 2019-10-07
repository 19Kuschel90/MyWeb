// //////////////////////////////////////////////////////
// Carousel / images gallery
//////////////////////////////////////////////////////////
// add to onload
window.addEventListener('load', function() {
    G_initCarousel();
});

//////////////////////////////////////////////////////////////
// Need: Need: Need: Need: Need: Need: Need: Need: Need: Need:
////////////////////////////////////////////////////////

///////////////////////////////////////////////
// At least one picture
//<img class="carousel-content-2 display-none" src="/images/LinesKugel640x480.png">
//<img class="carousel-content-2 display-none" src="/images/LinesCube640x480.png">
//<img class="carousel-content-2 display-none" src="/images/geometry.png">
//<img class="carousel-content-2 display-none" src="/images/Torus.png">
//<img class="carousel-content-2 display-none" src="/images/Cone.png">
/////////////////////////////////////////////
// For Buttons and Dots
//<div class="carousel-inputs">
//    <div class="carousel-inputs-left pointer">&#10094;</div>
//    <div class="carousel-inputs-right pointer">&#10095;</div>
//</div>
//</div> 
////////////////////////////////////////////////
// class: carousel-content-2,carousel-inputs, display-none, animate-left,
//        animate-Right, carousel-dot-white
function G_initCarousel() {

    ////////////////////////////////////////////////////////////////////
    // Carousel object(Class)
    var slideIndex = 1;
    var contentArray = document.getElementsByClassName("carousel-content-2");
    var dots = new Array();
    var inputsJQ = $(".carousel-inputs");
    var leftButtonJQ = inputsJQ.children()[0];
    var rightButtonJQ = inputsJQ.children().next()[0];

    var autoRunNumber = 0;

    leftButtonJQ.onclick = function() {
        autoRunNumber += 1;
        plusOrCurrentDivs(1, true);
    };
    rightButtonJQ.onclick = function() {
        plusOrCurrentDivs(-1, false);
        autoRunNumber += 1;
    };
    addObject();
    showDivs(slideIndex, true);
    setInterval(autoRun, 5000); //invokes the method(autoRun) again and again

    //////////////////////////////////////////
    //////////////////////////////////////////
    //////////////////////////////////////////
    // Functions
    function addObject() {
        var myinputsArray = inputsJQ[0];
        for (var i = 0; i < contentArray.length; i++) {
            var elementDot = document.createElement('div');
            /////////////////////////
            // Add Class
            elementDot.classList.add("carousel-dot");
            elementDot.classList.add("display-inline-block");
            elementDot.classList.add("carousel-inputs-dots");
            elementDot.classList.add("pointer");
            elementDot.setAttribute("Data-i", String(i));
            elementDot.style.left = String(40 + (6 * i)) + "%";
            dots[i] = elementDot;
            myinputsArray.appendChild(elementDot);
            elementDot.onclick = function() {
                var temp = this.getAttribute("Data-i");
                autoRunNumber += 1;
                slideIndex = temp;
                showDivs(slideIndex, (temp % 2));
            }
        }
    } // End addObject

    function autoRun() {
        // AutoRun Wait
        if (autoRunNumber > 0) {
            // Limt of Wait
            if (autoRunNumber > 4) {
                autoRunNumber = 4;
            }
            autoRunNumber -= 1;
            return;
        }
        plusOrCurrentDivs(1);
    }

    function plusOrCurrentDivs(n, boolInLeftIsFalse) {
        showDivs(slideIndex += n, boolInLeftIsFalse);
    }

    function showDivs(n, sildLeftTrueBool111) {
        //////////////////////////////////
        // Number Save
        n = Number(n);
        slideIndex = Number(slideIndex);
        /////////////////////////////////
        // Array Save 
        if (n > contentArray.length - 1) {
            slideIndex = 0;
        }
        if (n < 0) {
            slideIndex = contentArray.length - 1;
        }
        ///////////////////////////////////////////////////////////
        // Set new Img and new Dot
        for (var i = 0; i < contentArray.length; i++) {
            contentArray[i].classList.add("display-none");
            contentArray[i].classList.remove("animate-left");
            contentArray[i].classList.remove("animate-Right");
        }
        for (var i = 0; i < dots.length; i++) {
            dots[i].classList.remove("carousel-dot-white");
        }
        contentArray[slideIndex].classList.remove("display-none");
        if (sildLeftTrueBool111) { // animate left in
            contentArray[slideIndex].classList.add("animate-left");
        } else { // animate right in
            contentArray[slideIndex].classList.add("animate-right");
        }
        // Set Dot
        dots[slideIndex].classList.add("carousel-dot-white");
    } // End showDivs
} // End G_initCarousel