'use strict'

import PensManagerKlass from './PensManager.js';
import CONST from './const.js';
import WrapText from './WrapText.js';
import Clone from './../object/Clone.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const NO_WRAP = CONST.NO_WRAP;
const NO_NEWLINE = CONST.NO_NEWLINE;
const HALIGN_LEFT = CONST.hleft;
const HALIGN_CENTER = CONST.hcenter;
const HALIGN_RIGHT = CONST.hright;
const VALIGN_TOP = CONST.vtop;
const VALIGN_CENTER = CONST.vcenter;
const VALIGN_BOTTOM = CONST.vbottom;

var TMPPENSMGR = null;
class CanvasText {
    constructor(config) {
        this.context = GetValue(config, 'context', null);
        this.canvas = this.context.canvas;
        this.parser = GetValue(config, 'parser', null);
        this.defatultStyle = GetValue(config, 'style', null);
        this.autoRound = true;

        this.pensPool = GetValue(config, 'pensPool', null);
        this.pensManager = new PensManagerKlass(this);

        var context = this.context;
        this.getTextWidth = function (text) {
            return context.measureText(text).width;
        }
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
        var context = this.context;

        var cursorX = 0,
            cursorY = 0;

        var rawText, curProp, curStyle;
        var match = this.parser.splitText(text);
        for (var i = 0, len = match.length; i < len; i++) {
            var result = this.parser.tagTextToProp(match[i], curProp);
            rawText = result.rawText;
            curProp = result.prop;

            // wrap text to lines
            if (rawText !== '') {
                // Save the current context.
                this.context.save();
                curStyle = this.parser.propToContextStyle(
                    this.defatultStyle,
                    curProp
                );
                curStyle.syncFont(canvas, context, true);
                curStyle.syncStyle(canvas, context);
                var wrapLines = WrapText(
                    rawText,
                    this.getTextWidth,
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
                        Clone(curProp),
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
            if (valign === VALIGN_CENTER) { // center
                drawLineStartIdx = Math.floor((totalLinesNum - drawLinesNum) / 2);
            } else if (valign === VALIGN_BOTTOM) { // bottom
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
        if (valign === VALIGN_CENTER) { // center
            offsetY = Math.max((boxHeight - (drawLinesNum * lineHeight)) / 2, 0);
        } else if (valign === VALIGN_BOTTOM) { // bottom
            offsetY = Math.max(boxHeight - (drawLinesNum * lineHeight) - 2, 0);
        } else {
            offsetY = 0;
        }
        offsetY = startY;
        for (var lineIdx = drawLineStartIdx; lineIdx < drawLineEndIdx; lineIdx++) {
            lineWidth = pensManager.getLineWidth(lineIdx);
            if (lineWidth === 0)
                continue;

            if (halign === HALIGN_CENTER) // center
                offsetX = (boxWidth - lineWidth) / 2;
            else if (halign === HALIGN_RIGHT) // right
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
        var context = this.context;
        var canvas = this.canvas;
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawUnderline(x, y, width, thickness, color) {
        if (thickness <= 0) {
            return;
        }

        var context = this.context;
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = thickness;
        context.moveTo(x, y);
        context.lineTo(x + width, y);
        context.stroke();
    }

    drawPen(pen, offsetX, offsetY) {
        var canvas = this.canvas;
        var context = this.context;
        context.save();

        var curStyle = this.parser.propToContextStyle(
            this.defatultStyle,
            pen.prop
        );
        curStyle.syncFont(canvas, context, true);
        curStyle.syncStyle(canvas, context);

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
            curStyle.underlineColor);

        // draw image: TODO

        // draw text
        if (curStyle.strokeThickness) {
            curStyle.syncShadow(context, curStyle.shadowStroke);

            context.strokeText(text, startX, startY);
        }

        if (curStyle.color) {
            curStyle.syncShadow(context, curStyle.shadowFill);

            context.fillText(text, startX, startY);
        }

        context.restore();
    }

    destroy() {
        this.context = undefined;
        this.canvas = undefined;
        this.parser = undefined;
        this.defatultStyle = undefined;

        this.pensManager.destroy();
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

    getRawText(text, start, end) {
        var rawText;
        if (text == null) {
            rawText = this.pensManager.rawText;
        } else {
            var m, match = this.parser.splitText(text, 1); // RAWTEXTONLY_MODE
            rawTextt = "";
            for (var i = 0, len = match.length; i < len; i++) {
                rawText += match[i];
            }
        }

        if ((start != null) || (end != null)) {
            if (start == null) {
                start = 0;
            }
            if (end == null) {
                end = rawText.length;
            }
            rawText = rawText.substring(start, end);
        }

        return rawText;
    }

    getSubText(text, start, end, wrap) {
        if (text == null) {
            return this.pensManager.getSliceTagText(start, end, wrap, this.parser.propToTagText);
        }

        if (TMPPENSMGR === null) {
            TMPPENSMGR = new PensManagerKlass();
        }

        var defatultStyle = this.defatultStyle;
        this.updatePensManager(
            text,
            defatultStyle.wrapMode,
            defatultStyle.wrapWidth,
            defatultStyle.lineHeight,
            TMPPENSMGR
        );

        return TMPPENSMGR.getSliceTagText(start, end, wrap, this.parser.propToTagText);
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