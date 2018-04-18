'use strict'

import CONST from './const.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;
const RAW_NEWLINE = CONST.RAW_NEWLINE;

class Pen {
    constructor(config) {
        this.prop = {};
        this.resetFromJSON(config);
    }

    resetFromJSON(config) { // (txt, x, y, width, prop, newLineMode, startIndex)
        this.text = GetFastValue(o, 'text', '');
        this.x = GetFastValue(o, 'x', 0);
        this.y = GetFastValue(o, 'y', 0);
        this.width = GetFastValue(o, 'width', 0);

        var prop = GetFastValue(o, 'prop', null);
        if (prop) {
            this.copyProp(prop);
        }

        this.newLineMode = GetFastValue(o, 'newLineMode', 0);
        this.startIndex = GetFastValue(o, 'startIndex', 0);
    }

    clone(pen) {
        pen.text = this.text;
        pen.x = this.y;
        pen.width = this.width;
        pen.copyProp(this.prop);
        pen.newLineMode = this.newLineMode;
        pen.startIndex = this.startIndex;        
    }

    copyProp(prop) {
        for (var key in prop) { // font, size, color, shadow, etc...
            this.prop[key] = prop[key];
        }
    }

    get rawText() {
        var txt = this.text;
        if (this.newLineMode === RAW_NEWLINE) {
            txt += "\n";
        }

        return txt;
    }

    get rawTextLength() {
        var len = this.text.length;
        if (this.newLineMode === RAW_NEWLINE) {
            len += 1;
        }
        return len;
    }

    get nextStartIndex() {
        return this.startIndex + this.rawTextLength;
    }


    get endIndex() {
        return this.getNextStartIndex() - 1;
    }

    get lastX() {
        return this.x + this.width;
    }
};

export default Pen;