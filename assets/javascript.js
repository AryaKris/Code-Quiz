var currentQuestionIndex = 0;
var totalQuestions = questions.length;
var timeleft = 60;
var timeEl = document.querySelector("#timer");
// query selector Returns the first child element that matches a specified CSS selector(s) of an element
var welcometxt = document.querySelector(".welcome-container");
// Adding an event listener where the user can click the start button and will be taken to the questions section
document.getElementById("start-button").addEventListener("click",showQuestion );
// Adding an event listener for the user to click the view scores button to view the saved scores
document.getElementById("view-scores").addEventListener("click", viewScores);

function showQuestion() {
    startTimer();    
    
    // inner html Sets or returns the content of an element
    welcometxt.innerHTML = ""
    var choiceSize = questions[currentQuestionIndex].multiChoice.length;
    var questionEl = document.createElement("span");
    questionEl.innerHTML = questions[currentQuestionIndex].title;
    welcometxt.appendChild(questionEl);

    var str_button = document.querySelector(".welcome-container");
// for loop for showing the multiple choices for the question
    for (i = 0; i < choiceSize; i++) {
        var answerchoice = document.createElement("button");
        answerchoice.innerHTML = questions[currentQuestionIndex].multiChoice[i];
        str_button.appendChild(answerchoice);
        answerchoice.onclick = checkAnswer;
    }
}

function checkAnswer(event) {
    if (currentQuestionIndex > totalQuestions - 1) {
        return;
    }
    else {
        if (questions[currentQuestionIndex].answer !== event.target.textContent) {
            console.log("wrong answer selected: ", timeleft);
            timeleft -= 10;
            console.log("new time: ", timeleft);
            setTimeout(function () {
                result.textContent = "";
            }, 500);
        }
        currentQuestionIndex++;
        showQuestion();
    }
}

function startTimer() {
    
    var timeInterval = setInterval(function () {    
        timeleft--;
        console.log("startTimer: ", currentQuestionIndex, " ", (totalQuestions - 1), " ", timeleft);
        if (timeleft <= 0 || (currentQuestionIndex > (totalQuestions -1))) {            
            timeEl.innerHTML = timeleft + " seconds left";
            viewResultPage();
            clearInterval(timeInterval);
        } else {
            timeEl.innerHTML = timeleft + " seconds remaining";
        }
        
    }, 1000);
}

function viewResultPage() {
    console.log("viewResult Page: ", currentQuestionIndex, " ",timeleft);
    
    welcometxt.innerHTML = ""
    var allDoneEl = document.createElement("div");
    allDoneEl.textContent = "All Done!";
    allDoneEl.setAttribute("style","font-size:50px; text-align:center;");
    welcometxt.appendChild(allDoneEl);
    var createForm = document.createElement("FORM");
    createForm.setAttribute("id", "myForm");
    allDoneEl.appendChild(createForm);
}
function viewScores() {


}
// when the user clocks the viewscores button he should be able to see the stored value of the highscores
var score = 0;
var highScores =[];



// in view score form, get the value of the high score from the session storage and show it here in the new function
function storeHighScore() {
    // stringify and set key in local storage to highscores array
    var storedHighscores = JSON.parse(localStorage.getItem("highSCores"));

}


