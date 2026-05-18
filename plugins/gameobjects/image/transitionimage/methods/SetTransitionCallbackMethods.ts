export default {
    setTransitionStartCallback(callback?: any, scope?: any) {
        this.onStartCallback = callback;
        this.onStartCallbackScope = scope;
        return this;
    },

    setTransitionProgressCallback(callback?: any, scope?: any) {
        this.onProgressCallback = callback;
        this.onProgressCallbackScope = scope;
        return this;
    },

    setTransitionCompleteCallback(callback?: any, scope?: any) {
        this.onCompleteCallback = callback;
        this.onCompleteCallbackScope = scope;
        return this;
    },
}