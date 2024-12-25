// script.js
let timer;
let isRunning = false;
let time = 1500; // 25分钟

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const statsDisplay = document.getElementById('stats');

function updateDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateStats() {
    let count = localStorage.getItem('pomodoroCount') || 0;
    statsDisplay.textContent = `已完成番茄钟次数：${count}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        if (time > 0) {
            time--;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            let count = localStorage.getItem('pomodoroCount') || 0;
            count++;
            localStorage.setItem('pomodoroCount', count);
            updateStats();
            alert('时间到！');
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    time = 1500;
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();
updateStats();