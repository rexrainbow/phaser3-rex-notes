var StartTyping = function (text, speed, startIdx, timerStartAt) {
    if (text !== undefined) {
        this.setTypingContent(text);
    }
    if (speed !== undefined) {
        this.speed = speed;
    }
    if (startIdx === undefined) {
        startIdx = 0;
    }

    this.typingIdx = startIdx + 1;
    if (this.speed === 0) {
        this.stop(true);
    } else {
        this.setText('');
        this.startTimer(timerStartAt);
    }

    return this;
}

export default StartTyping;