const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const choicesList = document.getElementById("choices");
const resultContainer = document.getElementById("result-container");
const scoreDisplay = document.getElementById("score");
const initialsInput = document.getElementById("initials");
const submitScoreButton = document.getElementById("submit-score");

const questions = [
    
];

let currentQuestionIndex = 0;
let score = 0;
let timer;

function startQuiz() {
    startButton.style.display = "none";
    questionContainer.style.display = "block";
    showQuestion(currentQuestionIndex);
    startTimer();
}

function showQuestion(index) {
    const question = questions[index];
    questionText.textContent = question.question;
    choicesList.innerHTML = "";
    question.choices.forEach(choice => {
        const li = document.createElement("li");
        li.textContent = choice;
        li.addEventListener("click", () => checkAnswer(choice, question.correctAnswer));
        choicesList.appendChild(li);
    });
}

function checkAnswer(selectedChoice, correctAnswer) {
    if (selectedChoice === correctAnswer) {
        score++;
    } else {
        
    }
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        endQuiz();
    }
}

function startTimer() {
    let timeLeft = 60; 
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    questionContainer.style.display = "none";
    resultContainer.style.display = "block";
    scoreDisplay.textContent = score;
}

submitScoreButton.addEventListener("click", () => {
    const initials = initialsInput.value.trim();
    if (initials !== "") {
       
        alert("Score saved!");
        
    }
});

startButton.addEventListener("click", startQuiz);
