const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const choicesList = document.getElementById("choices");
const resultContainer = document.getElementById("result-container");
const scoreDisplay = document.getElementById("score");
const initialsInput = document.getElementById("initials");
const submitScoreButton = document.getElementById("submit-score");
const highScoresButton = document.getElementById("high-scores-button");
const highScoresList = document.getElementById("high-scores-list");
const viewScoresButton = document.getElementById("view-scores-button");

const questions = [
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5"],
        correctAnswer: "4"
    },
    {
        question: "What is 5 * 6?",
        choices: ["20", "25", "30"],
        correctAnswer: "30"
    },
    {
        question: "What is 10 / 2?",
        choices: ["2", "5", "10"],
        correctAnswer: "5"
    },
    {
        question: "What is 8 - 3?",
        choices: ["3", "5", "2"],
        correctAnswer: "5"
    },
    {
        question: "What is 7 * 9?",
        choices: ["56", "63", "72"],
        correctAnswer: "63"
    },
    {
        question: "What is 20 / 4?",
        choices: ["5", "4", "10"],
        correctAnswer: "5"
    },
    {
        question: "What is 12 + 18?",
        choices: ["24", "30", "29"],
        correctAnswer: "30"
    },
    {
        question: "What is 15 - 7?",
        choices: ["7", "8", "6"],
        correctAnswer: "8"
    },
    {
        question: "What is 9 * 7?",
        choices: ["56", "63", "72"],
        correctAnswer: "63"
    },
    {
        question: "What is 25 / 5?",
        choices: ["3", "5", "4"],
        correctAnswer: "5"
    }
   
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let highScores = [];

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
        highScores.push({ initials, score });
        highScores.sort((a, b) => b.score - a.score); 
        
        
        alert("Score saved!");

        restartQuiz();
    }
});

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    initialsInput.value = "";
    resultContainer.style.display = "none";
    startButton.style.display = "block";
}

// View High Scores
viewScoresButton.addEventListener("click", () => {
    highScoresList.innerHTML = "";
    highScores.forEach((entry, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${entry.initials}:${entry.score}`;
        highScoresList.appendChild(li);
    });
});

startButton.addEventListener("click", startQuiz);
