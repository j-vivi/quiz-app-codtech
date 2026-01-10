const quizData = [
  {
    question: "Which language is used for web styling?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: 1
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks Text Mark Language",
      "Home Tool Markup Language"
    ],
    answer: 0
  },
  {
    question: "Which tag is used for JavaScript?",
    options: ["<js>", "<script>", "<code>", "<javascript>"],
    answer: 1
  },
  {
    question: "Which HTML tag is used for links?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1
  },
  {
    question: "CSS stands for?",
    options: [
      "Creative Style Sheets",
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: 2
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "<!-- -->", "#", "**"],
    answer: 0
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Google", "Apple", "Netscape", "Microsoft"],
    answer: 2
  },
  {
    question: "Which is NOT a programming language?",
    options: ["Python", "Java", "HTML", "C++"],
    answer: 2
  },
  {
    question: "Which method selects an element by ID?",
    options: [
      "querySelector()",
      "getElementByClass()",
      "getElementById()",
      "selectId()"
    ],
    answer: 2
  },
  {
    question: "Which HTML tag is used for images?",
    options: ["<image>", "<img>", "<src>", "<pic>"],
    answer: 1
  }
];

const letters = ["A", "B", "C", "D"];

let currentQuestion = 0;
let score = 0;

// DOM elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const scoreBox = document.getElementById("scoreBox");
const scoreEl = document.getElementById("score");
const currentQEl = document.getElementById("currentQ");
const totalQEl = document.getElementById("totalQ");

totalQEl.textContent = quizData.length;

// 🚀 Load first question
loadQuestion();

function loadQuestion() {
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
  optionsEl.innerHTML = "";

  const q = quizData[currentQuestion];

  questionEl.textContent = q.question;
  currentQEl.textContent = currentQuestion + 1;

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");

    // ✅ IMPORTANT FIX: textContent (prevents blank options)
    btn.textContent = `${letters[index]}. ${option}`;

    btn.addEventListener("click", () => checkAnswer(btn, index));
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(button, selectedIndex) {
  const correctIndex = quizData[currentQuestion].answer;
  const buttons = optionsEl.querySelectorAll("button");

  buttons.forEach(btn => (btn.disabled = true));

  if (selectedIndex === correctIndex) {
    button.classList.add("correct");
    feedbackEl.textContent = "💖 Correct!";
    score++;
  } else {
    button.classList.add("wrong");
    buttons[correctIndex].classList.add("correct");
    feedbackEl.textContent = "💔 Oops!";
  }

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionEl.textContent = "🎉 Quiz Completed!";
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
  scoreBox.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${quizData.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  scoreBox.classList.add("hidden");
  loadQuestion();
}
