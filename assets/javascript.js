var questionNum=0;
function showQuestion () {

    var welcometxt = document.querySelector(".welcome-container");
    welcometxt.innerHTML = ""
    var questionEl = document.createElement("span");
    questionEl.innerHTML = questions[questionNum].title;
    welcometxt.appendChild(questionEl);

    var str_button = document.querySelector(".welcome-container");
    var answerOne = document.createElement("button");
    answerOne.innerHTML = questions[questionNum].multiChoice[0];
    str_button.appendChild(answerOne);
    answerOne.onclick = checkAnswer
    var answerTwo = document.createElement("button");
    answerTwo.innerHTML = questions[questionNum].multiChoice[1];
    str_button.appendChild(answerTwo);
    answerTwo.onclick = checkAnswer
    var answerThree = document.createElement("button");
    answerThree.innerHTML = questions[questionNum].multiChoice[2];
    str_button.appendChild(answerThree);
    answerThree.onclick = checkAnswer
    var answerFour = document.createElement("button");
    answerFour.innerHTML = questions[questionNum].multiChoice[3];
    str_button.appendChild(answerFour);
    answerFour.onclick = checkAnswer
    var answerFive = document.createElement("button");
    answerFive.innerHTML = questions[questionNum].multiChoice[4];
    str_button.appendChild(answerFive);
    answerFive.onclick = checkAnswer
    startTimer()


}
// Adding an event listener where the user can click the start button and will be taken to the questions section
document.getElementById("start-button").addEventListener("click",showQuestion );
function checkAnswer(event){
console.log(event.target.textContent)
console.log(questions[questionNum].answer)
if (questions[questionNum].answer ===event.target.textContent){
    
    console.log("correct")
    
}
else {
    time=time-10;
}
 questionNum = questionNum +1 
showQuestion()
}
var time = 75;
var timeEl = document.querySelector ("#timer");
function startTimer () {
    var myfunc = setInterval(function () {
        // code goes here
time--
timeEl.textContent = "Time: "+ time ;
    }, 1000)

}

