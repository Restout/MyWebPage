class Game {
    constructor(level) {
        this.level = level;
        this.isEnd = false;
        this.score =0;
        this.randomCollor=false;
        this.correctWords=0;
        this.correctCollor=getRandomColor();
        this.shuffle=false;
        this.lvl=1;
        switch (level) {
            case GAME_LEVEL.EASY:
                this.coefficient = 0.25;
                break;
            case GAME_LEVEL.NORMAL:
                this.coefficient = 0.5;
                break;
            case GAME_LEVEL.HARD:
                this.coefficient = 1;
                break;
        }
        this.gameRules= document.getElementById('game_rules');
        this.gameText=document.getElementById('game_text');

        this.timeStart = Date.now() + (30 * 1000);
        const scoreboard = document.createElement('div');
        scoreboard.classList.add('scoreboard');

        const timeBlock = document.createElement('div');
        timeBlock.classList.add('time_block');
        timeBlock.textContent = "Время: " + Math.floor((this.timeStart - Date.now()) / 1000);

        const scoreBlock = document.createElement('div');
        scoreBlock.classList.add('score_block');
        scoreBlock.textContent = "Очки: " + this.score;

        scoreboard.appendChild(timeBlock);
        scoreboard.appendChild(scoreBlock);
        descriptoin.appendChild(scoreboard);

        this.scoreBlock = document.querySelector('.score_block');
        this.timeBlock = document.querySelector('.time_block');
    }

    running() {
        if (!this.isEnd) {
            this.showGame();
        }
        else {
            this.end();
        }
    }

    end() {
        this.gameRules.innerHTML="";
        this.gameText.innerHTML="";
        descriptoin.innerHTML =
            `Игра окочена, вы набрали ${this.score} очков
        <a href="history_screen.html">
            <div class="history_button">
                    История игр
            </div>
        </a>`;
        const result = {
            score: this.score,
            user_name: sessionStorage.getItem('username'),
            level: this.level,
            date: new Date().toLocaleString(),
        }

        let history = JSON.parse(localStorage.getItem('gameHistory')) || [];
        history.push(result);
        console.log(result);
        localStorage.setItem('gameHistory', JSON.stringify(history));
    }

    start() {
        setTimeout(() => { this.refreshTime() }, 100);
        this.running();
    }

    refreshTime() {
        var scoreBlock = document.querySelector('.time_block');
        if(scoreBlock!=null){
        const timeLeft = Math.floor((this.timeStart - Date.now()) / 1000);
        if (timeLeft < 0) {
            this.isEnd = true;
            this.running();
        }
        else {
            this.timeBlock.textContent = "Время: " + timeLeft;
            setTimeout(() => { this.refreshTime() }, 100);
        }
    }
    }
   
}

class GameBlitz extends Game {
    constructor(level) {
        super(level);
        this.plusScore=5;
        this.minusScore=-2;
    }
  
    showGame(){
        this.gameRules.innerHTML = "";
        this.gameText.innerHTML = "";
        let currentQuestion=questionsAndAnswers[getRandomInt(0,9)];
        let question=currentQuestion[0];
        let correctAnswer=currentQuestion[currentQuestion[4]];
        let answers=currentQuestion.slice(1,4);
        this.gameRules.appendChild(this.addRules(question));
        this.gameText.appendChild(this.createText(answers,correctAnswer));
        switch (this.level) {
            case GAME_LEVEL.EASY:
                this.plusScore=5;
                this.minusScore=-2;
                this.timeStart = Date.now() + (30 * 1000);
                break;
            case GAME_LEVEL.NORMAL:
                this.plusScore=7;
                this.minusScore=-4;
                this.timeStart = Date.now() + (20 * 1000);

                break;
            case GAME_LEVEL.HARD:
                this.plusScore=10;
                this.minusScore=-6;
                this.timeStart = Date.now() + (10 * 1000);
                break;
        }
    }

     createText(answers, correctAnswer) {
        const divElement = document.createElement('div');
      
        answers.forEach(word => {
          const spanElement = document.createElement('span');
          spanElement.className='answer';
          spanElement.textContent = word;
          spanElement.style.cursor = 'pointer';
          // Проверяем, является ли слово корректным
         
          if (correctAnswer==word) {
            spanElement.addEventListener('click', () => this.handleCorrectWordClick(spanElement));
          } else {
            spanElement.addEventListener('click', () => this.handleRegularWordClick(spanElement));
          } 

        spanElement.addEventListener("dragenter", handlerDragenter);
        spanElement.addEventListener("dragover", handlerDragover);
          divElement.appendChild(spanElement);
          divElement.appendChild(document.createTextNode(' '));
        });
          return (divElement);
      }

       addRules(descritpion) {
        const wrapElement=document.createElement('div');
        wrapElement.id="wrap";
        wrapElement.textContent="Найдите слово, подходящее под описание:"
        const divElement = document.createElement('div');
        divElement.id="rules";
        const descElement = document.createElement('div');
        descElement.id="desc";
        descElement.textContent=descritpion;
        // Добавляем изображение к переданному элементу
        divElement.appendChild(descElement);
        wrapElement.appendChild(divElement);
        return(wrapElement);
      }

      // Функция для обработки клика на корректное слово

 handleCorrectWordClick(wordElement) {
    console.log('Корректное слово: ' + wordElement);
      wordElement.style.transition = 'transform 1s, opacity 1s'; 
      wordElement.style.transform = 'translateY(-100px)'; 
      wordElement.style.opacity = '0'; 
      this.score = this.score + this.plusScore;
      console.log(this.score);
      this.scoreBlock.textContent = "Очки: " + this.score;
      setTimeout(() => {
        wordElement.remove();
            if(this.lvl==5){
            this.isEnd=true;
            }else{
                this.lvl++;
                }
            this.running();
      }, 1000);
    }
       // Функция для обработки клика на обычное слово
     handleRegularWordClick(wordElement) {
        console.log('Обычное слово: ' + wordElement.textContent);
        wordElement.style.color = 'red'; // Изменяем цвет на красный
        wordElement.style.transform = 'scale(2)'; // Увеличиваем размер в 2 раза
        wordElement.style.transition = 'all 0.3s'; // Добавляем плавность анимации
        wordElement.style.animation = 'shake 0.5s'; // Применяем анимацию "дергания"
        this.score=this.score+this.minusScore;
        this.scoreBlock.textContent = "Очки: " + this.score;
          // Возвращаем слово к исходному состоянию после небольшой задержки
        setTimeout(() => {
            wordElement.style.color = ''; // Сбрасываем цвет
            wordElement.style.transform = ''; // Сбрасываем увеличение размера
            wordElement.style.animation = ''; // Сбрасываем анимацию "дергания"
        }, 1000); // Задержка в 1000 миллисекунд (1 секунда)


    }
}
class GameSinonim extends Game {
    constructor(level) {
        super(level);
    }
    showGame(){
        this.gameRules.innerHTML = "";
        this.gameText.innerHTML = "";
        let rules=RULES[getRandomInt(0,3)];
        let text=[];
        console.log(rules);
        let image = rules[0];
        this.gameRules.appendChild(this.addRules(image));
        switch (this.level) {
            case GAME_LEVEL.EASY:
                text = TEXT_LEVEL1.slice();
                break;
            case GAME_LEVEL.NORMAL:
                this.shuffle=true;
                break;
            case GAME_LEVEL.HARD:
                this.shuffle=true;
                this.randomCollor=true;
                break;
        }
        switch(this.lvl){
            case 1:
                text = TEXT_LEVEL1.slice();
                break;
            case 2:
                text = TEXT_LEVEL2.slice();
                break;
            case 3:
                text = TEXT_LEVEL3.slice();
                break;

        }
        if(this.shuffle==true){
            shuffleArray(text);
        }
        console.log(text);
        const randomIndex = text.length/10;
        for(let i = 0;i < text.length;i++){
        let randomWordInsert= getRandomInt(0,text.length);
        if(randomWordInsert<=randomIndex){

            text[i]=rules[getRandomInt(1,3)];
            this.correctWords++;
            
        }
        console.log(text);
        }
        this.gameText.appendChild(this.createText(rules,text));
    }

     createText(correctWords,allWords) {
        const divElement = document.createElement('div');
      
        allWords.forEach(word => {
          const spanElement = document.createElement('span');
          spanElement.textContent = word;
          spanElement.style.cursor = 'pointer';
          if(this.randomCollor==true){
            spanElement.style.color=getRandomColor();
           
            if(correctWords.includes(word)){
                let r=getRandomInt(0,1);
                if(r==1){
                    spanElement.addEventListener('click', () => this.handleCorrectWordClick(spanElement));
                    spanElement.style.color=this.correctCollor;
                }else{
                spanElement.addEventListener('click', () => this.handleRegularWordClick(spanElement));
                this.correctWords--;
                }
            }
            spanElement.addEventListener('click', () => this.handleRegularWordClick(spanElement));
          }
          // Проверяем, является ли слово корректным
          if(this.randomCollor==false){
          if (correctWords.includes(word)) {
            spanElement.addEventListener('click', () => this.handleCorrectWordClick(spanElement));
          } else {
            spanElement.addEventListener('click', () => this.handleRegularWordClick(spanElement));
          }
        }
        spanElement.addEventListener("dragenter", handlerDragenter);
        spanElement.addEventListener("dragover", handlerDragover);
          divElement.appendChild(spanElement);
          divElement.appendChild(document.createTextNode(' '));
        });
          return (divElement);
      }

       addRules(imageUrl) {
        const wrapElement=document.createElement('div');
        wrapElement.id="wrap";
        wrapElement.textContent="Найдите слова, синонимичные картинке:"
        const divElement = document.createElement('div');
        divElement.id="rules";
        const imageElement = document.createElement('img');
        imageElement.id="img";
        imageElement.src = imageUrl;
        imageElement.width=150;
        imageElement.style.height="auto";
        // Добавляем изображение к переданному элементу
        divElement.appendChild(imageElement);
        const square=document.createElement('div');
        square.id="square";
        if(this.level==GAME_LEVEL.HARD){
            square.style.backgroundColor=this.correctCollor;
        }
        divElement.appendChild(square);
        wrapElement.appendChild(divElement);
        return(wrapElement);
      }

      handleCorrectWordClick(wordElement) {
        console.log('Корректное слово: ' + wordElement);
            
          wordElement.style.transition = 'transform 1s, opacity 1s'; 
          wordElement.style.transform = 'translateY(-100px)'; 
          wordElement.style.opacity = '0'; 
          this.score = this.score + this.coefficient * 40;
          console.log(this.score);
          this.scoreBlock.textContent = "Очки: " + this.score;
          setTimeout(() => {
            wordElement.remove();
            this.correctWords--;
            if(this.correctWords==0){
                if(this.lvl==3){
                this.isEnd=true;
                }else{
                    this.lvl++;
                    this.timeStart = Date.now() + (20 * 1000);
                }
                this.running();
            }
          }, 1000);
        }
           // Функция для обработки клика на обычное слово
         handleRegularWordClick(wordElement) {
            console.log('Обычное слово: ' + wordElement.textContent);
            wordElement.style.color = 'red'; // Изменяем цвет на красный
            wordElement.style.transform = 'scale(2)'; // Увеличиваем размер в 2 раза
            wordElement.style.transition = 'all 0.3s'; // Добавляем плавность анимации
            wordElement.style.animation = 'shake 0.5s'; // Применяем анимацию "дергания"
            this.score=this.score-5;
            this.scoreBlock.textContent = "Очки: " + this.score;
              // Возвращаем слово к исходному состоянию после небольшой задержки
            setTimeout(() => {
                wordElement.style.color = ''; // Сбрасываем цвет
                wordElement.style.transform = ''; // Сбрасываем увеличение размера
                wordElement.style.animation = ''; // Сбрасываем анимацию "дергания"
            }, 1000); // Задержка в 1000 миллисекунд (1 секунда)
    
    
        }
}
class GameTrace extends Game {

    constructor(level) {
        super(level);
        this.rightAnswer=0;
        this.wrongAnswer=0;
        this.rightBlock=document.createElement('div');
        this.rightBlock.className='right-words';
        this.rightBlock.innerHTML = '';
        this.leftBlock=document.createElement('div');
        this.leftBlock.className='left-words';
        this.leftBlock.innerHTML = '';
        this.chosen = false;
        this.firstSelected;
        this.isLeftSelected = false;
        this.words=3;
    }
    
    showGame(){
       
        switch (this.level) {
            case GAME_LEVEL.EASY:
               this.words=3;
                break;
            case GAME_LEVEL.NORMAL:
                this.words=6
                break;
            case GAME_LEVEL.HARD:
                this.words=10;
                break;
        }
    var traceWrap=document.createElement('div');
    traceWrap.className="trace_wrapper";
    traceWrap.appendChild(this.rightBlock);
    traceWrap.appendChild(this.leftBlock);
    this.gameRules.appendChild(traceWrap);
    shuffleArray(wordsArr);
    this.shuffleParralel(wordsArr[0], wordsArr[1]);
    const leftArr = shuffleArray(wordsArr[0].slice(0,this.words));
    const rightArr = shuffleArray(wordsArr[1].slice(0,this.words));
    console.log(leftArr);
    console.log(rightArr);

    for (let i = 0; i < this.words; i++) {
        let block = document.createElement('p');
        block.classList.add('word-block');
        block.textContent = leftArr[i].word;
        this.addSelected(block);
        block.wordId = leftArr[i].num;
        block.left = true;
        this.leftBlock.append(block);

    }

    for (let i = 0; i < this.words; i++) {
        let block = document.createElement('p');
        block.classList.add('word-block');
        block.textContent = rightArr[i].word;
        this.addSelected(block);
        block.wordId = rightArr[i].num;
        block.left = false;
        this.rightBlock.append(block);
    }
    }

    addSelected(block) {
        block.addEventListener('click', (e) => {
            if (this.chosen) {
                if (this.isLeftSelected != e.target.left) {
                    if (this.firstSelected.wordId === e.target.wordId) {
                        this.firstSelected.classList.add('word-block-right');
                        e.target.classList.add('word-block-right');
                        this.firstSelected.classList.remove('word-block-selected');
                        this.firstSelected.classList.remove('word-block-wrong');
                        e.target.classList.remove('word-block-wrong');
                        this.rightAnswer++;
                        this.score+=10*this.coefficient;
                        this.scoreBlock.textContent = "Очки: " + this.score;
                        if( this.rightAnswer==this.words){
                            this.isEnd=true;
                            this.running();
                        }
                    } else {
                        this.firstSelected.classList.remove('word-block-selected');
                        this.firstSelected.classList.add('word-block-wrong');
                        e.target.classList.add('word-block-wrong');
                        this.wrongAnswer++;
                        if (this.wrongAnswer >= 3) {
                            this.isEnd=true;
                            this.running();
                        }
                    }
                    this.chosen = false;
                }
            } else {
                this.isLeftSelected = e.target.left;
                this.firstSelected = e.target;
                e.target.classList.add('word-block-selected');
                this.chosen = true;
            }
        })
    }

    shuffleParralel(array, array2) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            [array2[currentIndex], array2[randomIndex]] = [
                array2[randomIndex], array2[currentIndex]];
        }
        return array;
    }
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256); // Случайное число от 0 до 255 для красного
    const g = Math.floor(Math.random() * 256); // Случайное число от 0 до 255 для зеленого
    const b = Math.floor(Math.random() * 256); // Случайное число от 0 до 255 для синего
    return `rgb(${r}, ${g}, ${b})`; // Возвращаем строку с RGB цветом
  }

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function handlerDragenter(event) {
    event.preventDefault();
}

function handlerDragover(event) {
    event.preventDefault();
}
