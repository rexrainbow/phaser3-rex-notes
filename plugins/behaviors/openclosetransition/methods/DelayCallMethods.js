import PostUpdateDelayCall from '../../../utils/time/PostUpdateDelayCall.js';

export default {
    delayCall(delay, callback, scope) {
        // Invoke callback under scene's 'postupdate' event
        this.delayCallTimer = PostUpdateDelayCall(this, delay, callback, scope);
        return this;
    },

    removeDelayCall() {
        if (this.delayCallTimer) {
            this.delayCallTimer.remove(false);
            this.delayCallTimer = undefined;
        }
        return this;
    }

}