export default {
    scrollToLine(lineIndex) {
        this.childrenMap.child.scrollToLine(lineIndex);
        return this;
    },

    scrollToNextLine(lineCount) {
        this.childrenMap.child.scrollToNextLine(lineCount);
        return this;
    }
}
