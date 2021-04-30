const GetValue = Phaser.Utils.Objects.GetValue;

var RunWordWrap = function (config) {
    // Parse parameters
    var startIndex = GetValue(config, 'start', 0);

    var showAllLines = false;
    var topMargin = GetValue(config, 'topMargin', 0);
    var bottomMargin = GetValue(config, 'bottomMargin', 0);  // Add extra space below last line

    var width = (this.fixedWidth > 0) ? this.fixedWidth : this.width;
    var height = (this.fixedHeight > 0) ? this.fixedHeight : this.height;
    var padding = this.padding;
    var innerWidth = width - padding.left - padding.right,
        innerHeight = height - padding.top - padding.bottom - topMargin - bottomMargin;
    // Get lineHeight, maxLines
    var lineHeight = GetValue(config, 'lineHeight', undefined);
    if (lineHeight === undefined) {
        // Calculate lineHeight via maxLines, in fixedHeight mode
        var maxLines = GetValue(config, 'maxLines', 1);
        lineHeight = innerHeight / maxLines;
    } else {
        if (this.fixedHeight > 0) {
            // Calculate maxLines if not defined, in fixedHeight mode
            var maxLines = GetValue(config, 'maxLines', undefined);
            if (maxLines === undefined) {
                maxLines = Math.floor(innerHeight / lineHeight);
            }
        } else {
            var maxLines = GetValue(config, 'maxLines', 0); // TODO
            showAllLines = (maxLines === 0);
        }

    }

    // Get wrapWidth
    var wrapWidth = GetValue(config, 'wrapWidth', undefined);
    if (wrapWidth === undefined) {
        wrapWidth = innerWidth;
    }

    var letterSpacing = GetValue(config, 'letterSpacing', 0);

    var result = {
        start: startIndex,  // Next start index
        isLastPage: false,  // Is last page
        lineHeight: lineHeight,
        maxLines: maxLines,
        wrapWidth: wrapWidth,
        letterSpacing: letterSpacing,
        children: [],       // Word-wrap result
        lines: []           // Word-wrap result in lines
    }

    // Set all children to active
    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        children[i].setActive(false);
    }

    // Layout children
    var startX = padding.left,
        startY = padding.top + lineHeight + topMargin,  // Start(baseline) from 1st lineHeight, not 0
        x = startX,
        y = startY;
    var remainderWidth = wrapWidth,
        childIndex = startIndex,
        lastChildIndex = children.length;
    var resultChildren = result.children;
    var resultLines = result.lines, lastLine = [];
    var wordResult;
    while (childIndex < lastChildIndex) {
        wordResult = GetWord(children, childIndex, wordResult);
        var word = wordResult.word;
        var wordWidth = wordResult.width;

        childIndex += word.length;
        // Next line
        var isNewLineChar = IsNewLine(word);
        if ((remainderWidth < wordWidth) || isNewLineChar) {
            // Add to result
            if (isNewLineChar) {
                var char = word[0];
                char.setActive().setPosition(x, y);
                resultChildren.push(char);
                lastLine.push(char);
            }

            // Move cursor
            x = startX;
            y += lineHeight;
            remainderWidth = wrapWidth;
            resultLines.push(lastLine);
            lastLine = [];

            if (!showAllLines && (resultLines.length === maxLines)) {  // Exceed maxLines
                break;
            } else if (isNewLineChar) {  // Already add to result                
                continue;
            }
        }
        remainderWidth -= wordWidth;

        for (var i = 0, cnt = word.length; i < cnt; i++) {
            var char = word[i];
            char.setActive().setPosition(x, y);
            resultChildren.push(char);
            lastLine.push(char);
            x += char.width + letterSpacing;
        }
    }

    if (lastLine.length > 0) {
        resultLines.push(lastLine);
    }

    result.start += resultChildren.length;
    result.isLastPage = (result.start === lastChildIndex);

    if (showAllLines) {
        // Expand height to show all lines
        var height = (resultLines.length * lineHeight) + topMargin + bottomMargin + padding.top + padding.bottom;
        this.setSize(width, height);
    }

    return result;
};

var GetWord = function (children, startIndex, result) {
    if (result === undefined) {
        result = { word: [], width: 0 };
    }

    result.word.length = 0;

    var endIndex = children.length;
    var currentIndex = startIndex;
    var word = result.word, wordWidth = 0;
    while (currentIndex < endIndex) {
        var child = children[currentIndex];
        if ((child.type === 'text') && (child.text !== ' ') && (child.text !== '\n')) {
            word.push(child);
            wordWidth += child.width;
            currentIndex++;
            // Continue
        } else {  // Get non-text child, a space, or a new-line
            if (currentIndex === startIndex) { // Single child
                word.push(child);
                wordWidth += child.width;
            }
            break;
        }

    }

    result.width = wordWidth;
    return result;
}

var IsNewLine = function (word) {
    var child = word[0];
    return (child.type === 'text') && (child.text === '\n');
}

export default RunWordWrap;