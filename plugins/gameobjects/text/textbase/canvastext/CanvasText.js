import DrawMethods from './DrawMethods.js';
import PenManager from '../penmanger/PenManager.js';
import HitAreaManager from '../hitareamanager/HitAreaManager.js';
import SetInteractive from './SetInteractive.js';
import CONST from '../const.js';
import WrapText from './WrapText.js';
import Clone from '../../../../utils/object/Clone.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const NO_WRAP = CONST.NO_WRAP;
const NO_NEWLINE = CONST.NO_NEWLINE;

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

        this.hitAreaManager = new HitAreaManager();

        var context = this.context;
        this.getTextWidth = function (text) {
            return context.measureText(text).width;
        }
    }

    destroy() {
        this.context = undefined;
        this.canvas = undefined;
        this.parser = undefined;
        this.defatultStyle = undefined;

        if (this.penManager) {
            this.penManager.destroy();
            this.penManager = undefined;
        }
        if (this._tmpPenManager) {
            this._tmpPenManager.destroy();
            this._tmpPenManager = undefined;
        }
        if (this.hitAreaManager) {
            this.hitAreaManager.destroy();
            this.hitAreaManager = undefined;
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
                        penManager.addNewLinePen();
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
                var n;
                for (var j = 0, jLen = wrapLines.length; j < jLen; j++) {
                    n = wrapLines[j];
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
        return new PenManager({
            pensPool: this.pensPool,
            tagToText: this.parser.propToTagText,
            tagToTextScope: this.parser
        });
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

var methods = {
    setInteractive: SetInteractive,
}

Object.assign(
    CanvasText.prototype,
    DrawMethods,
    methods
);

export default CanvasText;