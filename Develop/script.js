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
    let questions = [
        {
            question: "What does HTML stand for?",
            choices: ["Hypertext Markup Language", "Hyperlink and Text Markup Language", "Highly Textual Markup Language"],
            correctAnswer: "Hypertext Markup Language"
        },
        {
            question: "Which of the following is NOT a JavaScript data type?",
            choices: ["String", "Number", "Boolean", "Float"],
            correctAnswer: "Float"
        },
        {
            question: "What is CSS used for?",
            choices: ["Styling web pages", "Managing server-side operations", "Creating databases", "Analyzing data"],
            correctAnswer: "Styling web pages"
        },
        {
            question: "What is the purpose of a JavaScript function?",
            choices: ["To store data", "To style web pages", "To perform a specific task", "To create HTML elements"],
            correctAnswer: "To perform a specific task"
        },
        {
            question: "What does the 'git commit' command do?",
            choices: ["Stages changes for commit", "Deletes files from the repository", "Creates a new branch", "Pushes changes to a remote repository"],
            correctAnswer: "Stages changes for commit"
        }
        // Add more questions here
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 60; // 60-second timer

    function startQuiz() {
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
