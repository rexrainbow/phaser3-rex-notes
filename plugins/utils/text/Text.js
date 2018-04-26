'use strict'

import PensManagerKlass from './PensManager.js';
import CONST from './const.js';
import WrapText from './WrapText/WrapText.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const NO_WRAP = CONST.NO_WRAP;
const NO_NEWLINE = CONST.NO_NEWLINE;

var TMPPENSMGR = null;
class Text {
    constructor(config) {
        this.context = GetValue(config, 'context', null);
        this.canvas = this.context.canvas;
        this.parser = GetValue(config, 'parser', null);
        this.defatultStyle = GetValue(config, 'style', null);
        this.textChanged = true;

        this.pensManager = new PensManagerKlass();
    }

    updatePensManager(pensManager, config) {
        pensManager.freePens();
        var txt = GetValue(config, 'text', '');
        if (txt === "") {
            return pensManager;
        }

        var wrapMode = GetValue(config, 'wrapMode', NO_WRAP);
        var wrapWidth = GetValue(config, 'wrapWidth', 0);
        var lineHeight = GetValue(config, 'lineHeight', 0);

        var canvas = this.canvas;
        var ctx = this.context;

        var noWrap = (wrapMode === NO_WRAP);
        var startX = 0,
            startY = 0;
        var cursorX = startX,
            cursorY = startY;

        var rawText, curProp, curStyle;
        var match = this.parser.splitText(txt);
        for (var i = 0, len = match.length; i < len; i++) {
            var result = this.parser.tagText2Prop(match[i], curProp);
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
                    WRAPTEXT_CONFIG.wrapMode = wrapMode;
                    WRAPTEXT_CONFIG.wrapWidth = wrapWidth;
                    WRAPTEXT_CONFIG.offset = cursorX - startX;
                    var wrapLines = WrapText(rawText, ctx, WRAPTEXT_CONFIG);

                    // add pens
                    for (var j = 0, jLen = wrapLines.length; j < jLen; j++) {
                        var n = wrapLines[j];
                        PEN_CONFIG.text = n.text;
                        PEN_CONFIG.x = cursorX;
                        PEN_CONFIG.y = cursorY;
                        PEN_CONFIG.width = n.width;
                        PEN_CONFIG.prop = curProp;
                        PEN_CONFIG.newLineMode = n.newLineMode;
                        pensManager.addPen(PEN_CONFIG);

                        if (n.newLineMode !== NO_NEWLINE) {
                            cursorX = startX;
                            cursorY += lineHeight;
                        } else {
                            cursorX += n.width;
                        }

                    }
                    this.context.restore();
                } else {
                    PEN_CONFIG.text = rawText;
                    PEN_CONFIG.x = null;
                    PEN_CONFIG.y = null;
                    PEN_CONFIG.width = null;
                    PEN_CONFIG.prop = curProp;
                    PEN_CONFIG.newLineMode = NO_NEWLINE;
                    pensManager.addPen(PEN_CONFIG);
                }
            }
        }

        return pensManager;
    }

    draw() {
        if (this.textChanged) {
            this.updatePensManager(this.pensManager, this.defatultStyle);
            this.textChanged = false;
        }

        var linesWidth = this.pensManager.getMaxLineWidth();
        var linesNum, maxLines = this.defatultStyle.maxLines;
        if (maxLines > 0) {
            linesNum = Math.min(maxLines, this.pensManager.linesNum);
        } else {
            linesNum = this.pensManager.linesNum;
        }
        var linesHeight = (this.defatultStyle.lineHeight * linesNum);
        if (linesNum > 0) {
            linesHeight -= this.defatultStyle.lineSpacing;
        }

        var padding = this.padding;
        var w = linesWidth + padding.left + padding.right;
        var h = linesHeight + padding.top + padding.bottom;

        this.drawBackground();

        var lines = this.pensManager.lines;
        var drawLinesCnt = lines.length,
            maxDrawLines = this.defatultStyle.maxLines;
        if ((maxDrawLines > 0) && (drawLinesCnt > maxDrawLines)) {
            drawLinesCnt = maxDrawLines;
        }


        var pens, pen;
        var startX, startY;
        var lineWidth, boxWidth, offsetX;
        var halign, valign;
        for (var lineIdx = 0, drawLinesCnt; lineIdx < linesLen; lineIdx++) {
            lineWidth = pensMgr.getLineWidth(lineIdx);
            if (lineWidth === 0)
                continue;

            offsetX = 0;
            //if (halign === 1) // center
            //    offsetX = (boxWidth - lineWidth) / 2;
            //else if (halign === 2) // right
            //    offsetX = boxWidth - lineWidth;
            //else
            //    offsetX = 0;

            offsetX += startX;

            pens = lines[lineIdx];
            for (var penIdx = 0, pensLen = pens.length; penIdx < pensLen; penIdx++) {
                pen = pens[penIdx];
                this.drawPen(pen, offsetX, offsetY);
            }
        }
    }

    drawBackground() {
        var color = this.defatultStyle.backgroundColor;
        if (color === null) {
            return;
        }
        var ctx = this.context;
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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
        var text = pen.text;

        // underline        
        UNDERLINE_PROP.color = curStyle.underlineColor;
        UNDERLINE_PROP.thickness = curStyle.underlineThickness;
        UNDERLINE_PROP.offset = curStyle.underlineOffset;
        this.drawUnderline(text, startX, startY, UNDERLINE_PROP);

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

    drawUnderline(text, x, y, underlineProp) {
        var thickness = underlineProp.thickness;
        if (thickness <= 0) {
            return;
        }
        var ctx = this.context;
        var width = ctx.measureText(text).width;
        //switch(ctx.textAlign)
        //{
        //case "center": x -= (width/2); break;
        //case "right": x -= width; break;
        //}
        y += underlineProp.offset;

        ctx.beginPath();
        ctx.strokeStyle = underlineProp.color;
        ctx.lineWidth = thickness;
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.stroke();
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

var UNDERLINE_PROP = {};
var WRAPTEXT_CONFIG = {};
var PEN_CONFIG = {};

export default Text;