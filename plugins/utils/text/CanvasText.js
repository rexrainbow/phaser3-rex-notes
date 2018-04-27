'use strict'

import PensManagerKlass from './PensManager.js';
import CONST from './const.js';
import WrapText from './WrapText.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const NO_WRAP = CONST.NO_WRAP;
const NO_NEWLINE = CONST.NO_NEWLINE;

var TMPPENSMGR = null;
class CanvasText {
    constructor(config) {
        this.context = GetValue(config, 'context', null);
        this.canvas = this.context.canvas;
        this.parser = GetValue(config, 'parser', null);
        this.defatultStyle = GetValue(config, 'style', null);
        this.autoRound = true;

        this.pensManager = new PensManagerKlass();
    }

    updatePensManager(text, wrapMode, wrapWidth, lineHeight, pensManager) {
        if (pensManager === undefined) {
            pensManager = this.pensManager;
        }
        pensManager.freePens();
        if (text === "") {
            return pensManager;
        }

        var canvas = this.canvas;
        var ctx = this.context;

        var noWrap = (wrapMode === NO_WRAP);
        var cursorX = 0,
            cursorY = 0;

        var rawText, curProp, curStyle;
        var match = this.parser.splitText(text);
        for (var i = 0, len = match.length; i < len; i++) {
            var result = this.parser.tagTextToProp(match[i], curProp);
            rawText = result.rawText;
            curProp = result.prop;
            curStyle = this.parser.propToContextStyle(
                this.defatultStyle,
                curProp
            );

            if (rawText !== "") {
                if (!noWrap) {
                    // Save the current context.
                    this.context.save();
                    curStyle.syncStyle(canvas, ctx);

                    // wrap text to lines
                    var wrapLines = WrapText(
                        rawText,
                        ctx,
                        wrapMode,
                        wrapWidth,
                        cursorX
                    );

                    // add pens
                    for (var j = 0, jLen = wrapLines.length; j < jLen; j++) {
                        var n = wrapLines[j];
                        pensManager.addPen(
                            n.text,
                            cursorX,
                            cursorY,
                            n.width,
                            curProp,
                            n.newLineMode
                        );

                        if (n.newLineMode !== NO_NEWLINE) {
                            cursorX = 0;
                            cursorY += lineHeight;
                        } else {
                            cursorX += n.width;
                        }

                    }
                    this.context.restore();
                } else {
                    pensManager.addPen(
                        rawText,
                        null,
                        null,
                        null,
                        curProp,
                        NO_NEWLINE
                    );
                }
            }
        }

        return pensManager;
    }

    draw(boxWidth, boxHeight, pensManager) {
        if (pensManager === undefined) {
            pensManager = this.pensManager;
        }
        var context = this.context;
        context.save();

        this.clean();
        this.drawBackground();

        // draw lines
        var defatultStyle = this.defatultStyle;
        var halign = defatultStyle.halign,
            valign = defatultStyle.valign;

        var lineWidth, lineHeight = defatultStyle.lineHeight;

        var lines = pensManager.lines;
        var totalLinesNum = lines.length,
            maxLines = defatultStyle.maxLines;
        var drawLinesNum, drawLineStartIdx, drawLineEndIdx;
        if ((maxLines > 0) && (totalLinesNum > maxLines)) {
            drawLinesNum = maxLines;
            if (valign === 'center') { // center
                drawLineStartIdx = Math.floor((totalLinesNum - drawLinesNum) / 2);
            } else if (valign === 'bottom') { // bottom
                drawLineStartIdx = totalLinesNum - drawLinesNum;
            } else {
                drawLineStartIdx = 0;
            }
        } else {
            drawLinesNum = totalLinesNum;
            drawLineStartIdx = 0;
        }
        drawLineEndIdx = drawLineStartIdx + drawLinesNum;

        var startX = (defatultStyle.strokeThickness / 2);
        var startY = (defatultStyle.strokeThickness / 2) + defatultStyle.metrics.ascent;
        var offsetX, offsetY;
        if (valign === 'center') { // center
            offsetY = Math.max((boxHeight - (drawLinesNum * lineHeight)) / 2, 0);
        } else if (valign === 'bottom') { // bottom
            offsetY = Math.max(boxHeight - (drawLinesNum * lineHeight) - 2, 0);
        } else {
            offsetY = 0;
        }
        offsetY += startY;
        for (var lineIdx = drawLineStartIdx; lineIdx < drawLineEndIdx; lineIdx++) {
            lineWidth = pensManager.getLineWidth(lineIdx);
            if (lineWidth === 0)
                continue;

            if (halign === 'center') // center
                offsetX = (boxWidth - lineWidth) / 2;
            else if (halign === 'right') // right
                offsetX = boxWidth - lineWidth;
            else
                offsetX = 0;
            offsetX += startX;

            var pens = lines[lineIdx];
            for (var penIdx = 0, pensLen = pens.length; penIdx < pensLen; penIdx++) {
                this.drawPen(pens[penIdx], offsetX, offsetY);
            }
        }

        context.restore();
    }

    clean() {
        var canvas = this.canvas;
        this.context.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawBackground() {
        var color = this.defatultStyle.backgroundColor;
        if (color === null) {
            return;
        }
        var ctx = this.context;
        var canvas = this.canvas;
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawUnderline(x, y, width, thickness, color) {
        if (thickness <= 0) {
            return;
        }

        var ctx = this.context;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness;
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.stroke();
    }

    drawPen(pen, offsetX, offsetY) {
        var ctx = this.context;
        ctx.save();

        var curStyle = this.parser.propToContextStyle(
            this.defatultStyle,
            pen.prop
        );
        curStyle.syncStyle(this.canvas, this.context);

        var startX = offsetX + pen.x;
        var startY = offsetY + pen.y;
        if (this.autoRound) {
            startX = Math.round(startX);
            startY = Math.round(startY);
        }

        var text = pen.text;
        var penWidth = pen.width;

        // underline
        this.drawUnderline(
            startX,
            (startY + curStyle.underlineOffset),
            penWidth,
            curStyle.underlineThickness,
            color);

        // draw image: TODO

        // draw text
        if (curStyle.strokeThickness) {
            curStyle.syncShadow(ctx, curStyle.shadowStroke);

            ctx.strokeText(text, startX, startY);
        }

        if (curStyle.color) {
            curStyle.syncShadow(ctx, curStyle.shadowFill);

            ctx.fillText(text, startX, startY);
        }

        ctx.restore();
    }

    destroy() {
        this.context = undefined;
        this.canvas = undefined;
        this.parser = undefined;
        this.defatultStyle = undefined;

        this.pensManager = undefined;
    }

    get lines() {
        return this.pensManager.lines;
    }

    get desplayLinesNum() {
        var linesNum = this.pensManager.linesNum,
            maxLines = this.defatultStyle.maxLines;
        if ((maxLines > 0) && (linesNum > maxLines)) {
            linesNum = maxLines;
        }
        return linesNum;
    }

    get linesWidth() {
        return this.pensManager.getMaxLineWidth();
    }

    get linesHeight() {
        var linesNum = this.desplayLinesNum;
        var linesHeight = (this.defatultStyle.lineHeight * linesNum);
        if (linesNum > 0) {
            linesHeight -= this.defatultStyle.lineSpacing;
        }
        return linesHeight;
    }

    getRawText(text) {
        if (text === undefined) {
            return this.pensMgr.getRawText();
        }

        var m, match = this.parser.splitText(text, 1); // RAWTEXTONLY_MODE
        var result = "";
        for (var i = 0, len = match.length; i < len; i++) {
            result += match[i];
        }

        return result;
    }

    getSubText(start, end, text) {
        if (text === undefined) {
            return this.pensManager.getSliceTagText(start, end, this.parser.prop2TagText);
        }

        if (TMPPENSMGR === null) {
            TMPPENSMGR = new PensManagerKlass();
        }

        // TODO
        //var textSave = this.textInfo.text;
        //this.textInfo.text = text;
        //this.updatePens(TMPPENSMGR, this.textInfo, true);
        //this.textInfo.text = textSave;

        return TMPPENSMGR.getSliceTagText(start, end, this.parser.prop2TagText);
    }

    copyPensManager(pensManager) {
        return this.pensManager.copy(pensManager);
    }

    getTextWidth(pensManager) {
        if (pensManager === undefined) {
            pensManager = this.pensManager;
        }

        return pensManager.getMaxLineWidth();
    }

    getLastPen(pensManager) {
        if (pensManager === undefined) {
            pensManager = this.pensManager;
        }

        return pensManager.lastPen;
    }
};

export default CanvasText;