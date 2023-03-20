export default {
    scrollLine(lineCount) {
        if (lineCount === undefined) {
            lineCount = 1;
        }
        var child = this.childrenMap.child;
        var lineHeight = (child.textLineHeight + child.textLineSpacing) * lineCount;
        this.addChildOY(-lineHeight);
        return this;
    }
}