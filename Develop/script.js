document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    const quizContainer = document.getElementById("quiz-container");
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices");
    const resultContainer = document.getElementById("result-container");
    const scoreDisplay = document.getElementById("score");
    const initialsInput = document.getElementById("initials");
    const submitScoreButton = document.getElementById("submit-score");
    const highScoresButton = document.getElementById("view-scores-button");
    const highScoresList = document.getElementById("high-scores-list");
    const timerDisplay = document.getElementById("timer-display");
    const answerMessage = document.getElementById("answer-message");
    const playAgainButton = document.getElementById("play-again-button");

    let highScores = [];
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 60; // 60-second timer

    function initializeQuestions() {
        questions = [
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
            // Add more questions here
        ];
    }

    function startQuiz() {
        initializeQuestions();
        startButton.style.display = "none";
        quizContainer.style.display = "block";
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
            answerMessage.textContent = "Correct!";
            answerMessage.classList.remove("incorrect");
            answerMessage.classList.add("correct");
        } else {
            timeLeft -= 5;
            answerMessage.textContent = "Incorrect!";
            answerMessage.classList.remove("correct");
            answerMessage.classList.add("incorrect");
        }
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            endQuiz();
        }
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time Left: ${timeLeft}s`;
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
        resultContainer.appendChild(timerDisplay);
        submitScoreButton.disabled = false;
    }

    submitScoreButton.addEventListener("click", () => {
        const initials = initialsInput.value.trim();
        if (initials !== "") {
            const scoreEntry = { initials: initials, score: score };
            highScores.push(scoreEntry);

            highScores.sort((a, b) => b.score - a.score);

            displayHighScores();

            initialsInput.value = "";
            resultContainer.style.display = "none";
            highScoresList.style.display = "block";
            submitScoreButton.disabled = true;
        } else {
            alert("Please enter your initials.");
        }
    });

    function displayHighScores() {
        highScoresList.innerHTML = "";
        highScores.forEach((entry, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${entry.initials}: ${entry.score}`;
            highScoresList.appendChild(li);
        });
    }

    highScoresButton.addEventListener("click", () => {
        quizContainer.style.display = "none";
        highScoresList.style.display = "block";
        playAgainButton.style.display = "block";
    });

    playAgainButton.addEventListener("click", () => {
        highScoresList.style.display = "none";
        startQuiz();
    });

    startButton.addEventListener("click", startQuiz);
});
