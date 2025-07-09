var LinesCountToTextHeight = function (linesCount) {
    var height = linesCount * (this.textLineHeight + this.textLineSpacing);
    if (linesCount > 1) {
        height -= this.textLineSpacing;
    }
    return height;
}
export default LinesCountToTextHeight;