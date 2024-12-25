let timerInterval;
let timeLeft = 1500; // 25 minutes in seconds

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert('时间到！');
    } else {
        timeLeft--;
    }
}

document.getElementById('start').addEventListener('click', function() {
    if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
    }
});

document.getElementById('pause').addEventListener('click', function() {
    clearInterval(timerInterval);
    timerInterval = null;
});

document.getElementById('reset').addEventListener('click', function() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 1500;
    updateTimer();
});