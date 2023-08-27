export default {
    setTextOX(ox) {
        if (ox === this._textOX) {
            return this;
        }

        this._textOX = ox;
        this.updateTexture();
        return this;
    },

    setTextOY(oy) {
        if (oy === this._textOY) {
            return this;
        }

        this._textOY = oy;
        this.updateTexture();
        return this;
    },

    setTextOXY(ox, oy) {
        if ((ox === this._textOX) && (oy === this._textOY)) {
            return;
        }

        this._textOX = ox;
        this._textOY = oy;
        this.updateTexture();
        return this;
    }
}