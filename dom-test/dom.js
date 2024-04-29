questions = [
  {
      question: "А когда с человеком может произойти дрожемент?",
      correctAnswer: "Когда он боится, пугается",
      explanation: "Лексема «дрожемент» имплицирует состояние крайнего напряжения и страха: «У меня всегда дрожемент в ногах, когда копы подходят».",
      incorrectAnswers: [
          "Когда он слышит смешную шутку",
          "Когда он идет шопиться",
          "Когда он влюбляется"
      ]
  },
  {
      question: "Говорят, Антон заовнил всех. Это еще как понимать?",
      correctAnswer: "Молодец, Антон, всех победил!",
      explanation: "Термин «заовнить» заимствован из английского языка, он происходит от слова own и переводится как «победить», «завладеть», «получить».",
      incorrectAnswers: [
          "Как так, заовнил? Ну и хамло. Кто с ним теперь дружить-то будет?",
          "Антон очень надоедливый и въедливый человек, всех задолбал",
          "Нет ничего плохого в том, что Антон тщательно выбирает себе друзей"
      ]
  },
  {
      question: "А фразу «заскамить мамонта» как понимать?",
      correctAnswer: "Развести недотепу на деньги",
      explanation: "Заскамить мамонта — значит обмануть или развести на деньги. Почему мамонта? Потому что мошенники часто выбирают в жертвы пожилых людей (древних, как мамонты), которых легко обвести вокруг пальца.",
      incorrectAnswers: [
          "Разозлить кого-то из родителей",
          "Увлекаться археологией",
          "Оскорбить пожилого человека"
      ]
  },
  {
      question: "Кто такие бефефе?",
      correctAnswer: "Лучшие друзья",
      explanation: "Бефефе — это лучшие друзья. Этакая аббревиатура от английского выражения best friends forever.",
      incorrectAnswers: [
          "Вши?",
          "Милые котики, такие милые, что бефефе",
          "Люди, которые не держат слово"
      ]
  }
]

var nowQuestionIndex = 0;
const questionContainer = document.getElementById('questions');
let correctAnswer = null;
let lastQuestion = null;
let correctAnswersCounter = 0;
let incorrectAnswers = [];

questions = mixArray(questions)

function mixArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createQuestion(questionIndex) {
  if (questionIndex >= questions.length) {
      showResult();
      return;
  }
  if (questionContainer.innerHTML !== '') {
      let breakElement = document.createElement('div');
      breakElement.setAttribute('class', 'flex-break');
      questionContainer.appendChild(breakElement);
  }
  let question = questions[questionIndex];
  let questionDiv = document.createElement('div');
  questionDiv.setAttribute('class', 'question');
  questionDiv.setAttribute('num', questionIndex);
  questionDiv.innerHTML = (questionIndex + 1) + ". " + question.question;
  questionContainer.appendChild(questionDiv);
  lastQuestion = questionDiv;
  let allAnswers = mixArray(question.incorrectAnswers.concat([question.correctAnswer]));
  allAnswers.forEach(element => {
      answerDiv = document.createElement('div');
      answerDiv.setAttribute('class', 'answer');
      answerDiv.innerHTML = element;
      questionContainer.appendChild(answerDiv);
      if (element === question.correctAnswer) {
          correctAnswer = answerDiv;
      } else {
          incorrectAnswers.push(answerDiv);
      }
      answerDiv.addEventListener('click', (event) => onClickAnswer(event));
  });
}

function hideElement(element) {
  element.style.transition = "transform 3s, opacity 3s";
  element.style.transform = "translateX(500%)";
  element.style.opacity = 0;
  setTimeout(function () {
      element.remove();
  }, 2000);
}

function onClickAnswer(event) {
  incorrectAnswers.forEach(element => hideElement(element));
  hideElement(correctAnswer);
  setTimeout(() => {
      if (correctAnswer != null && event.srcElement === correctAnswer) {
          imgElement = document.createElement("img");
          imgElement.src = "correct.svg";
          lastQuestion.appendChild(imgElement);
          correctAnswersCounter += 1;
      } else {
          imgElement = document.createElement("img");
          imgElement.src = "incorrect.svg";
          lastQuestion.appendChild(imgElement);
          lastQuestion.innerHTML += '';
      }
      explanation = document.createElement('div');
      explanation.setAttribute('class', 'explanation');
      questionContainer.appendChild(explanation);
      explanation.classList.add('flex-break');
      explanation.innerHTML = questions[nowQuestionIndex].explanation;
      setTimeout(
          () => {
              hideElement(explanation)
              setTimeout(() => {
                  nowQuestionIndex += 1;
                  createQuestion(nowQuestionIndex);
              }, 3000);
          }, 3000
      );
  }, 3000);
}

function showResult() {
  let resultDiv = document.createElement("a");
  resultDiv.setAttribute("class", "results flex-break");
  resultDiv.innerHTML = "Результат: " + correctAnswersCounter + "/" + questions.length;
  resultDiv.style.marginLeft = "1%";
  questionContainer.insertBefore(resultDiv, questionContainer.firstChild)
  let i = 0
  questionContainer.querySelectorAll("div.question").forEach(
      question => {
          question.addEventListener(
              'click',
              (event) => {
                  questionContainer.querySelectorAll("div.answer").forEach((element) => element.remove());
                  answerDiv = document.createElement("div");
                  answerDiv.setAttribute("class", "answer");
                  answerDiv.innerHTML = questions[parseInt(question.getAttribute('num'))].correctAnswer;
                  questionContainer.insertBefore(answerDiv, question.nextSibling);
              }
          )
          i++;
      }
  )
}

createQuestion(nowQuestionIndex);