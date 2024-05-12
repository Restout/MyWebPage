const standardBlock = document.getElementById("standart_print");
const listOfPrints = document.getElementById("list_of_prints");
const gameRules= document.getElementById('game_rules');
const gameText=document.getElementById('game_text');
let game;

function cleanBoard() {
    standardBlock.innerHTML = "";
    listOfPrints.innerHTML = "";
    gameRules.innerHTML="";
    gameText.innerHTML="";
}

function initGame() {
    if(sessionStorage.getItem('mode') === GAME_MODE.SINONIM) {
        game = new GameSinonim(sessionStorage.getItem('level'));
        game.start();

    }
    else if(sessionStorage.getItem('mode') === GAME_MODE.BLITZ) {
        game = new GameBlitz(sessionStorage.getItem('level'));
        game.start();
    }
    else {
        game = new GameTrace(sessionStorage.getItem('level'));
        game.start();
    }
}