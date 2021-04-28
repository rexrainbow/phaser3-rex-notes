const GetValue = Phaser.Utils.Objects.GetValue;

var RunWordWrap = function (config) {
    // Parse parameters
    var lineHeight = GetValue(config, 'lineHeight', undefined);
    if (lineHeight === undefined) {
        var maxLines = GetValue(config, 'maxLines', 1);
        lineHeight = (this.height - this.padding.top - this.padding.bottom) / maxLines;
    }
    var wrapWidth = GetValue(config, 'wrapWidth', undefined);
    if (wrapWidth === undefined) {
        wrapWidth = this.width - this.padding.left - this.padding.right;
    }
    var letterSpacing = GetValue(config, 'letterSpacing', 0);
    var baseLineOffset = GetValue(config, 'baseLineOffset', lineHeight * 0.8);

    // Tokenize children
    var words = Tokenize(this.children);

    // Layout children
    var startX = this.padding.left,
        startY = this.padding.top + baseLineOffset;
    var x = startX,
        y = startY,
        remainderWidth = wrapWidth;
    for (var wi = 0, wcnt = words.length; wi < wcnt; wi++) {
        var word = words[wi];
        var wordWidth = GetWordWidth(word);

        // Next line
        if (remainderWidth < wordWidth) {
            x = startX;
            y += lineHeight;
            remainderWidth = wrapWidth;
        }
        remainderWidth -= wordWidth;

        if (Array.isArray(word)) {
            for (var ci = 0, ccnt = word.length; ci < ccnt; ci++) {
                var char = word[ci];
                char.setPosition(x, y);
                x += char.width + letterSpacing;
            }
        } else {
            word.setPosition(x, y);
            x += wordWidth + letterSpacing;
        }
    }
};

var Tokenize = function (children) {
    var words = [], lastWord = [];
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if ((child.type === 'text') && (child.text !== ' ')) {
            lastWord.push(child);
        } else { // is a space, or not-a-text
            if (lastWord.length > 0) {
                words.push(lastWord);
                lastWord = [];
            }
            words.push(child);
        }
    }
    if (lastWord.length > 0) {
        words.push(lastWord);
    }
    return words;
}

var GetWordWidth = function (word) {
    var width = 0;
    if (Array.isArray(word)) {
        for (var i = 0, cnt = word.length; i < cnt; i++) {
            width += word[i].width;
        }
    } else {
        width += word.width;
    }
    return width;
}

export default RunWordWrap;