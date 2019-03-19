var TextHeightToLinesCount = function (height) {
    // height = (maxLines * (lineHeight + lineSpacing)) - lineSpacing
    return (height - this.textLineSpacing) / (this.textLineHeight + this.textLineSpacing);
}
export default TextHeightToLinesCount;