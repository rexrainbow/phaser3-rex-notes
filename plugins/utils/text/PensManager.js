'use strict'

import Phaser from 'phaser';
import Cache from './../object/Cache.js';
import PenKlass from './Pen.js';
import CONST from './const.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;
const NO_NEWLINE = CONST.NO_NEWLINE;

var PensCache = new Cache();
var LinesCache = new Cache();
class PensManager {
    constructor() {
        this.pens = []; // all pens
        this.lines = []; // pens in lines [ [],[],[],.. ]
    }

    freePens() {
        for (var i = 0, len = this.lines.length; i < len; i++)
            this.lines[i].length = 0;

        PensCache.freeArr(this.pens);
        LinesCache.freeArr(this.lines);
    }

    addPen(config) { // txt, x, y, width, prop, newLineMode
        var pen = PensCache.allocate();
        if (pen == null) {
            pen = new PenKlass();
        }
        pen.resetFromJSON(config);

        var previousPen = this.lastPen;
        if (previousPen == null)
            pen.startIndex = 0;
        else
            pen.startIndex = previousPen.nextStartIndex;
        this.pens.push(pen);

        // maintan lines
        var line = this.lastLine;
        if (line == null) {
            line = LinesCache.allocate() || [];
            this.lines.push(line);
        }
        line.push(pen);

        // new line, add an empty line
        if (pen.newLineMode !== NO_NEWLINE) {
            line = LinesCache.allocate() || [];
            this.lines.push(line);
        }
    }

    clone(targetPensManager) {
        if (targetPensManager == null)
            targetPensManager = new PensManager();

        targetPensManager.freePens();

        var config = {};
        for (var li = 0, llen = this.lines.length; li < llen; li++) {
            var pens = this.lines[li];
            for (var pi = 0, plen = pens.length; pi < plen; pi++) {
                var pen = pens[pi];
                config.x = pen.x;
                config.y = pen.y;
                config.width = pen.width;
                config.prop = pen.prop;
                config.newLineMode = pen.newLineMode;
                targetPensManager.addPen(config);
            }
        }

        return targetPensManager;
    };

    get lastPen() {
        return this.pens[this.pens.length - 1];
    }

    get lastLine() {
        return this.lines[this.lines.length - 1];
    }

    get lineStartIndex(i) {
        var line = this.lines[i];
        if (line == null)
            return 0;

        return line[0].startIndex;
    };

    get lineEndIndex(i) {
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
    };

    getLineWidth(i) {
        var line = this.lines[i];
        if (!line)
            return 0;

        var lastPen = this.lastPen;
        if (lastPen == null)
            return 0;

        var lineWidth = lastPen.lastX; // start from 0
        return lineWidth;
    };

    getMaxLineWidth() {
        var w, maxW = 0;
        for (var i = 0, len = this.lines.length; i < len; i++) {
            w = this.getLineWidth(i);
            if (w > maxW)
                maxW = w;
        }

        return maxW;
    };

    get rawText() {
        var txt = "",
            pens = this.pens;
        for (var i = 0, len = this.pens.lenth; i < len; i++) {
            txt += pens[i].rawText;
        }

        return txt;
    };

    get rawTextLength() {
        var l = 0,
            pens = this.pens;
        for (var i = 0, len = this.pens.lenth; i < len; i++) {
            l += pens[i].rawTextLength;
        }

        return l;
    };

    getSliceTagText(start, end, callback, scope) {
        if (start == null)
            start = 0;
        if (end == null) {
            var lastPen = this.lastPen;
            if (lastPen == null)
                return "";

            end = lastPen.endIndex;
        }

        var txt = "",
            formatTxt,
            pen, penTxt, penStartIdx, penEndIdx, isInRange;
        var currentProp, previousProp;
        for (var i = 0, len = this.pens.length; i < len; i++) {
            pen = this.pens[i];
            penTxt = pen.rawText;
            currentProp = pen.prop;
            penStartIdx = pen.startIndex;
            penEndIdx = pen.nextStartIndex;

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
    };
};

export default PensManager;