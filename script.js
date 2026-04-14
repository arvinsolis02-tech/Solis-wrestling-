class WrestlingApp {
    constructor() {
        this.stances = [
            'neutral',
            'referee',
            'top',
            'bottom',
            'sprawl',
        ];
        this.motions = [
            'levelChange',
            'circling',
            'armsDrawn',
            'seatBelt',
            'underhook',
        ];
        this.timer = null;
        this.timeLeft = 0;
        this.isRunning = false;
        this.presetTimes = [30, 60, 180, 300]; // in seconds
        this.init();
    }

    init() {
        // Event listeners for buttons and other interactive elements
        document.getElementById('startButton').addEventListener('click', () => this.startTimer());
        document.getElementById('pauseButton').addEventListener('click', () => this.pauseTimer());
        document.getElementById('resetButton').addEventListener('click', () => this.resetTimer());
        this.presetTimes.forEach(time => {
            const button = document.createElement('button');
            button.innerText = `${time / 60} min`; // convert seconds to minutes for display
            button.addEventListener('click', () => this.setTimer(time));
            document.getElementById('presetContainer').appendChild(button);
        });
    }

    setTimer(seconds) {
        this.timeLeft = seconds;
        this.updateTimerDisplay();
    }

    startTimer() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            if (this.timeLeft <= 0) {
                this.stopTimer();
                this.voiceCallout('Time is up!');
            }
        }, 1000);
    }

    pauseTimer() {
        this.isRunning = false;
        clearInterval(this.timer);
    }

    resetTimer() {
        this.isRunning = false;
        clearInterval(this.timer);
        this.timeLeft = 0;
        this.updateTimerDisplay();
    }

    stopTimer() {
        this.isRunning = false;
        clearInterval(this.timer);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        document.getElementById('timerDisplay').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    voiceCallout(message) {
        const utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
    }
}

// Example of instantiating the class
// const app = new WrestlingApp();