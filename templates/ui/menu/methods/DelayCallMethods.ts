import PostUpdateDelayCall from '../../../../plugins/utils/time/PostUpdateDelayCall';

export default {
    delayCall(delay?: any, callback?: any, scope?: any) {
        // Invoke callback under scene's 'postupdate' event
        this.timer = PostUpdateDelayCall(this, delay, callback, scope);
        return this;
    },

    removeDelayCall() {
        if (this.timer) {
            this.timer.remove(false);
            this.timer = undefined;
        }
        return this;
    }
}