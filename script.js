const translations = {
    en: {
        title: "Pomodoro Timer",
        start: "Start",
        pause: "Pause",
        reset: "Reset",
        stats: "Completed Pomodoros: ",
        timeUp: "Time's up!"
    },
    zh: {
        title: "番茄时钟",
        start: "开始",
        pause: "暂停",
        reset: "重置",
        stats: "已完成番茄钟次数：",
        timeUp: "时间到！"
    }
};

let currentLanguage = 'zh';

const languageToggleBtn = document.getElementById('language-toggle');
const title = document.getElementById('title');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const statsDisplay = document.getElementById('stats');

function updateTexts() {
    title.textContent = translations[currentLanguage].title;
    startBtn.textContent = translations[currentLanguage].start;
    pauseBtn.textContent = translations[currentLanguage].pause;
    resetBtn.textContent = translations[currentLanguage].reset;
    updateStats();
}

let timer;
let isRunning = false;
let time = 1500; // 25分钟

function updateDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateStats() {
    let count = localStorage.getItem('pomodoroCount') || 0;
    statsDisplay.textContent = `${translations[currentLanguage].stats}${count}`;
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
            alert(translations[currentLanguage].timeUp);
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

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';
    languageToggleBtn.textContent = currentLanguage === 'en' ? '中文' : 'English';
    updateTexts();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
languageToggleBtn.addEventListener('click', toggleLanguage);

updateTexts();
updateDisplay();
updateStats();