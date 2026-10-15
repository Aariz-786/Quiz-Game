const quesJSON = [
  {
    correctAnswer: "Three ",
    options: ["Two", "Three ", "Four", "Five"],
    question: "How many pieces of bun are in a Mcdonald's Big Mac?",
  },
  {
    correctAnswer: "L. Frank Baum",
    options: [
      "Suzanne Collins",
      "James Fenimore Cooper",
      "L. Frank Baum",
      "Donna Leon",
    ],
    question: "Which author wrote 'The Wonderful Wizard of Oz'?",
  },
  {
    correctAnswer: "Atlanta United",
    options: [
      "Atlanta United",
      "Atlanta Impact",
      "Atlanta Bulls",
      "Atlanta Stars",
    ],
    question: "Which of these is a soccer team based in Atlanta?",
  },
  {
    correctAnswer: "A Nanny",
    options: ["A Sow", "A Lioness", "A Hen", "A Nanny"],
    question: "A female goat is known as what?",
  },
  {
    correctAnswer: "P. L. Travers",
    options: [
      "J. R. R. Tolkien",
      "P. L. Travers",
      "Lewis Carroll",
      "Enid Blyton",
    ],
    question: "Which author wrote 'Mary Poppins'?",
  },
];

let score = 0;
let currentQuestion = 0;
let totalScore = quesJSON.length;

const questionEl = document.getElementById("question");
const optionEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");

function showQuestion() {
  questionEl.textContent = quesJSON[currentQuestion].question;

  const options = quesJSON[currentQuestion].options;
  const shuffledOptions = shuffleOptions(options);

  shuffledOptions.forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    optionEl.appendChild(btn);

    btn.addEventListener("click", () => {
      if (btn.classList.contains("submited")) {
        return;
      } else {
        optionEl.querySelector(".selected")?.classList.remove("selected");

        btn.classList.add("selected");
      }
    });
  });
}

showQuestion();

submitBtn.addEventListener("click", () => {
  const selectedOption = optionEl.querySelector(".selected")?.textContent;

  if (!selectedOption) {
    alert("Please select an option before submitting.");
    return;
  }

  if (
    selectedOption.trim() === quesJSON[currentQuestion].correctAnswer.trim()
  ) {
    score++;
  } else {
    score -= 0.25;
  }

  updateScore();

  optionEl.querySelectorAll("button").forEach((btn) => {
    btn.classList.add("submited");
    btn.disabled = true;
  });

   optionEl.querySelector(".selected")?.classList.remove("selected");
  submitBtn.disabled = true;

});

function shuffleOptions(options) {
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  optionEl.textContent = "";
  if (currentQuestion >= quesJSON.length) {
    questionEl.textContent = "Quiz Completed!!";
    nextBtn.remove();
    submitBtn.remove();
    scoreEl.textContent = `Final Score: ${score} / ${totalScore}`;
  } else {
    submitBtn.disabled = false;
    showQuestion();
  }
});

function updateScore() {
  scoreEl.textContent = `Score: ${score}/${totalScore}`;
}
