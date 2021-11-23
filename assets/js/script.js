var timeEl = document.querySelector('#time');
var timeLeft = 90;
var timerId;

// Start block
var startBtn = document.querySelector('#start');
var startPage = document.querySelector('#start-page');

// Question & answers block
var quizBox = document.querySelector('#quiz-box');
var questionText = document.querySelector('#question-text');
var choicesEl = document.querySelector('#choices');
var resultEl = document.querySelector('#result')

// User score block
var scoreBox = document.querySelector('#end-page');
var scoreEl = document.querySelector('#score');
var submitScore = document.querySelector('#submit');
var inputEl = document.querySelector('#input');
var initials = document.querySelector("#initials");

var questions = [
    {
        text: "What does HTML stand for?",
        choices: ["Hyper Text Preprocessor", "Hyper Text Markup Language", "Hyper Text Multiple Language", "Hyper Tool Multi Language"],
        answerIndex: "Hyper Text Markup Language"
    },

    {
        text: "What does CSS stand for?",
        choices: ["Common Style Sheet", "Colorful Style Sheet", "Computer Style Sheet", "Cascading Style Sheet"],
        answerIndex: "Cascading Style Sheet"

    },

    {
        text: "What is NOT included in data types?",
        choices: ["Strings", "Alerts", "Booleans", "Numbers"],
        answerIndex: "Numbers"
    },

    {
        text: "Which of the following is the HTML attribute used when an image does not appear?",
        choices: ["src", "alt", "text", "image"],
        answerIndex: "alt"
    },

    {
        text: "How do you write a function in JavaScript?",
        choices: ["function myFunction()", "function = myFunction()", "function:myFunction()", "myfunction =()"],
        answerIndex: "function myFunction()"
    },

];

var questionIndex = 0;

// Start Quiz

startBtn.addEventListener('click', function startClick(e) {
    // Hide start page
    startPage.style.display = 'none';

    // Start countdown
    timerId = setInterval(countDown, 1000);

    // Show questions and answers 
    quizBox.style.display = 'block';

    startQuiz();
});

function countDown() {
    // Start Countdown timer for quiz
    timeEl.innerHTML = `Time Remaining: ${timeLeft}`;

    // If timer reaches 0 end quiz
    if (timeLeft < 1) {
        clearTimeout(timerId);

        // Display Score
        displayScore();
    }
    timeLeft--;
};

function startQuiz() {
    var currentQuestion = questions[questionIndex];

    questionText.textContent = currentQuestion.text;

    choicesEl.innerHTML = '';

    //clear prev results
    clearResults();

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        // store the answer text
        var answer = currentQuestion.choices[i];
        // Create a button for each answer
        var btn = document.createElement('button');

        btn.setAttribute('class', 'btn');
        // Set the button text to the answers text
        btn.textContent = answer;
        // Append the button to choices
        choicesEl.appendChild(btn);
    };
};

choicesEl.addEventListener('click', function choicesClick(e) {
    e.preventDefault();
    if (!e.target.matches('button')) return;

    var userAnswer = e.target.textContent;

    // Retrieve current question
    var question = questions[questionIndex];

    // Get correct answer
    var correct = question.choices[question.answerIndex];

    // Compare correct answer to user's response
    if (userAnswer === correct) {
        displayCorrect();
    }
    else {
        // If incorrect penalize user by 10 seconds from time, and move to next question.
        timeLeft -= 10;
        displayIncorrect();
    }
    questionIndex++

    if (questionIndex === questions.length) {
        clearTimeout(timerId);
        return displayScore();
    }

    setTimeout(startQuiz, 1000);
});

function displayCorrect() {
    // display correct answer div
    resultEl.style.display = 'block';
    resultEl.textContent = 'Correct!';
};

function displayIncorrect() {
    // set attributes for incorrect answers
    resultEl.style.display = 'block';
    resultEl.textContent = 'Incorrect!';
};

function clearResults() {
    resultEl.style.display = 'none';
}

function displayScore() {
    // Hide everything
    quizBox.style.display = 'none';
    timeEl.style.display = 'none';

    // Show score block
    scoreBox.style.display = 'block';

    // Set the text content for the HTML element that displays the score
    if (timeLeft < 0) {
        scoreEl.textContent = 'Your score is 0'
    }
    else {
        scoreEl.textContent = `Your score is ${timeLeft}`;
    }


};
