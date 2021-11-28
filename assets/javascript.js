var currentQuestionIndex = 0;
var totalQuestions = questions.length;
var timeleft = 75;
var timeInterval = 0;
var timeEl = document.querySelector("#timer");
// query selector Returns the first child element that matches a specified CSS selector(s) of an element
var welcometxt = document.querySelector(".welcome-container");
var scoresSection = document.querySelector("#scoressection");
// checks if all the answers were incorrect
var correctAnswersCount = 0;

// Adding an event listener where the user can click the start button and will be taken to the questions section
document.querySelector("#start-button").addEventListener("click", function () {
    if (timeInterval === 0) {
        timeInterval = setInterval(function () {
            timeleft--;
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
        var answerchoiceId = "answerchoice_" + i;
        answerchoice.setAttribute("id", answerchoiceId);
        answerchoice.innerHTML = questions[currentQuestionIndex].multiChoice[i];
        str_button.appendChild(answerchoice);
        answerchoice.addEventListener("click", function (event) {

            for (var id = 0; id < choiceSize; id++) {
                var multiChoiceId = "#answerchoice_" + id;
                document.querySelector(multiChoiceId).disabled = true;
            }

            if (currentQuestionIndex > totalQuestions - 1) {
                return;
            }
            else {
                // checks if the answer is wrong
                if (questions[currentQuestionIndex].answer !== event.target.textContent) {
                    var answerSection = document.createElement("div");
                    answerSection.setAttribute("id", "answersection");
                    answerSection.innerHTML = "Wrong! The correct answer is:  " + questions[currentQuestionIndex].answer;
                    welcometxt.appendChild(answerSection);
                    timeleft -= 10;
                } else {
                    // if the answer is correct
                    var answerSection = document.createElement("div");
                    answerSection.setAttribute("id", "answersection");
                    answerSection.innerHTML = "Answer is correct!! ";
                    welcometxt.appendChild(answerSection);
                    // if the answer is correct update it
                    correctAnswersCount++;
                }
                var nextButton = document.createElement("button");
                nextButton.setAttribute("id", "start-button");
                nextButton.innerHTML = "Next Question";
                welcometxt.appendChild(nextButton);

                // update the index for next question
                currentQuestionIndex++;
                // show the next question only when "Next Button' is clicked.
                if (currentQuestionIndex <= totalQuestions - 1) {
                    nextButton.onclick = function () {
                        showQuestion();
                    }

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
    // allDoneEl.setAttribute("style", "float: center; position: relative;");
    allDoneEl.innerHTML = "Quiz is over and final score is: " + timeleft;
    welcometxt.appendChild(allDoneEl);
    // scoresSection.innerHTML = "";
    // create a form for accepting the initial
    var inputForm = document.createElement("form");

    //Add an input element to form
    var inputText = document.createElement("input");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("id", "initialstext");
    inputText.setAttribute("placeholder", "Enter your initials");
    inputForm.appendChild(inputText);

    // Add it to the document body
    scoresSection.appendChild(inputForm);
    // create a button for submitting the form
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("id", "submitBtn");
    submitBtn.setAttribute("style", "float: center; position: relative;");
    submitBtn.innerHTML = "Submit";
    scoresSection.appendChild(submitBtn);
    // create a key value pair and save the initial and score as an object as the value. Key is some unique id
    submitBtn.addEventListener("click", function (event) {
        var inputinitials = document.getElementById("initialstext").value;
        console.log("text" + " " + inputinitials + " " + timeleft);
        
    });
    //  or as json as mentioned
    // store this as session storage
}

// when the user clocks the viewscores button he should be able to see the stored value of the highscores
var score = 0;
var highScores = [];

// call this function from the index.html page using onclick functionality
function viewScores() {
    // Nullify the Welcome text , welcometxt.innerHTML = ""
    // retrieve the entire values from session storage
    // new create div element to show the scores
    // create another element as a button for go back
    // show the scores in the first div element
    // append them to the welcometext
    // onclick of go back button, call the welcome screen href=https://127.0.0.1/index.html
}

// in view score form, get the value of the high score from the session storage and show it here in the new function
function storeHighScore() {
    // stringify and set key in local storage to highscores array
    var storedHighscores = JSON.parse(localStorage.getItem("highScores"));
}
