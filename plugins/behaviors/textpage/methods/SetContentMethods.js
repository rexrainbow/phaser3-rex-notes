import TextToLines from '../../../utils/text/TextToLines.js';
import GetString from '../../../utils/text/GetString.js';

// Private method, for (TagTextType && !fixedLineHeightMode)
var AppendPageByLineHeight = function (pageStartIndex) {
    var lines = this.lines.lines;
    if (!lines || (lines.length <= pageStartIndex)) {
        return this;
    }

    var pageHeight = this.pageHeight;
    this.pageStartIndexes.push(pageStartIndex);
    if (pageHeight <= 0) {
        return this;
    }

    var i = pageStartIndex;
    var len = lines.length;
    while (i < len) {
        var endLineIdx = this.getLineIndexByHeight(i, pageHeight);
        if (endLineIdx <= i) {
            endLineIdx = i + 1;
        }
        if (endLineIdx >= len) {
            break;
        }
        this.pageStartIndexes.push(endLineIdx);
        i = endLineIdx;
    }

    return this;
};

export default {
    clearText() {
        this.sections.length = 0;
        this.pageStartIndexes.length = 0;
        this.lines.length = 0;

        return this;
    },

    appendPage(text) {
        var pageStartIndex = this.totalLinesCount;

        this.sections.push(GetString(text));
        var text = this.sections.join('\n');
        this.lines = TextToLines(this.parent, text, this.lines);

        var newLinesCount = this.totalLinesCount - pageStartIndex;
        if (newLinesCount <= 0) {
            return this;
        }

        if (this.isVariableLineHeightMode) {  // (TagTextType && !fixedLineHeightMode)
            AppendPageByLineHeight.call(this, pageStartIndex);

        } else {
            var pageLinesCount = this.pageLinesCount;
            var pageCount;
            if (pageLinesCount > 0) {
                pageCount = Math.ceil(newLinesCount / this.pageLinesCount);
            } else {  // Height of Text object might be 0
                pageCount = 1;
            }

            for (var i = 0; i < pageCount; i++) {
                this.pageStartIndexes.push(
                    pageStartIndex + (i * this.pageLinesCount)
                );
            }
        }

        return this;
    },

    setText(text, resetIndex) {
        if (resetIndex === undefined) {
            resetIndex = true;
        }

        if (resetIndex) {
            this.resetIndex();
        }

        this.clearText();

        var sections = GetString(text).split(this.pageBreak);
        // if (sections[sections.length - 1] === '') { // Last section is an empty string
        //     sections.length -= 1;
        // }

        for (var i = 0, cnt = sections.length; i < cnt; i++) {
            this.appendPage(sections[i]);
        }

        return this;
    },

    appendText(text) {
        var content = this.content + GetString(text);
        this.setText(content, false);
        return this;
    },


}
