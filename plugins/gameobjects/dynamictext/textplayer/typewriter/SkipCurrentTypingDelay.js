var SkipCurrentTypingDelay = function () {
    if (this.typingTimer) {
        this.typingTimer.seekToEnd();
    }
    return this;
}

export default SkipCurrentTypingDelay;