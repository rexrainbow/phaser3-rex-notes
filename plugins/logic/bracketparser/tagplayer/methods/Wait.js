import WaitAny from './utils/wait/WaitAny.js';

var Wait = function (name) {
    // Already in typingPaused state, or ignore any wait
    if (this.ignoreWait) {
        return this;
    }

    this.pause();
    WaitAny(this, name, this.resume, this);

    return this;
}

export default Wait;