var SetSkipTypingAnimation = function (value) {
    if (value === undefined) {
        value = true;
    }
    this.skipTypingAnimation = value;

    // Skip current playing typing-animation
    var timers = this.timeline.getTimers('anim');
    for (var i = 0, cnt = timers.length; i < cnt; i++) {
        timers[i].seek(1);
    }
    return this;
}

export default SetSkipTypingAnimation;