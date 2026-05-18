export default {
    scrollToLine(lineIndex?: any) {
        this.setChildOY(-this.lineHeight * lineIndex);
        return this;
    },

    scrollToNextLine(lineCount?: any) {
        if (lineCount === undefined) {
            lineCount = 1;
        }

        var lineIndex = this.lineIndex + lineCount;
        this.scrollToLine(lineIndex);
        return this;
    }
}