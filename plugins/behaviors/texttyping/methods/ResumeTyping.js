var ResumeTyping = function () {
    var timer = this.getTimer();
    if (timer) {
        timer.paused = false;
    }
    return this;
}

export default ResumeTyping;