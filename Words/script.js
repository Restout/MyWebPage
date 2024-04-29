const leftContainer = document.getElementById("left_container");
const topContainer = document.getElementById("top_container");
const parseButton = document.getElementById("parseBtn");
const textInp  = document.getElementById("input");
const outDiv = document.getElementById("output");

var draggedObj;

function onParseText() {
    let wordsAndNumbers = textInp.value.split(" - ");
    var words = wordsAndNumbers.filter(item => isNaN(item)).sort();
    var numbers = wordsAndNumbers.filter(item => !isNaN(item)).sort((a, b) => a - b);
    words.forEach((word, index) => {
        createElement("a" + (index + 1) + " " + word);
    });
    numbers.forEach((number, index) => {
        createElement("n" + (index + 1) + " " + number);
    });
}

function createElement(str) {
    let el = document.createElement("div");
    el.setAttribute("class", "element");
    el.innerHTML = str;
    el.draggable = true;
    el.addEventListener('dragstart', function (event){
        draggedObj = event.target;
    })
    topContainer.appendChild(el);
}

leftContainer.addEventListener('dragover', function (event){
    event.preventDefault();
});
topContainer.addEventListener('dragover', function (event) {
    event.preventDefault(); // Это позволяет элементам быть сброшенными в topContainer
});
topContainer.addEventListener('drop', function (event) {
    event.preventDefault();
    if (draggedObj) {
        topContainer.appendChild(draggedObj);
        draggedObj.style.position = 'relative'; // Вернуть к стандартному позиционированию
        draggedObj.style.left = 'auto'; // Убрать инлайновые стили для позиционирования
        draggedObj.style.top = 'auto'; // Убрать инлайновые стили для позиционирования
        fillOutput();
    }
});

leftContainer.addEventListener('drop', function (event){
    event.preventDefault();
    const rect = leftContainer.getBoundingClientRect();
    const x = event.clientX - rect.left - draggedObj.offsetWidth / 2; // Учитываем ширину элемента
    const y = event.clientY - rect.top - draggedObj.offsetHeight / 2; // Учитываем высоту элемента
    draggedObj.style.position = 'absolute'; // Абсолютное позиционирование для свободного перемещения
    draggedObj.style.left = x + 'px';
    draggedObj.style.top = y + 'px';
    leftContainer.appendChild(draggedObj); // Если вы хотите, чтобы элемент оставался в leftContainer
    fillOutput();
});
function fillOutput() {
    outDiv.innerHTML = fillOutputText();
}

function fillOutputText() {
    var elementsArray = Array.from(leftContainer.children);

    // Сортируем массив элементов по позиции X
    elementsArray.sort(function(a, b) {
        var aRect = a.getBoundingClientRect();
        var bRect = b.getBoundingClientRect();
        return aRect.left - bRect.left;
    });

    // Собираем текст из отсортированных элементов
    let answer = elementsArray.map(function(el) {
        // Используем split и slice, чтобы убрать первое слово (индекс элемента)
        return el.innerHTML.split(" ").slice(1).join(" ");
    }).join(" ");

    return answer;
}

parseButton.addEventListener("click", () => {onParseText()})