import PenManagerKlass from './PenManager.js';
import CONST from './const.js';
import WrapText from './WrapText.js';
import Clone from '../object/Clone.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const NO_WRAP = CONST.NO_WRAP;
const NO_NEWLINE = CONST.NO_NEWLINE;
const HALIGN_LEFT = CONST.hleft;
const HALIGN_CENTER = CONST.hcenter;
const HALIGN_RIGHT = CONST.hright;
const VALIGN_TOP = CONST.vtop;
const VALIGN_CENTER = CONST.vcenter;
const VALIGN_BOTTOM = CONST.vbottom;

class CanvasText {
    constructor(config) {
        this.parent = config.parent;
        this.context = GetValue(config, 'context', null);
        this.canvas = this.context.canvas;
        this.parser = GetValue(config, 'parser', null);
        this.defatultStyle = GetValue(config, 'style', null);
        this.autoRound = true;

        this.pensPool = GetValue(config, 'pensPool', null);
        this.penManager = this.newPenManager();
        this._tmpPenManager = null;

        var context = this.context;
        this.getTextWidth = function (text) {
            return context.measureText(text).width;
        }
    }

    updatePenManager(text, wrapMode, wrapWidth, lineHeight, penManager) {
        if (penManager === undefined) {
            penManager = this.penManager;
        }
        penManager.freePens();
        if (text === "") {
            return penManager;
        }

        var canvas = this.canvas;
        var context = this.context;

        var cursorX = 0,
            cursorY = 0;

        var plainText, curProp, curStyle;
        var match = this.parser.splitText(text),
            result, wrapLines;
        for (var i = 0, len = match.length; i < len; i++) {
            result = this.parser.tagTextToProp(match[i], curProp);
            plainText = result.plainText;
            curProp = result.prop;

            if (curProp.img) { // Image tag                
                var imgWidth = this.imageManager.getOuterWidth(curProp.img);
                if ((wrapWidth > 0) && (wrapMode !== NO_WRAP)) {  // Wrap mode
                    if (wrapWidth < (cursorX + imgWidth)) {
                        cursorY += lineHeight;
                        cursorX = 0;
                    }
                }
                penManager.addImagePen(cursorX, cursorY, imgWidth, Clone(curProp));
                cursorX += imgWidth;
            } else if (plainText !== '') {
                // wrap text to lines
                // Save the current context.
                this.context.save();
                curStyle = this.parser.propToContextStyle(
                    this.defatultStyle,
                    curProp
                );
                curStyle.buildFont();
                curStyle.syncFont(canvas, context);
                curStyle.syncStyle(canvas, context);
                wrapLines = WrapText(plainText, this.getTextWidth, wrapMode, wrapWidth, cursorX);

                // add pens
                for (var j = 0, jLen = wrapLines.length; j < jLen; j++) {
                    var n = wrapLines[j];
                    penManager.addTextPen(n.text, cursorX, cursorY, n.width, Clone(curProp), n.newLineMode);

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

        return penManager;
    }

    draw(startX, startY, boxWidth, boxHeight, penManager) {
        if (penManager === undefined) {
            penManager = this.penManager;
        }
        var context = this.context;
        context.save();

        // this.clear();
        this.drawBackground();

        // draw lines
        var defatultStyle = this.defatultStyle;
        startX += this.startXOffset;
        startY += this.startYOffset;
        var halign = defatultStyle.halign,
            valign = defatultStyle.valign;

        var lineWidth, lineHeight = defatultStyle.lineHeight;
        var lines = penManager.lines;
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

        var offsetX, offsetY;
        if (valign === VALIGN_CENTER) { // center
            offsetY = Math.max((boxHeight - (drawLinesNum * lineHeight)) / 2, 0);
        } else if (valign === VALIGN_BOTTOM) { // bottom
            offsetY = Math.max(boxHeight - (drawLinesNum * lineHeight) - 2, 0);
        } else {
            offsetY = 0;
        }
        offsetY += startY;
        for (var lineIdx = drawLineStartIdx; lineIdx < drawLineEndIdx; lineIdx++) {
            lineWidth = penManager.getLineWidth(lineIdx);
            if (lineWidth === 0) {
                continue;
            }

            if (halign === HALIGN_CENTER) { // center
                offsetX = (boxWidth - lineWidth) / 2;
            } else if (halign === HALIGN_RIGHT) { // right
                offsetX = boxWidth - lineWidth;
            } else {
                offsetX = 0;
            }
            offsetX += startX;

            var pens = lines[lineIdx];
            for (var penIdx = 0, pensLen = pens.length; penIdx < pensLen; penIdx++) {
                this.drawPen(pens[penIdx], offsetX, offsetY);
            }
        }

        context.restore();
    }

    clear() {
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

    drawUnderline(x, y, width, style) {
        y += style.underlineOffset;
        if (this.autoRound) {
            x = Math.round(x);
            y = Math.round(y);
        }

        var context = this.context;
        var savedLineCap = context.lineCap;
        context.lineCap = 'butt';
        context.beginPath();
        context.strokeStyle = style.underlineColor;
        context.lineWidth = style.underlineThickness;
        context.moveTo(x, y);
        context.lineTo((x + width), y);
        context.stroke();
        context.lineCap = savedLineCap;
    }

    drawText(x, y, text, style) {
        if (this.autoRound) {
            x = Math.round(x);
            y = Math.round(y);
        }

        var context = this.context;
        if (style.strokeThickness) {
            style.syncShadow(context, style.shadowStroke);

            context.strokeText(text, x, y);
        }

        if (style.color && (style.color !== 'none')) {
            style.syncShadow(context, style.shadowFill);

            context.fillText(text, x, y);
        }
    }

    drawImage(x, y, imgKey, style) {
        var imageManager = this.parent.imageManager;
        var imgData = imageManager.get(imgKey);
        var frame = imageManager.getFrame(imgKey);

        x += imgData.left;
        y += - this.startYOffset + imgData.y;
        if (this.autoRound) {
            x = Math.round(x);
            y = Math.round(y);
        }

        var context = this.context;
        context.drawImage(
            frame.source.image,
            frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight,
            x, y, imgData.width, imgData.height
        );
    }

    drawPen(pen, offsetX, offsetY) {
        offsetX += pen.x;
        offsetY += pen.y;

        var canvas = this.canvas;
        var context = this.context;
        context.save();

        var curStyle = this.parser.propToContextStyle(
            this.defatultStyle,
            pen.prop
        );
        curStyle.buildFont();
        curStyle.syncFont(canvas, context);
        curStyle.syncStyle(canvas, context);

        // Underline
        if ((curStyle.underlineThickness > 0) && (pen.width > 0)) {
            this.drawUnderline(offsetX, offsetY, pen.width, curStyle);
        }

        // Text
        if (pen.isTextPen) {
            this.drawText(offsetX, offsetY, pen.text, curStyle);
        }

        // Image
        if (pen.isImagePen) {
            this.drawImage(offsetX, offsetY, pen.prop.img, curStyle);
        }

        context.restore();
    }

    destroy() {
        this.context = undefined;
        this.canvas = undefined;
        this.parser = undefined;
        this.defatultStyle = undefined;

        this.penManager.destroy();
        this.penManager = undefined;
        if (this._tmpPenManager) {
            this._tmpPenManager.destroy();
            this._tmpPenManager = undefined;
        }
    }

    get startXOffset() {
        var defatultStyle = this.defatultStyle;
        return (defatultStyle.strokeThickness / 2);
    }

    get startYOffset() {
        var defatultStyle = this.defatultStyle;
        return (defatultStyle.strokeThickness / 2) + defatultStyle.metrics.ascent;
    }

    get lines() {
        return this.penManager.lines;
    }

    get desplayLinesCount() {
        var linesCount = this.penManager.linesCount,
            maxLines = this.defatultStyle.maxLines;
        if ((maxLines > 0) && (linesCount > maxLines)) {
            linesCount = maxLines;
        }
        return linesCount;
    }

    get linesWidth() {
        return this.penManager.getMaxLineWidth();
    }

    get linesHeight() {
        var linesCount = this.desplayLinesCount;
        var linesHeight = (this.defatultStyle.lineHeight * linesCount);
        if (linesCount > 0) {
            linesHeight -= this.defatultStyle.lineSpacing;
        }
        return linesHeight;
    }

    get imageManager() {
        return this.parent.imageManager;
    }

    newPenManager() {
        PENSMANAGER_CONFIG.pensPool = this.pensPool;
        PENSMANAGER_CONFIG.tagToText = this.parser.propToTagText;
        PENSMANAGER_CONFIG.tagToTextScope = this.parser;
        return new PenManagerKlass(PENSMANAGER_CONFIG);
    }

    get tmpPenManager() {
        if (this._tmpPenManager === null) {
            this._tmpPenManager = this.newPenManager();
        }
        return this._tmpPenManager;
    }

    getPlainText(text, start, end) {
        var plainText;
        if (text == null) {
            plainText = this.penManager.plainText;
        } else {
            var m, match = this.parser.splitText(text, 1); // PLAINTEXTONLY_MODE
            plainText = "";
            for (var i = 0, len = match.length; i < len; i++) {
                plainText += match[i];
            }
        }

        if ((start != null) || (end != null)) {
            if (start == null) {
                start = 0;
            }
            if (end == null) {
                end = plainText.length;
            }
            plainText = plainText.substring(start, end);
        }

        return plainText;
    }

    getPenManager(text, retPenManager) {
        if (text === undefined) {
            return this.copyPenManager(retPenManager, this.penManager);
        }

        if (retPenManager === undefined) {
            retPenManager = this.newPenManager();
        }

        var defatultStyle = this.defatultStyle;
        this.updatePenManager(
            text,
            defatultStyle.wrapMode,
            defatultStyle.wrapWidth,
            defatultStyle.lineHeight,
            retPenManager
        );
        return retPenManager;
    }

    getText(text, start, end, wrap) {
        if (text == null) {
            return this.penManager.getSliceTagText(start, end, wrap);
        }

        var penManager = this.tmpPenManager;
        var defatultStyle = this.defatultStyle;
        this.updatePenManager(
            text,
            defatultStyle.wrapMode,
            defatultStyle.wrapWidth,
            defatultStyle.lineHeight,
            penManager
        );

        return penManager.getSliceTagText(start, end, wrap);
    }

    copyPenManager(ret, src) {
        if (src === undefined) {
            src = this.penManager;
        }
        return src.copy(ret);
    }

    getTextWidth(penManager) {
        if (penManager === undefined) {
            penManager = this.penManager;
        }

        return penManager.getMaxLineWidth();
    }

    getLastPen(penManager) {
        if (penManager === undefined) {
            penManager = this.penManager;
        }

        return penManager.lastPen;
    }
};

var PENSMANAGER_CONFIG = {};

export default CanvasText;