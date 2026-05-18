export default {
    setContentCallback(callback?: any, scope?: any) {
        this.contentCallback = callback;
        this.contentCallbackScope = scope;
        return this;
    }
}