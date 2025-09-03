export default {
    getSelectedChess1() {
        return this.mainState.selectedChess1;
    },

    getSelectedChess2() {
        return this.mainState.selectedChess2;
    },

    selectChess1(chess) {
        // state === 'SELECT1START'
        this.mainState.selectChess1(chess);
        return this;
    },

    selectChess2(chess) {
        // state === 'SELECT2START'
        this.mainState.selectChess2(chess);
        return this;
    },

    clickChess(chess) {
        // state === 'SELECT2START'
        this.mainState.clickChess(chess);
        return this;
    },

    setInputEnable(enable) {
        if (this.input) {
            this.input.setEnable(enable);
        }
        return this;
    },

    // State
    isAwaitingInput() {
        // state === 'SELECT1START' || state === 'SELECT2START'
        return this.mainState.isAwaitingInput();
    },
}