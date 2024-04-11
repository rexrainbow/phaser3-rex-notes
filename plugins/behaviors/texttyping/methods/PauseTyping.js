var PauseTyping = function () {
    var timer = this.getTimer();
    if (timer) {
        timer.paused = true;
    }
    return this;
}

export default PauseTyping;