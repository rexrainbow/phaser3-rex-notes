import PostStepDelayCall from '../../../utils/time/PostStepDelayCall';

export default {
    delayCall(delay?: any, callback?: any, scope?: any) {
        // Invoke callback under scene's 'postupdate' event
        this.delayCallTimer = PostStepDelayCall(this, delay, callback, scope);
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