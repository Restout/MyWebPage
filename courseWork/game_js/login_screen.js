document.getElementById('usernameForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();
  
    if (username !== '') {
      sessionStorage.setItem('username', username);
  
      window.location.href = '../courseWork/main_screen.html';
    } else {
      alert('Необходимо ввести имя!');
    }
  });