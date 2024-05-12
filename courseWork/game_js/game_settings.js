console.log("init_game is connect");
const userName = document.getElementById("user_name");
const levelForm = document.getElementById("level_form");
const descriptoin = document.querySelector(".description");
const modeForm = document.getElementById("mode_form");


userName.textContent = sessionStorage.getItem('username');
modeForm.addEventListener("change", handleModeForm);
sessionStorage.setItem('mode', GAME_MODE.SINONIM);
levelForm.addEventListener("change", handleLevelForm);
sessionStorage.setItem('level', 'easy_level');

function handleModeForm(event) {
    cleanBoard();
    event.preventDefault();
    mode = event.target.value;
    sessionStorage.setItem('mode', mode);
    console.log(sessionStorage.getItem('mode'));
    createStartButton();
}

function handleLevelForm(event) {
    cleanBoard();
    event.preventDefault();
    level = event.target.value;
    sessionStorage.setItem('level', level);
    console.log(sessionStorage.getItem('level'));
    createStartButton();
}
console.log(sessionStorage.getItem('level'));
createStartButton();

function createStartButton() {
    descriptoin.innerHTML='';
    let desc = "";
    const text = document.createElement('div');
    const button = document.createElement('div');
    button.classList.add('submit_button');
    button.textContent = 'Старт';
    switch (sessionStorage.getItem('mode')) {
        case 'sinonim':
            desc = 'В этом режиме вам нужно найти как можно больше слов соотвеотсвующих картинке\n';
            break;
        case 'trace':
            desc = 'В этом режиме вам нужно сопоставить слова друг с другом за отведенное время\n';
            break;
        case 'blitz':
            desc = 'В этом режиме необходимо по заданым признакам выбрать верное слово \n';
            break;
    }
    text.textContent = desc;
    descriptoin.appendChild(text);
    button.addEventListener('click', function () {
        descriptoin.innerHTML='';
        console.log('start');
        initGame();
    });

    descriptoin.appendChild(button);

}