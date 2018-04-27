'use strict'

import CONST from './const.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const RAW_NEWLINE = CONST.RAW_NEWLINE;

class Pen {
    constructor(config) {
        this.prop = {};
        this.resetFromJSON(config);
    }

    resetFromJSON(o) { // (txt, x, y, width, prop, newLineMode, startIndex)
        this.text = GetValue(o, 'text', '');
        this.x = GetValue(o, 'x', 0);
        this.y = GetValue(o, 'y', 0);
        this.width = GetValue(o, 'width', 0);

        var prop = GetValue(o, 'prop', null);
        this.newLineMode = GetValue(o, 'newLineMode', 0);
        this.startIndex = GetValue(o, 'startIndex', 0);
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