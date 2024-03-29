//варианты ответов
const option1 = document.querySelector(`.option1`),
	option2 = document.querySelector(`.option2`),
	option3 = document.querySelector(`.option3`),
	option4 = document.querySelector(`.option4`);
const optionElements = document.querySelectorAll(`.option`);
//вопросы
const question = document.querySelector(`.question`);
const numberOfQuestion = document.querySelector(`.number-of-ques`);
const numberOfAllQuestion = document.querySelector(`.number-of-all-ques`);
//модльное окно
const quizModal = document.querySelector(`.quiz-over-modal`);
const correctAnswer = document.querySelector(`.correct-answer`);
const numberOfAllQuesModal = document.querySelector(`.number-of-all-ques-2`);
const btnTryAgain = document.querySelector(`.btn-try-again`);
const modalTitle = document.querySelector(`.modal-title`);
//родитель для маркеров 
const answerTracker = document.querySelector(`.answers-tracker`);
//доп переменые 
let btnNext = document.querySelector(`.btn-next`);

let score = 0;

let indexOfQuestion;
let indexOfPage = 0;

let questions = [
	{
		question: "Результат выражения в JS: '2' * 10 ?",
		option: [
			"20",
			"error",
			"NaN",
			"210"
		],
		rightAnswer: 2
	},
	{
		question: "Как сгенерировать случайное число в JS ?",
		option: [
			"random()",
			"Math.random()",
			"Math.round()",
			"randomInteger"
		],
		rightAnswer: 1
	},
	{
		question: "Результат сравнения в JS '10' === 10 ?",
		option: [
			"true",
			"error",
			"false",
			"нет правильного ответа"
		],
		rightAnswer: 0
	},
	{
		question: "Для чего нужны функции call(), bind(),apply() в JS ?",
		option: [
			"Для математических действий",
			"Для работы с массивом",
			"Для изменение типа данных",
			"Для смены контекста функции"
		],
		rightAnswer: 3
	},
];

numberOfAllQuestion.innerHTML = questions.length;

let completedAnswer = [];

function load(params) {
	question.innerHTML = questions[indexOfQuestion].question;

	option1.innerHTML = questions[indexOfQuestion].option[0];
	option2.innerHTML = questions[indexOfQuestion].option[1];
	option3.innerHTML = questions[indexOfQuestion].option[2];
	option4.innerHTML = questions[indexOfQuestion].option[3];

	indexOfPage++;
	numberOfQuestion.innerHTML = indexOfPage;
}

function randomQuestion(params) {
	let randomNumber = Math.floor(Math.random() * questions.length);
	let questionDuplicate = false;

	if (indexOfPage == questions.length) {
		quizOver();
	} else {
		if (completedAnswer.length > 0) {
			completedAnswer.forEach(function (item) {
				if (item == randomNumber) {
					questionDuplicate = true;
				}
			});
			if (questionDuplicate == true) {
				randomQuestion();
			} else {
				indexOfQuestion = randomNumber;
				load();
			}
		} else if (completedAnswer.length == 0) {
			indexOfQuestion = randomNumber;
			load();
		}
	}
	completedAnswer.push(indexOfQuestion);
	console.log(completedAnswer);
}

for (let item of optionElements) {
	item.addEventListener(`click`, function (event) {
		if (event.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
			event.target.classList.add(`correct`);
			styleCircleAnswer(`correct`)
			score++;
		} else {
			event.target.classList.add(`wrong`);
			styleCircleAnswer(`wrong`)
		}
		disabledAnswer();
	})
}

function disabledAnswer() {
	for (let item of optionElements) {
		item.classList.add(`disabled`);
		if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
			item.classList.add(`correct`);
		}
	}
}
function enabledAnswer() {
	for (let item of optionElements) {
		item.classList.remove(`correct`, `disabled`, `wrong`);
	}
}
function styleCircleAnswer(cssClass) {
	answerTracker.children[indexOfPage - 1].classList.add(cssClass);
}

function createCircleAnswer() {
	for (let i = 0; i < questions.length; i++) {
		let circle = document.createElement(`div`);
		circle.classList.add(`answer-circle`);
		answerTracker.appendChild(circle);
	}
}

btnNext.addEventListener(`click`, function () {
	validate();
})

function validate() {
	if (!option1.classList.contains(`disabled`)) {
		alert(`Выбирите вариант ответа`);
	} else {
		randomQuestion();
		enabledAnswer();
	}
}

function quizOver() {
	quizModal.classList.add(`show-modal`);
	if (score == 0 || score > 1) {
		correctAnswer.innerHTML = score + "  правельных ответов" + " ";
	} else {
		correctAnswer.innerHTML = score + "  правельный ответ" + " ";
	}
	numberOfAllQuesModal.innerHTML = questions.length + " ";
	if (score < 2) {
		modalTitle.innerHTML = "Плохой результат"
	} else {
		modalTitle.innerHTML = "Хороший результат"
	}
}

btnTryAgain.addEventListener(`click`, function () {
	window.location.reload();
})

window.addEventListener(`load`, function () {
	randomQuestion();
	createCircleAnswer()
})