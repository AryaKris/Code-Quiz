var currentQuestionIndex = 0;
var questionChoice = questions.length;
// Adding an event listener where the user can click the start button and will be taken to the questions section
document.getElementById("start-button").addEventListener("click",showQuestion );

function showQuestion() {
    startTimer();
    // query selector Returns the first child element that matches a specified CSS selector(s) of an element
    var welcometxt = document.querySelector(".welcome-container");
    // inner html Sets or returns the content of an element
    welcometxt.innerHTML = ""
    console.log("currentQuestionIndex: ", currentQuestionIndex);
    var choiceSize = questions[currentQuestionIndex].multiChoice.length;
    var questionEl = document.createElement("span");
    questionEl.innerHTML = questions[currentQuestionIndex].title;
    welcometxt.appendChild(questionEl);

    var str_button = document.querySelector(".welcome-container");

    for (i = 0; i < choiceSize; i++) {
        var answerchoice = document.createElement("button");
        answerchoice.innerHTML = questions[currentQuestionIndex].multiChoice[i];
        str_button.appendChild(answerchoice);
        answerchoice.onclick = checkAnswer;
    }
}

function checkAnswer(event) {
    if (!questions[currentQuestionIndex].answer === event.target.textContent) {
        console.log("wrong answer selected");
        time = time - 10;
    }
    console.log("currentQuestionIndex_1: ", currentQuestionIndex);
    if (currentQuestionIndex < questionChoice-1){
        currentQuestionIndex++;
        showQuestion();
    }
}

var timeleft = 75;
var timeEl = document.querySelector("#timer");
function startTimer() {
    setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(startTimer);
            timeEl.innerHTML = "Finished";
        } else {
            timeEl.innerHTML = timeleft + " seconds remaining";
        }
        timeleft -= 1;
    }, 1000);
}

