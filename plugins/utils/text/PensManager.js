'use strict'

import PoolKlass from './../object/Pool.js';
import PenKlass from './Pen.js';
import CONST from './const.js';
import Clone from './../object/Clone.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;
const NO_NEWLINE = CONST.NO_NEWLINE;

var PensPool = new PoolKlass(); // default pens pool
var LinesPool = new PoolKlass(); // default lines pool
class PensManager {
    constructor(config) {
        this.pens = []; // all pens
        this.lines = []; // pens in lines [ [],[],[],.. ]
        this.maxLinesWidth = undefined;

        this.PensPool = GetFastValue(config, 'pensPool', PensPool);
        this.LinesPool = GetFastValue(config, 'linesPool', LinesPool);
    }

    destroy() {
        this.freePens();
    }

    freePens() {
        for (var i = 0, len = this.lines.length; i < len; i++)
            this.lines[i].length = 0;

        this.PensPool.freeArr(this.pens);
        this.LinesPool.freeArr(this.lines);
        this.maxLinesWidth = undefined;
    }

    addPen(text, x, y, width, prop, newLineMode) {
        var pen = this.PensPool.allocate();
        if (pen == null) {
            pen = new PenKlass();
        }
        PEN_CONFIG.text = text;
        PEN_CONFIG.x = x;
        PEN_CONFIG.y = y;
        PEN_CONFIG.width = width;
        PEN_CONFIG.prop = prop;
        PEN_CONFIG.newLineMode = newLineMode;
        pen.resetFromJSON(PEN_CONFIG);

        var previousPen = this.lastPen;
        if (previousPen == null)
            pen.startIndex = 0;
        else
            pen.startIndex = previousPen.nextStartIndex;
        this.pens.push(pen);

        // maintan lines
        var line = this.lastLine;
        if (line == null) {
            line = this.LinesPool.allocate() || [];
            this.lines.push(line);
        }
        line.push(pen);

        // new line, add an empty line
        if (pen.newLineMode !== NO_NEWLINE) {
            line = this.LinesPool.allocate() || [];
            this.lines.push(line);
        }
        this.maxLinesWidth = undefined;
    }

    clone(targetPensManager) {
        if (targetPensManager == null)
            targetPensManager = new PensManager();

        targetPensManager.freePens();

        for (var li = 0, llen = this.lines.length; li < llen; li++) {
            var pens = this.lines[li];
            for (var pi = 0, plen = pens.length; pi < plen; pi++) {
                var pen = pens[pi];
                targetPensManager.addPen(
                    pen.text,
                    pen.x,
                    pen.y,
                    pen.width,
                    Clone(pen.prop),
                    pen.newLineMode
                );
            }
        }

        return targetPensManager;
    }

    get lastPen() {
        return this.pens[this.pens.length - 1];
    }

    get lastLine() {
        return this.lines[this.lines.length - 1];
    }

    getLineStartIndex(i) {
        var line = this.lines[i];
        if (line == null)
            return 0;

        return line[0].startIndex;
    }

    getLineEndIndex(i) {
        var li, hasLastPen = false,
            line;
        for (li = i; li >= 0; li--) {
            line = this.lines[li];
            hasLastPen = (line != null) && (line.length > 0);
            if (hasLastPen)
                break;
        }
        if (!hasLastPen)
            return 0;

        var lastPen = line[line.length - 1];
        return lastPen.endIndex;
    }

    getLineWidth(i) {
        var line = this.lines[i];
        if (!line)
            return 0;

        var lastPen = line[line.length - 1];
        if (lastPen == null)
            return 0;

        var lineWidth = lastPen.lastX; // start from 0
        return lineWidth;
    }

    getMaxLineWidth() {
        if (this.maxLinesWidth !== undefined) {
            return this.maxLinesWidth;
        }
        var w, maxW = 0;
        for (var i = 0, len = this.lines.length; i < len; i++) {
            w = this.getLineWidth(i);
            if (w > maxW)
                maxW = w;
        }
        this.maxLinesWidth = maxW;
        return maxW;
    }

    getLineWidths() {
        var result = [];
        for (var i = 0, len = this.lines.length; i < len; i++) {
            result.push(this.getLineWidth(i));
        }
        return result;
    }

    get linesNum() {
        return this.lines.length;
    }

    get rawText() {
        var txt = "",
            pens = this.pens;
        for (var i = 0, len = pens.length; i < len; i++) {
            txt += pens[i].rawText;
        }

        return txt;
    }

    get rawTextLength() {
        var l = 0,
            pens = this.pens;
        for (var i = 0, len = this.pens.length; i < len; i++) {
            l += pens[i].rawTextLength;
        }

        return l;
    }

    getSliceTagText(start, end, wrap, callback, scope) {
        if (start == null) {
            start = 0;
        }
        if (end == null) {
            var lastPen = this.lastPen;
            if (lastPen == null)
                return "";

            end = lastPen.nextStartIndex;
        }
        if (wrap == null) {
            wrap = false;
        }

        var txt = "",
            formatTxt,
            pen, penTxt, penStartIdx, penEndIdx, isInRange;
        var currentProp, previousProp;
        for (var i = 0, len = this.pens.length; i < len; i++) {
            pen = this.pens[i];
            penTxt = (!wrap) ? pen.rawText : pen.wrapText;
            currentProp = pen.prop;
            penStartIdx = pen.startIndex;
            penEndIdx = pen.endIndex;

            if (penEndIdx < start)
                continue;

            isInRange = (penStartIdx >= start) && (penEndIdx < end);
            if (!isInRange) {
                penTxt = penTxt.substring(start - penStartIdx, end - penStartIdx);
            }

            if (scope) {
                txt += callback.apply(scope, penTxt, currentProp, previousProp);
            } else {
                txt += callback(penTxt, currentProp, previousProp);
            }

            previousProp = currentProp;

            if (penEndIdx >= end)
                break;
        }

        return txt;
    }
};

var PEN_CONFIG = {};

export default PensManager;