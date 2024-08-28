var GetScaleRoot = function (gameObject) {
    var parent = gameObject;
    while (parent && (parent !== parent._saveScaleRoot)) {
        parent = parent.getParentSizer();
    }

    return parent;
}

export default {
    saveScale(newScale) {
        if (newScale === undefined) {
            newScale = 1;
        }

        this._scaleXSave = this.scaleX;
        this._scaleYSave = this.scaleY;
        this._saveScaleRoot = this;

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

        this._scaleXSave = 1;
        this._scaleYSave = 1;
        this._saveScaleRoot = undefined;

        return this;
    },

    getSaveScaleX() {
        var parent = GetScaleRoot(this);
        if (parent) {
            return parent._scaleXSave;
        } else {
            return 1;
        }
    },

    getSaveScaleY() {
        var parent = GetScaleRoot(this);
        if (parent) {
            return parent._scaleYSave;
        } else {
            return 1;
        }
    },
}