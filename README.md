# Code-Quiz
Building a timed coding quiz with multiple-choice questions.
First step was to  to create a basic HTML page and a CSS style sheet. 

# working on the introductory page
The user should be able to click the start quiz button. On clicking the start button button, I should be able to manipulate the dom to remove or hide the welcome page and display the timer and the first question. 
# Timer 
Timer should be running once the quiz starts and should stop once the quiz ends. The remianing time of the timer should be displayed as the final score. Also, for each wrong answer the user should be losing 10 seconds from the timer. 
If the user selects all the questions wrong the final score would display as zero. 
# Initials and submit button
Once the quiz has been completed or if the user ran out of time he should be able to provide his initials and submit it. For this I created a form element and submit button. 
# Local storage
Final step was saving the scores and initial to the local storage. The local storage stores data even after the browser is closed. Local storage can only use strings to store the data and hence made use of JSON stringify() method. When the user clicks the view store button at the top left end he would be able to see the stored initials and highscores. 
# Reset and Go Back buttons 
The reset button clears the local storage and the go back button takes you to the home page. 
# External Javascript files
I have added 2 external javascript files - one for the quiz questions and the second one for all the functions to make the quiz interactive. 

Link to the deployed page - https://aryakris.github.io/Code-Quiz/
[alt text](https://github.com/AryaKris/Code-Quiz/blob/main/assets/Images/Screen%20Shot%202021-11-28%20at%2011.06.34.png)