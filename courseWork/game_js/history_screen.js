function displayHistory() {
    const history = JSON.parse(localStorage.getItem('gameHistory'));

    if (!history || history.length === 0) {
      document.getElementById('historyTable').innerHTML = 'Нет сохраненной истории игры';
      return;
    }

    let tableHTML = `<table><tr><th>Пользователь</th><th>Результат</th><th>Урвень сложности</th><th>Дата и время</th></tr>`;

    history.forEach((result) => {
      tableHTML += `<tr><td>${result.user_name}</td><td>${result.score}</td><td>${result.level}</td><td>${result.date}</td></tr>`;
    });

    tableHTML += '</table>';
    document.getElementById('historyTable').innerHTML = tableHTML;
}

displayHistory();