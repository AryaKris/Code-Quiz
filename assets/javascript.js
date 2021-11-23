

// Adding an event listener where the user can click the start button and will be taken to the questions section
document.getElementById("start-button").addEventListener("click", function () {

    var welcometxt = document.getElementById("welcome-text");
    var newHtmlElement = document.createElement("span");
    newHtmlElement.innerHTML = "Bring a question html dom here";
    welcometxt.parentNode.replaceChild(newHtmlElement, welcometxt);

    var str_button = document.getElementById("start-button");
    var newHtmlButton = document.createElement("button");
    newHtmlButton.innerHTML = "Next Question";
    str_button.parentNode.replaceChild(newHtmlButton, str_button);
});