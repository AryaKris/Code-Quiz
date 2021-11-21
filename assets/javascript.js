// declaring variables 
var startBtn = document.querySelector ("#startBtn");
var welcomeContainer = document.querySelector ("#welcomeContainer");
var questions = document.querySelector ("#questions");


//Listen for any clicks in the startBtn 
startBtn.addEventListener("click", startGame);

// Start Quiz function
var startGame = function () { 
    startTimer();
    startQuestion();

}
function startQuestion () {
    welcomeContainer.style.display ="none";
    
}