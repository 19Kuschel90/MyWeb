window.addEventListener('load', function() {
    G_IntiRegistration();
});


///////////////////////////
// Need: 
/////////////////
// id: Registration, Background-black-JS,Sign-Up-button,
//     submit-form
// class: Account, Blackback-gruond-in-JS, Registration-in-JS
//        
///////////////////////////////////////////////
// Registration Swap in and Auto
function G_IntiRegistration() {
    //////////////////////////////////////
    // Formular
    var registration = document.getElementById("Registration");
    ////////////////////////////////////
    // Black background
    var black = document.getElementById("Background-black-JS");
    ////////////////////////////////////
    // Sign Up button
    var signUpBbutton = document.getElementById("Sign-Up-button");
    ////////////////////////////////////////
    // submit Formular
    var submitform = document.getElementById("submit-form");
    ///////////////////////////////////////

    ///////////////////////////////////////////////////////////
    // left pos........  (CSS)
    var inGoString = "25%";
    var outGoString = "-1000%";

    /////////////////////////////////////
    // Get all AcountsFelds
    var arrayAcountsFelds = document.getElementsByClassName('Account');

    ////////////////////////////////////////////////
    // add listeners
    for (var j = 0; j < arrayAcountsFelds.length; j++) {
        // user input keydown
        arrayAcountsFelds[j].addEventListener("keydown", function(event) {
            removeErrorAndOK(this);
        });
        // user input change
        arrayAcountsFelds[j].addEventListener("change", function(event) {
            removeErrorAndOK(this);
        });
    }

    /////////////////////////////
    // Add Event Listener submit
    submitform.onsubmit = function(evt) {
        if (Validation()) {
            alert("Thank you for Registerin");

        } else {
            evt.preventDefault();
        }
    };

    ////////////////////////////////////////
    // Onclick
    signUpBbutton.onclick = function() {
        Registration();
    };


    black.onclick = function() {
        Registration();
    };

    /////////////////////////////////
    //!!! SWAP !!!
    // Sawp Registration in and out
    function Registration() {
        black.classList.toggle("Blackback-gruond-in-JS");
        registration.classList.toggle("Registration-in-JS");
        if (registration.style.left !== inGoString) {
            black.onclick = function() {
                Registration();
            };

        }
    };

    //////////////////////////////////////
    // Show: Error(Class) Or Add A OK(Class)
    function showErrorOrOK(element, message, boolError) {
        if (boolError == false) {
            element.classList.add('has-error');
            // create an error message
            var errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.append(document.createTextNode(message));
            element.parentNode.insertBefore(errorMessage, element.nextSibling);
        } else {
            element.classList.add('feld-ok-JS');
            // create an error message
            var errorMessage = document.createElement('div');
            errorMessage.classList.add('OK-message');
            errorMessage.append(document.createTextNode(message));
            element.parentNode.insertBefore(errorMessage, element.nextSibling);
        }
    };

    //////////////////////////////////////////
    // Remove Error and Ok 
    function removeErrorAndOK(element) {
        /////////////////////////////////////
        //  have elemet has-error
        if (element.classList.contains('has-error')) {
            // remove  class
            element.classList.remove('has-error');
            // remove the errorMessage
            var possibleErrorMessage = element.nextSibling;
            if (possibleErrorMessage.classList.contains('error-message')) {
                element.parentNode.removeChild(possibleErrorMessage);
            }
        }
        /////////////////////////////////////
        //  have elemet feld-ok
        if (element.classList.contains('feld-ok')) {
            // remove  class
            element.classList.remove('feld-ok');

            // remove OK
            var possibleErrorMessage = element.nextSibling;
            if (possibleErrorMessage.classList.contains('OK-message')) {
                element.parentNode.removeChild(possibleErrorMessage);
            }
        }
    };

    ///////////////////////////////
    //  Set Error / Required Or a OK
    function isValue(feld) {
        if (feld.name == "AGB") {
            return true;
        }
        if (!feld.value) {
            showErrorOrOK(feld, " *Required", false);
            return false;
        } else {
            showErrorOrOK(feld, " ", true);
            return true;
        }

    };

    /////////////////////
    // return bool 
    function Validation() {
        var boolAllOK = true;
        var passwort = -1;
        var passwortConfirm = -1;
        for (var i = 0; i < arrayAcountsFelds.length; i++) {
            removeErrorAndOK(arrayAcountsFelds[i]);
            if (!isValue(arrayAcountsFelds[i])) // input null
            {
                boolAllOK = false;
            }
        }
        for (var i = 0; i < arrayAcountsFelds.length; i++) {
            {
                switch (arrayAcountsFelds[i].name) {

                    case "Email":
                        removeErrorAndOK(arrayAcountsFelds[i]); // fix
                        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                        if (!re.test(arrayAcountsFelds[i].value)) {
                            showErrorOrOK(arrayAcountsFelds[i], " *Email ", false);
                            boolAllOK = false;
                            break;
                        } else {
                            showErrorOrOK(arrayAcountsFelds[i], " ", true);
                            break;
                        }
                    case "Passwort":
                        passwort = arrayAcountsFelds[i];
                        var temp = pw(passwort, passwortConfirm);
                        if (temp == -1) {

                        } else {
                            if (temp == false) {
                                boolAllOK = false;
                            }
                        }
                        break;
                    case "Passwort-Confirm":
                        passwortConfirm = arrayAcountsFelds[i];
                        var temp2 = pw(passwort, passwortConfirm);
                        if (temp2 == -1) {

                        } else {
                            if (temp2 == false) {
                                boolAllOK = false;
                            }
                        }
                        break;
                    case "AGB":
                        removeErrorAndOK(arrayAcountsFelds[i]); // fix
                        if (isCheckoxCheck(arrayAcountsFelds[i])) {
                            boolAllOK = false;
                        }
                        break;
                }
            }
        }
        ////////////////////////////////
        // if all OK 
        return boolAllOK;
    }; // End Validation()



    /////////////////////////////////
    // is Checkbox Check
    function isCheckoxCheck(Checkbox) {
        if (!Checkbox.checked) {
            showErrorOrOK(Checkbox, " AGB!!!", false);
            return true;
        } else {
            showErrorOrOK(Checkbox, " ", true);
            return false;
        }
    };

    ////////////////////////////////////
    // if ( passwort == passwortConfirm)
    function pw(passwort, passwortConfirm) {
        // -1 is defaul
        if (!passwort.value || !passwortConfirm.value) {
            return -1;
        } else {
            if (passwort.value == passwortConfirm.value) {
                removeErrorAndOK(passwort);
                removeErrorAndOK(passwortConfirm);
                showErrorOrOK(passwort, " ", true);
                showErrorOrOK(passwortConfirm, " ", true);
                return true;
            } else {
                showErrorOrOK(passwort, " passwort not Confirm", false);
                showErrorOrOK(passwortConfirm, " passwort not Confirm", false);
                return false;
            }
        }
    };


}; // End G_intiRegistration()