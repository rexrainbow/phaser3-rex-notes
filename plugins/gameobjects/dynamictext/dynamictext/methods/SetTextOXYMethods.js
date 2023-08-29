export default {
    setTextOX(ox) {
        if (ox === this._textOX) {
            return this;
        }

        this._textOX = ox;
        return this;
    },

    setTextOY(oy) {
        if (oy === this._textOY) {
            return this;
        }

        this._textOY = oy;
        return this;
    },

    setTextOXY(ox, oy) {
        if ((ox === this._textOX) && (oy === this._textOY)) {
            return;
        }

        this._textOX = ox;
        this._textOY = oy;
        return this;
    },

    addTextOX(incX) {
        this.setTextOX(this._textOX + incX);
        return this;
    },

    addTextOY(incY) {
        this.setTextOY(this._textOY + incY);
        return this;
    },

    addTextOXY(incX, incY) {
        this.setTextOXY(this._textOX + incX, this._textOY + incY);
        return this;
    }

}