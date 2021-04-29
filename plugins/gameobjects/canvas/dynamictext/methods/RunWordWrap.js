const GetValue = Phaser.Utils.Objects.GetValue;

var RunWordWrap = function (config) {
    // Parse parameters
    var startIndex = GetValue(config, 'start', 0);

    var innerWidth = this.innerWidth,
        innerHeight = this.innerHeight;

    var lineHeight = GetValue(config, 'lineHeight', undefined);
    if (lineHeight === undefined) {
        // Calculate lineHeight via maxLines
        var maxLines = GetValue(config, 'maxLines', 1);
        lineHeight = innerHeight / maxLines;
    } else {
        // Calculate maxLines if not defined
        var maxLines = GetValue(config, 'maxLines', undefined);
        if (maxLines === undefined) {
            maxLines = Math.floor(innerHeight / lineHeight);
        }
    }

    var wrapWidth = GetValue(config, 'wrapWidth', undefined);
    if (wrapWidth === undefined) {
        wrapWidth = innerWidth;
    }

    var letterSpacing = GetValue(config, 'letterSpacing', 0);

    var baselineOffset = GetValue(config, 'baselineOffset', lineHeight * 0.8);
    if (baselineOffset === undefined) {
        if (maxLines === 1) {
            baselineOffset = innerHeight / 2;
        } else {
            baselineOffset = lineHeight * 0.8; // TODO
        }
    }

    var result = {
        start: startIndex,
        lineHeight: lineHeight,
        maxLines: maxLines,
        wrapWidth: wrapWidth,
        letterSpacing: letterSpacing,
        baselineOffset: baselineOffset,
        children: []
    }

    // Set all children to active
    var children = this.children;
    for (var i = startIndex, cnt = children.length; i < cnt; i++) {
        children[i].setActive(false);
    }

    // Layout children
    var startX = this.padding.left,
        startY = this.padding.top + baselineOffset,
        x = startX,
        y = startY;
    var remainderWidth = wrapWidth,
        lineCnt = 1,
        childIndex = startIndex,
        lastChildIndex = children.length;
    var resultChildren = result.children;
    var wordResult;
    while (childIndex < lastChildIndex) {
        wordResult = GetWord(children, childIndex, wordResult);
        var word = wordResult.word;
        var wordWidth = wordResult.width;

        childIndex += word.length;
        // Next line
        if ((remainderWidth < wordWidth) || (IsNewLine(word))) {
            x = startX;
            y += lineHeight;
            remainderWidth = wrapWidth;
            lineCnt++;
            if (lineCnt > maxLines) {
                break;
            }
        }
        remainderWidth -= wordWidth;

        for (var i = 0, cnt = word.length; i < cnt; i++) {
            var char = word[i];
            char
                .setActive()
                .setPosition(x, y);
            resultChildren.push(char);
            x += char.width + letterSpacing;
        }
    }

    result.start += resultChildren.length;
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