var currentQuestionIndex = 0;
var totalQuestions = questions.length;
var timeleft = 75;
var timeInterval = 0;
var timeEl = document.querySelector("#timer");
// query selector Returns the first child element that matches a specified CSS selector(s) of an element
var welcometxt = document.querySelector(".welcome-container");
var correctAnswersCount = 0;

// Adding an event listener where the user can click the start button and will be taken to the questions section
document.querySelector("#start-button").addEventListener("click", function () {
    if (timeInterval === 0) {
        timeInterval = setInterval(function () {
            timeleft--;
            console.log("startTimer: ", currentQuestionIndex, " ", (totalQuestions - 1), " ", timeleft);
            // if timeleft is > zero, but all questions have been answered
            if (timeleft > 0 && (currentQuestionIndex > (totalQuestions - 1))) {
                // if all questions are wrong. timeleft is set to zero else timeleft is the remaining
                if (correctAnswersCount === 0) {
                    timeleft = 0;
                    timeEl.innerHTML = timeleft + " seconds left";
                } else {
                    timeEl.innerHTML = timeleft + " seconds remaining";
                }
                viewResultPage(timeleft);
                clearInterval(timeInterval);
            }
            else if (timeleft <= 0 || (currentQuestionIndex > (totalQuestions - 1))) {
                timeleft = 0;
                timeEl.innerHTML = timeleft + " seconds left";
                // pass this timeLeft to viewResultPage
                viewResultPage(timeleft);
                clearInterval(timeInterval);
            } else {
                timeEl.innerHTML = timeleft + " seconds remaining";
            }
        }, 1000);
    }
    showQuestion();
});

// Adding an event listener for the user to click the view scores button to view the saved scores
document.getElementById("view-scores").addEventListener("click", viewScores);

function showQuestion() {
    // inner html Sets or returns the content of an element
    welcometxt.innerHTML = ""
    var choiceSize = questions[currentQuestionIndex].multiChoice.length;
    var questionEl = document.createElement("span");
    questionEl.innerHTML = questions[currentQuestionIndex].title;
    welcometxt.appendChild(questionEl);

    var str_button = document.querySelector(".welcome-container");
    // for loop for showing the multiple choices for the question
    for (var i = 0; i < choiceSize; i++) {
        var answerchoice = document.createElement("button");
        answerchoice.innerHTML = questions[currentQuestionIndex].multiChoice[i];
        str_button.appendChild(answerchoice);
        answerchoice.addEventListener("click", function (event) {

            if (currentQuestionIndex > totalQuestions - 1) {
                return;
            }
            else {
                if (questions[currentQuestionIndex].answer !== event.target.textContent) {
                    console.log("wrong answer selected: ", timeleft);
                    timeleft -= 10;
                    console.log("new time: ", timeleft);
                } else {
                    correctAnswersCount++;
                }
                currentQuestionIndex++;
                if (currentQuestionIndex <= totalQuestions - 1) {
                    showQuestion();
                }
            }
        });
    }
}

function viewResultPage() {
    console.log("viewResult Page: ", currentQuestionIndex, " ", timeleft);
    // inner html Sets or returns the content of an element
    welcometxt.innerHTML = ""
    var allDoneEl = document.createElement("span");
    allDoneEl.innerHTML = "Quiz is over and final score is: " + timeleft;
    welcometxt.appendChild(allDoneEl);
}

// when the user clocks the viewscores button he should be able to see the stored value of the highscores
var score = 0;
var highScores = [];

function viewScores() {

}

// in view score form, get the value of the high score from the session storage and show it here in the new function
function storeHighScore() {
    // stringify and set key in local storage to highscores array
    var storedHighscores = JSON.parse(localStorage.getItem("highScores"));
}
