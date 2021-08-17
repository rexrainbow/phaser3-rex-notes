export default {
    setTransitionStartCallback(callback, scope) {
        this.onStartCallback = callback;  // function(frontImage, backImage) {}
        this.onStartCallbackScope = scope;
        return this;
    },

    setTransitionProgressCallback(callback, scope) {
        this.onProgressCallback = callback;  // function(frontImage, backImage, t) {}
        this.onProgressCallbackScope = scope;
        return this;
    },

    setTransitionCompleteCallback(callback, scope) {
        this.onCompleteCallback = callback; // function(frontImage, backImage) {}
        this.onProgressCallbackScope = scope;
        return this;
    }
}