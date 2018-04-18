'use strict'

import PensManagerKlass from './PensManager.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;

var TMPPENSMGR = null;
class CanvasText {
    constructor(config) {
        this.pensManager = new PensManagerKlass();
    }

    get lines() {
        return this.pensManager.lines;
    }

    getSubText(start, end, text) {
        if (text == null)
            return this.pensManager.getSliceTagText(start, end, this.parser.prop2TagText);

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

    copyPensManager = function (pensManager) {
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