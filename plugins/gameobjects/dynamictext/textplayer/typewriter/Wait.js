import WaitCallback from '../methods/utils/wait/WaitCallback.js';
import WaitTime from '../methods/utils/wait/WaitTime.js';
import WaitClick from '../methods/utils/wait/WaitClick.js';
import WaitKey from '../methods/utils/wait/WaitKey.js';
import WaitMultiple from '../methods/utils/wait/WaitMultiple.js';

var Wait = function (name) {
    // Already in typingPaused state, or ignore any wait
    if (this.ignoreWait) {
        return this;
    }

    this.pauseTyping();

    if (name == null) {
        WaitCallback(this.textPlayer, this.resumeTyping, [], this);
    } else if (typeof (name) === 'number') {
        WaitTime(this.textPlayer, name, this.resumeTyping, [], this);
    } else if ((name.length > 1) && (name.indexOf('|') !== -1)) {
        WaitMultiple(this.textPlayer, name, this.resumeTyping, [], this);
    } else if (name === 'click') {
        WaitClick(this.textPlayer, this.resumeTyping, [], this);
    } else {
        WaitKey(this.textPlayer, name, this.resumeTyping, [], this);
    }

    return this;
}

export default Wait;