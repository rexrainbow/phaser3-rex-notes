export default {
    setContentOutputEnable(enable?: any) {
        this.parser.setContentOutputEnable(enable);
        return this;
    },

    setContentCallback(callback?: any, scope?: any) {
        this.contentCallback = callback;
        this.contentCallbackScope = scope;
        return this;
    },
}