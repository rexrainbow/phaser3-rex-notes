export default {
    start() {
        this.mainState.goto('START');
        return this;
    },

    runMatch3() {
        this.mainState.runMatch3();
        return this;
    }
}