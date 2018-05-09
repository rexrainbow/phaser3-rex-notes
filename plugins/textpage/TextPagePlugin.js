'use strict'

import GetSceneObject from './../utils/system/GetSceneObject.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;
const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const Clamp = Phaser.Math.Clamp;

class TextPagePlugin {
    constructor(gameobject, config) {
        this.gameobject = gameobject;
        this.scene = GetSceneObject(gameobject);
        
        this.wordWrap = {};
        this.resetFromJSON(config);
        this.boot();        
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        this.setText(GetFastValue(o, 'text', ''));
        this.setStartIdx(GetFastValue(o, 'start', 0));
        this.setPageIdx(GetFastValue(o, 'page', -1));
        return this;
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        return {
            text: this.text,
            start: this.startIdx,
            page: this.pageIdx,

            pageLineNum: this.pageLineNum,
            pageNum: this.pageNum

        };
    }

    boot() {
        if (this.gameobject.on) { // oops, bob object does not have event emitter
            this.gameobject.on('destroy', this.destroy, this);
        }
    }
    
    shutdown() {
        this.text = '';
        this.lines.length = 0;

        this.gameobject = undefined;
        this.scene = undefined;
    }

    destroy() {
        this.shutdown();
    }

    get isFirstPage() {
        return (this.pageIdx <= 0);
    }

    get isLastPage() {
        return (this.pageIdx >= (this.pageNum - 1));
    }

    setText(text, resetPageIdx) {
        if (resetPageIdx === undefined) {
            resetPageIdx = true;
        }
        this.text = transferText(text);
        this.lines = this.gameobject.getWrappedText(this.text);
        this.pageLineNum = this.getPageLineNum();
        this.pageNum = Math.ceil(this.lines.length / this.pageLineNum);
        if (resetPageIdx) {
            this.resetPageIdx();
        }
        return this;
    }

    appendText(text) {
        this.setText(this.text.concat(transferText(text)));
        return this;
    }

    getPage(idx) {
        if (idx === undefined) {
            idx = this.pageIdx;
        }
        return this.setPageIdx(idx).getLines();
    }

    getNextPage() {
        return this.getPage(this.pageIdx + 1);
    }

    getPreviousPage() {
        return this.getPage(this.pageIdx - 1);
    }

    showPage(idx) {
        this.gameobject.setText(this.getPage());
        return this;
    }

    showNextPage() {
        this.gameobject.setText(this.getNextPage());
        return this;
    }

    showPreviousPage() {
        this.gameobject.setText(this.getPreviousPage());
        return this;
    }

    show() {
        this.gameobject.setText(this.getLines());
        return this;
    }

    showNextLine() {
        this.gameobject.setText(this.setStartIdx(this.startIdx + 1).getLines());
        return this;
    }

    showPreviousLine() {
        this.gameobject.setText(this.setStartIdx(this.startIdx - 1).getLines());
        return this;
    }

    setStartIdx(idx) {
        idx = Clamp(idx, 0, this.lines.length - 1);
        this.startIdx = idx;
        return this;
    }

    resetPageIdx() {
        this.pageIdx = -1;
    }

    setPageIdx(idx) {
        idx = Clamp(idx, 0, this.pageNum - 1);
        this.pageIdx = idx;
        this.setStartIdx(this.pageIdx * this.pageLineNum);
        return this;
    }

    getPageLineNum() {
        var num;
        var maxLines = this.gameobject.style.maxLines;
        if (maxLines <= 0) {
            num = this.lines.length;
        } else {
            num = maxLines;
        }
        return num;
    }

    getLines(startIdx) {
        if (startIdx === undefined) {
            startIdx = this.startIdx;
        }
        var lines = this.lines.slice(startIdx, startIdx + this.pageLineNum);
        return lines;
    }

}

var transferText = function (text) {
    if (Array.isArray(text)) {
        text = text.join('\n');
    } else if (typeof (text) === 'number') {
        text = text.toString();
    }
    return text;
}


export default TextPagePlugin;