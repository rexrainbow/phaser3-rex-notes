export default {
    saveScale(newScale) {
        if (newScale === undefined) {
            newScale = 1;
        }

        this._scaleXSave = this.scaleX;
        this._scaleYSave = this.scaleY;
        var scale1 = (this._scaleXSave === 1) && (this._scaleYSave === 1);
        if (!scale1) {
            this.setScale(newScale);
        }

        return this;
    },

    restoreScale() {
        var scale1 = (this._scaleXSave === 1) && (this._scaleYSave === 1);
        if (!scale1) {
            this.setScale(this._scaleXSave, this._scaleYSave);
        }

        return this;
    }
}