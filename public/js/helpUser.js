class HelpUser {
    timeOuts = [];
    saveAllText(AclassName, attributeName = "helpTextID") {
        var textArray = document.getElementsByClassName(AclassName);
        for (let index = 0; index < textArray.length; index++) {
            const element = textArray[index];
            var id = element.getAttribute(attributeName);
            this.setHoverAndOnclickEvent(element.parentNode.parentNode, element, element.innerHTML);
            element.innerHTML = "";
        }
    }

    setHoverAndOnclickEvent(elementHover, element, text) {
        elementHover.addEventListener("mouseover", () => this.postTextSlow(element, text));
        elementHover.addEventListener("mouseout", () => this.restText(element));
        elementHover.addEventListener("click", () => {
            this.restText(element);
            this.postTextNow(element, text)
        });
    }

    postTextNow(element, text) {
        element.innerHTML += text
    }

    postTextSlow(element, text) {
        for (let index = 0; index < text.length; index++) {
            const char = text.charAt(index);
            var time = 50 * index;
            var newElement = element;
            this.timeOuts.push(setTimeout(() => { newElement.innerHTML += char; }, time));
        }
    }


    restText(element) {
        for (let index = 0; index < this.timeOuts.length; index++) {
            const timeOut = this.timeOuts[index];
            clearTimeout(timeOut);
        }
        this.timeOuts = [];
        element.innerHTML = "";
    }
}




var helpUser = new HelpUser();
helpUser.saveAllText("helpText");