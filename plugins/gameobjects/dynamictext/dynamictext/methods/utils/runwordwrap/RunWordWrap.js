import GetWord from './GetWord.js';
import AlignLines from './AlignLines.js';
import { IsTypeable, IsNewLineChar } from '../../../bob/Types.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var RunWordWrap = function (config) {
    // Parse parameters
    var startIndex = GetValue(config, 'start', 0);

    var extraTopPadding = GetValue(config, 'padding.top', 0);
    var extraBottomPadding = GetValue(config, 'padding.bottom', 0);  // Add extra space below last line

    // Get lineHeight, maxLines
    var lineHeight = GetValue(config, 'lineHeight', undefined);
    var maxLines;
    if (lineHeight === undefined) {
        // Calculate lineHeight via maxLines, in fixedHeight mode
        maxLines = GetValue(config, 'maxLines', 0);
        if (this.fixedHeight > 0) {
            var innerHeight = this.fixedHeight - this.padding.top - this.padding.bottom - extraTopPadding - extraBottomPadding;
            lineHeight = innerHeight / maxLines;
        } else {
            lineHeight = 0;
        }
    } else {
        if (this.fixedHeight > 0) {
            // Calculate maxLines via lineHeight, in fixedHeight mode
            maxLines = GetValue(config, 'maxLines', undefined);
            if (maxLines === undefined) {
                var innerHeight = this.fixedHeight - this.padding.top - this.padding.bottom - extraTopPadding - extraBottomPadding;
                maxLines = Math.floor(innerHeight / lineHeight);
            }
        } else {
            maxLines = GetValue(config, 'maxLines', 0); // Default is show all lines
        }

    }
    var showAllLines = (maxLines === 0);

    // Get wrapWidth
    var wrapWidth = GetValue(config, 'wrapWidth', undefined);
    if (wrapWidth === undefined) {
        if (this.fixedWidth > 0) {
            wrapWidth = this.fixedWidth - this.padding.left - this.padding.right;
        } else {
            wrapWidth = Infinity; // No word-wrap
        }
    }

    var letterSpacing = GetValue(config, 'letterSpacing', 0);

    var hAlign = GetValue(config, 'hAlign', 0);
    var vAlign = GetValue(config, 'vAlign', 0);

    var charWrap = GetValue(config, 'charWrap', false);

    var result = {
        start: startIndex,  // Next start index
        isLastPage: false,  // Is last page
        padding: {
            top: extraTopPadding,
            bottom: extraBottomPadding
        },
        lineHeight: lineHeight,
        maxLines: maxLines,
        wrapWidth: wrapWidth,
        letterSpacing: letterSpacing,
        hAlign: hAlign,
        vAlign: vAlign,
        charWrap: charWrap,
        children: [],       // Word-wrap result
        lines: [],          // Word-wrap result in lines
        maxLineWidth: 0,
        linesHeight: 0
    }

    // Set all children to active
    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        children[i].setActive(false);
    }

    // Layout children
    wrapWidth += letterSpacing;
    var startX = this.padding.left,
        startY = this.padding.top + lineHeight + extraTopPadding,  // Start(baseline) from 1st lineHeight, not 0
        x = startX,
        y = startY;
    var remainderWidth = wrapWidth,
        childIndex = startIndex,
        lastChildIndex = children.length;
    var resultChildren = result.children;
    var resultLines = result.lines,
        lastLine = [], lastLineWidth = 0, maxLineWidth = 0;
    var wordResult;
    while (childIndex < lastChildIndex) {
        // Append non-typeable child directly
        var child = children[childIndex];
        if (!IsTypeable(child)) {
            childIndex++;
            child.setActive();
            resultChildren.push(child);
            lastLine.push(child);
            continue;
        }

        wordResult = GetWord(children, childIndex, charWrap, wordResult);
        var word = wordResult.word;
        var charCnt = word.length;
        var wordWidth = wordResult.width + (charCnt * letterSpacing);

        childIndex += charCnt;
        // Next line
        var isNewLineChar = IsNewLineChar(word[0]);
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
            resultLines.push({ children: lastLine, width: lastLineWidth });
            maxLineWidth = Math.max(maxLineWidth, lastLineWidth);

            lastLineWidth = 0;
            lastLine = [];

            if (!showAllLines && (resultLines.length === maxLines)) {  // Exceed maxLines
                break;
            } else if (isNewLineChar) {  // Already add to result                
                continue;
            }
        }
        remainderWidth -= wordWidth;
        lastLineWidth += wordWidth;

        for (var i = 0, cnt = word.length; i < cnt; i++) {
            var char = word[i];
            char.setActive().setPosition(x, y);
            resultChildren.push(char);
            lastLine.push(char);
            x += (char.outerWidth + letterSpacing);
        }
    }

    if (lastLine.length > 0) {
        resultLines.push({ children: lastLine, width: lastLineWidth });
        maxLineWidth = Math.max(maxLineWidth, lastLineWidth);
    }

    result.start += resultChildren.length;
    result.isLastPage = (result.start === lastChildIndex);
    result.maxLineWidth = maxLineWidth;
    result.linesHeight = (resultLines.length * lineHeight) + extraTopPadding + extraBottomPadding;

    // Calculate size of game object
    var width = (this.fixedWidth > 0) ? this.fixedWidth : (result.maxLineWidth + this.padding.left + this.padding.right);
    var height = (this.fixedHeight > 0) ? this.fixedHeight : (result.linesHeight + this.padding.top + this.padding.bottom);

    // Size might be changed after wrapping
    var innerWidth = width - this.padding.left - this.padding.right;
    var innerHeight = height - this.padding.top - this.padding.bottom - extraTopPadding - extraBottomPadding;
    AlignLines(result, innerWidth, innerHeight);

    // Resize
    this.setSize(width, height);

    return result;
};

export default RunWordWrap;