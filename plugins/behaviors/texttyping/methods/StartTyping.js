var StartTyping = function (text, speed, startIndex, timerStartAt) {
    if (text !== undefined) {
        this.setTypingContent(text);
    }
    if (speed !== undefined) {
        this.speed = speed;
    }
    if (startIndex === undefined) {
        startIndex = 0;
    }

    this.typingIndex = startIndex + 1;
    if (this.speed === 0) {
        this.stop(true);
    } else {
        this.setText('');
        this.startTimer(timerStartAt);
    }

    return this;
}

export default StartTyping;