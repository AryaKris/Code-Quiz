var currentQuestionIndex = 0;
var totalQuestions = questions.length;
var timeleft = 75;
var timeInterval = 0;
var timeEl = document.querySelector("#timer");
// query selector Returns the first child element that matches a specified CSS selector(s) of an element
var welcometxt = document.querySelector(".welcome-container");
var scoresSection = document.querySelector("#scoressection");
var highScoresSection = document.querySelector("#highScores");
var mainsection = document.querySelector("#mainsection");
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
    welcometxt.innerHTML = "";
    var allDoneEl = document.createElement("span");
    // allDoneEl.setAttribute("style", "float: center; position: relative;");
    allDoneEl.innerHTML = "Quiz is over and final score is: " + timeleft;
    welcometxt.appendChild(allDoneEl);
    // scoresSection.innerHTML = "";
    // create a form for accepting the initial
    var inputForm = document.createElement("form");
    inputForm.setAttribute("id", "inputForm");

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

        //  or as json as mentioned
        var highScores = JSON.parse(localStorage.getItem("highScores"));
        if (!Array.isArray(highScores) || !highScores.length) {
            var highScores = [];
        }
        var highScore = {
            inputinitials : inputinitials,
            highScores: timeleft
        };
        highScores.push(highScore);
        // store this as session storage
        localStorage.setItem("highScores", JSON.stringify(highScores));
        viewScores();
});

}
// when the user clocks the viewscores button he should be able to see the stored value of the highscores
var score = 0;


// call this function from the index.html page using onclick functionality
function viewScores() {
    
    var inform = document.querySelector("#inputForm");
    var sb  = document.querySelector("#submitBtn");
    if (sb != null && inform != null){
        sb.remove();
        inform.remove();
    }
    welcometxt.remove();    
    
    var highScores = JSON.parse(localStorage.getItem("highScores"));
    if (highScores !== null) {
        var highScoresSize = highScores.length;
        var nameSection = document.createElement("div");
        nameSection.innerHTML = "Name   Scores";
        nameSection.setAttribute("style","font-size: 15px; font-weight: bold;");
        highScoresSection.appendChild(nameSection);
        
        var scoresListSection = document.createElement("div");
        scoresListSection.setAttribute("id","scoresListSection");
        for (var h = 0; h < highScoresSize ; h++){
            var scoreList = document.createElement("li");
            scoreList.innerHTML = highScores[h].inputinitials + "   "+highScores[h].highScores;
            scoresListSection.appendChild(scoreList);
        }
        highScoresSection.appendChild(scoresListSection);
    }

    var goBackBtn = document.createElement("button");
    goBackBtn.setAttribute("id", "goBackButton");
    goBackBtn.setAttribute("style", "position: relative; transition: .5s ease; top: 10 %; left: 45%; padding: 10px 22px; margin: 10px; cursor: pointer; font-size: 18px; background-color: #4CAF50; color: white;");
    goBackBtn.setAttribute("title", "Go back to Home page");
    goBackBtn.innerHTML = "GO BACK";    
    mainsection.appendChild(goBackBtn);
    goBackBtn.onclick = function () {        
        window.location.reload();
    }

    var clearlocalstorageBtn = document.createElement("button");
    clearlocalstorageBtn.setAttribute("id", "clearlocalstorageBtn");
    clearlocalstorageBtn.setAttribute("style", "position: relative; transition: .5s ease; top: 10 %; left: 45%; padding: 10px 22px; margin: 10px; cursor: pointer; font-size: 18px; background-color: #4CAF50; color: white;");
    clearlocalstorageBtn.setAttribute("title", "Clears all the scores");
    clearlocalstorageBtn.innerHTML = "RESET BUTTON";    
    mainsection.appendChild(clearlocalstorageBtn);
    clearlocalstorageBtn.onclick = function () {
        window.localStorage.clear();
        if (document.querySelector("#scoresListSection")!=null){
            document.querySelector("#scoresListSection").remove();

        }
    }
}