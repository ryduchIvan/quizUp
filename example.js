const option1 = document.querySelector(`.option1`),//создаем переменые для каждого варианта ответа
	option2 = document.querySelector(`.option2`),
	option3 = document.querySelector(`.option3`),
	option4 = document.querySelector(`.option4`);

const optionElements = document.querySelectorAll(`.option`);//создаем переменую для всех вариантов ответа

const question = document.querySelector(`.question`);//вопрос 
const numberOfQuestion = document.querySelector(`.number-of-ques`);//число конкретного вопроса 
const numberOfAllQuestion = document.querySelector(`.number-of-all-ques`);//количество всех вопросов

let indexOfQuestion;//индекст текущего вопроса
let indexOfPage = 0;//индекст текущей страницы

let score = 0;//количество правильных ответов 

const answersTracker = document.querySelector(`.answers-tracker`);//родитель , для маркеров правильный ли ответ или нет
const btnNext = document.querySelector(`.btn-next`);//кнопка для перехода к следущему вопросу

//МОДАЛЬНЫЕ ПЕРЕМЕНЫЕ 

const quizModal = document.querySelector(`.quiz-over-modal`),//все модальное окн
	correctAnswer = document.querySelector(`.correct-answer`),//правильные ответы 
	numberOfAlQuesModal = document.querySelector(`.number-of-all-ques-2`),//Количество всех вопросов
	btnTryAgain = document.querySelector(`.btn-try-again`);//кнопка для запуска занова теста


//СОЗДАЕМ МАССИВ ДЛЯ ВОПРОСА И ВАРИАНТА ОТВЕТОВ К НЕМУ 

let questions = [
	{
		question: "Как в JS сгенерировать случайное число?",
		option: [
			"random()",
			"Math.round()",
			"Math.random()",
			"randomInteger()"
		],
		rightAnswer: 2
	},
	{
		question: "Как результат у данного выражения 2 * '10'",
		option: [
			"NaN",
			"20",
			"210",
			"error"
		],
		rightAnswer: 0
	},
	{
		question: "Для чего нужен localStorge?",
		option: [
			"Для работы с массивом данных",
			"Для работы с DOM",
			"Для матиматических выражения",
			"Для хранения данных в браузере"
		],
		rightAnswer: 3
	},
	{
		question: "Для чего нужны методы bind, call, apply?",
		option: [
			"Для филтрации массива",
			"Для изминения контекста функии",
			"Для клонирования классов",
			"Нет правильного ответа"
		],
		rightAnswer: 1
	},
]

numberOfAllQuestion.innerHTML = questions.length;

function load() {//создаем шаблон окна 
	question.innerHTML = questions[indexOfQuestion].question;//вносим значение вопроса

	option1.innerHTML = questions[indexOfQuestion].option[0];//вносим значение ответов
	option2.innerHTML = questions[indexOfQuestion].option[1];
	option3.innerHTML = questions[indexOfQuestion].option[2];
	option4.innerHTML = questions[indexOfQuestion].option[3];

	numberOfQuestion.innerHTML = indexOfPage + 1;//вносим значение текущего вопроса
	indexOfPage++;
}

let completedAnswer = [];//создаем массив в который попдут индексы вопросов , на которые уже был получен ответ

function randomQuestion() {//создаем функцию которая 
	let randomNumber = Math.floor(Math.random() * questions.length);//создаем случайное число в диапозоне от 0 до количества вопросов
	let questionDuplicate = false;//создаем перемуню котора будет отвечать , было ли уже вызван вопрос или нет 
	if (indexOfPage == questions.length) {//если индекст страницы равен количеству вопросов( на все вопросы был дан ответ )
		quizOver();//тогда запускаем функцию которая показывает модальное окно
	} else {//если нет 
		if (completedAnswer.length > 0) {//тогда проверяем , если наш массив не пустой(в который добовляютсья индексы вопросов)
			completedAnswer.forEach(function (item) {//тогда перебыраем массив
				if (item == randomNumber) {//если элемент в массиве равен новому сгенерированному числу 
					questionDuplicate = true;//тогда совпадение есть , и мы присваем true переменой
				}
			});
			if (questionDuplicate == true) {//если совпадение есть
				randomQuestion();//тогда запускай функию которая еще раз сгенерирует число 
			} else {//если совпадения нет 
				indexOfQuestion = randomNumber;//тогда приравнивай индекс
				load();//и рисую шаблон вопроса
			}
		} else if (completedAnswer.length == 0) {//если массив пустой
			indexOfQuestion = randomNumber;//тогда добовляй в массив сгенерированое число
			load();//и ресую шаблон
		}
	}
	completedAnswer.push(indexOfQuestion);//добовляй в массив индексы вопроса
	console.log(completedAnswer);
}

function examinationAnswer(answer) {
	console.log(answer.target);
}

//ФУНКЦИЯ ДЛЯ ПРОВЕРКИ ПРАВИЛЬНЫЙ ЛИ ОТВЕТ
for (let item of optionElements) {//перебераем все варианты
	item.addEventListener(`click`, function (event) {//вешаем на них клик
		if (event.target.dataset.id == questions[indexOfQuestion].rightAnswer) {//если атрибут дата ответа равняеться правильному ответу 
			event.target.classList.add(`correct`);//тогда этот варинат получаеть класс correct
			styleAnswerCircle(`correct`);//запускаем стилизацию маркеров 
			score++;//увеличиваем количество верных ответов
		} else {//если нет
			event.target.classList.add(`wrong`);//получает класс wrong
			styleAnswerCircle(`wrong`);//запускаем стилизацию маркеров 
		}
		disabledAnswer();//после клика запускаем функцию котоаря
	})
}

function disabledAnswer() {
	optionElements.forEach(function (item) {//перебираем все ответы
		item.classList.add(`disabled`);//на все ответы вешаем класс disabled
		if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {//но если id равняеться верному ответу тогда 
			item.classList.add(`correct`);//вешаем класс correct
		}
	})
}

function enableAnswer() {
	optionElements.forEach(function (item) {
		item.classList.remove(`correct`, `wrong`, `disabled`);//убираем доп класс у вариантов
	})
}
console.log(indexOfPage);
function styleAnswerCircle(cssClass) {
	console.log(answersTracker.children[indexOfPage - 1].classList.add(cssClass));//стилизируем их
}

function createAnswerTracker() {//создаем маркеры ответов , добовляем их к родителю
	questions.forEach(function () {
		let answerCircle = document.createElement(`div`);
		answerCircle.classList.add(`answer-circle`);
		answersTracker.appendChild(answerCircle);
	})
}

function validate() {//функция которая проверяет выбран ли ответ
	if (!option1.classList.contains(`disabled`)) {
		alert(`Выбирите ответ`);
	} else {//если нет то запускаем следущий шаблон
		randomQuestion();
		enableAnswer();
	}
}

btnNext.addEventListener(`click`, validate);//запускаем проверку через клик кнопки

function quizOver() {
	quizModal.classList.add(`show-modal`);
	numberOfAlQuesModal.innerHTML = questions.length;
	//correctAnswer.innerHTML = score + `верных ответа`;
	if (score == 1) {
		correctAnswer.innerHTML = score + `верный ответ  `;
	} else if (score == 0) {
		correctAnswer.innerHTML = score + `верных ответов  `;
	} else {
		correctAnswer.innerHTML = score + `верных ответа
		  `;
	}
}
btnTryAgain.addEventListener(`click`, function () {
	window.location.reload();
})
window.addEventListener(`load`, function () {//запуска функции ( которые ниже) при загрузке страницы
	randomQuestion();
	createAnswerTracker();
})