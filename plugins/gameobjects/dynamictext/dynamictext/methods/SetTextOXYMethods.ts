export default {
    setTextOX(ox?: any) {
        if (ox === this._textOX) {
            return this;
        }

        this._textOX = ox;
        return this;
    },

    setTextOY(oy?: any) {
        if (oy === this._textOY) {
            return this;
        }

        this._textOY = oy;
        return this;
    },

    setTextOXY(ox?: any, oy?: any) {
        if ((ox === this._textOX) && (oy === this._textOY)) {
            return;
        }

        this._textOX = ox;
        this._textOY = oy;
        return this;
    },

    addTextOX(incX?: any) {
        this.setTextOX(this._textOX + incX);
        return this;
    },

    addTextOY(incY?: any) {
        this.setTextOY(this._textOY + incY);
        return this;
    },

    addTextOXY(incX?: any, incY?: any) {
        this.setTextOXY(this._textOX + incX, this._textOY + incY);
        return this;
    }

}