const Clamp = Phaser.Math.Clamp;

var GetIndex = function (characterCountOfLines, position) {
    var result = { lineIndex: 0, position: 0 };

    if (position < 0) {
        return result;
    }

    for (var li = 0, lcnt = characterCountOfLines.length; li < lcnt; li++) {
        var characterCount = characterCountOfLines[li];
        if (position <= characterCount) {
            result.lineIndex = li;
            break;
        }
        position -= characterCount;
    }
    result.position = position;

    return result;
}

var GetPosition = function (characterCountOfLines, index) {
    var position = 0;
    var lineIndex = index.lineIndex;
    if (lineIndex < 0) {
        return position;
    }

    for (var li = 0, lcnt = characterCountOfLines.length; li < lcnt; li++) {
        var characterCount = characterCountOfLines[li];
        if (lineIndex > li) {
            position += characterCount;
        } else if (lineIndex === li) {
            position += Math.min(index.position, characterCount);
        } else {
            break;
        }
    }

    return position;
}

export default {
    cursorMoveLeft() {
        if (!this.isOpened) {
            return this;
        }

        // Move cursor to previous character
        var position = Clamp(this.cursorPosition - 1, 0, this.inputText.length);
        this.setCursorPosition(position);

        return this;
    },

    cursorMoveRight() {
        if (!this.isOpened) {
            return this;
        }

        // Move cursor to next character
        var position = Clamp(this.cursorPosition + 1, 0, this.inputText.length);
        this.setCursorPosition(position);

        return this;
    },

    cursorMoveUp() {
        if (!this.isOpened) {
            return this;
        }

        var result = GetIndex(this.characterCountOfLines, this.cursorPosition);
        result.lineIndex -= 1;

        var position = Clamp(GetPosition(this.characterCountOfLines, result), 0, this.inputText.length);
        this.setCursorPosition(position);

        return this;
    },

    cursorMoveDown() {
        if (!this.isOpened) {
            return this;
        }

        var result = GetIndex(this.characterCountOfLines, this.cursorPosition);
        result.lineIndex += 1;

        var position = Clamp(GetPosition(this.characterCountOfLines, result), 0, this.inputText.length);
        this.setCursorPosition(position);

        return this;
    },
}