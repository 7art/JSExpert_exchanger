function CountDownTimer(element) {
    this.element = element;
    this.running = false;
    this.millisecondsDuration = 0;
    this.smallDelay = 1000;
    this.interval = null;
}

function format(value) {
    return (value < 10)
        ? `0${value}`
        : `${value}`
}

CountDownTimer.prototype.start = function (duration, done) {
    if (this.running) {
        return
    }

    this.running = true;
    this.millisecondsDuration = parseInt(duration) * 60 * 1000;
    this.interval = setInterval(() => {
        let hours = Math.floor((this.millisecondsDuration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((this.millisecondsDuration % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((this.millisecondsDuration % (1000 * 60)) / 1000);

        this.element.innerText = `${format(hours)}:${format(minutes)}:${format(seconds)}`;



        if (this.millisecondsDuration <= 0) {
            if (typeof done === "function") done();
            this.millisecondsDuration = duration * 60 * 1000 + this.smallDelay;
        }

        this.millisecondsDuration -= 1000;
    }, 1000);
};

CountDownTimer.prototype.stop = function (done) {
    this.millisecondsDuration = 0;
    this.element.innerText = '00:00:00';
    this.running = false;
    clearInterval(this.interval);
    if (typeof done === 'function') {
        done();
    }
};