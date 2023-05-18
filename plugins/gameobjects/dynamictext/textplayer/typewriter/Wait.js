import WaitAny from '../methods/utils/wait/WaitAny.js';

var Wait = function (name) {
    // Already in typingPaused state, or ignore any wait
    if (this.ignoreWait) {
        return this;
    }

    this.pauseTyping();
    WaitAny(this.textPlayer, name, this.resumeTyping, this);

    return this;
}

export default Wait;