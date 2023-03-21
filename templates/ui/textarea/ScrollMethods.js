const Clamp = Phaser.Math.Clamp;

export default {
    scrollToLine(lineIndex, clamp) {
        if (clamp) {
            lineIndex = Clamp(lineIndex, 0, this.linesCount);
        }

        this.setChildOY(-this.lineHeight * lineIndex);
        return this;
    },

    scrollToNextLine(lineCount, clamp) {
        if (lineCount === undefined) {
            lineCount = 1;
        }

        var lineIndex = this.lineIndex + lineCount;
        this.scrollToLine(lineIndex, clamp);
        return this;
    }
}