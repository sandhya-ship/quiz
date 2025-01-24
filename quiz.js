const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    answer: 0
  },
  {
    question: "2 + 2 = ?",
    options: ["3", "4", "5", "6"],
    answer: 1
  },
  {
    question: "What color is the sky?",
    options: ["Blue", "Green", "Red", "Yellow"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;
let pointsPerQuestion = 10;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const resultElement = document.getElementById('result');

function loadQuestion() {
  const currentQuizData = questions[currentQuestion];
  questionElement.textContent = currentQuizData.question;

  optionsElement.innerHTML = '';
  for (let i = 0; i < currentQuizData.options.length; i++) {
    const option = document.createElement('button'); // Use button for options
    option.classList.add('option');
    option.textContent = currentQuizData.options[i];
    option.addEventListener('click', () => {
      const selectedAnswer = i;
      const allOptions = optionsElement.querySelectorAll('.option');
      allOptions.forEach(option => option.classList.remove('correct', 'incorrect'));

      if (selectedAnswer === currentQuizData.answer) {
        option.classList.add('correct');
        score += pointsPerQuestion;
      } else {
        option.classList.add('incorrect');
      }

      if (currentQuestion === questions.length - 1) {
        nextBtn.disabled = true;
      }
      if (currentQuestion === 0) {
        prevBtn.disabled = true;
      } else {
        prevBtn.disabled = false;
      }

      currentQuestion++;
      if (currentQuestion >= questions.length) {
        showResults();
      }
    });
    optionsElement.appendChild(option);
  }
}

function showResults() {
  questionElement.textContent = '';
  optionsElement.innerHTML = '';
  nextBtn.style.display = 'none';
  prevBtn.style.display = 'none';
  resultElement.textContent = `You scored ${score} points out of ${questions.length * pointsPerQuestion}`;
}

function loadPreviousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

prevBtn.addEventListener('click', loadPreviousQuestion);
nextBtn.addEventListener('click', loadQuestion);

loadQuestion();