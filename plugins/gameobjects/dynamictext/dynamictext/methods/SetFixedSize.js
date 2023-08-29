var SetFixedSize = function (width, height) {
    if (width === undefined) {
        width = 0;
    }
    if (height === undefined) {
        height = 0;
    }

    if ((this.fixedWidth === width) && (this.fixedHeight === height)) {
        return this;
    }

    this.fixedWidth = width;
    this.fixedHeight = height;
    this.dirty = true;  // -> this.updateTexture();

    this.setCanvasSize(
        (width > 0) ? width : this.width,
        (height > 0) ? height : this.height
    );

    return this;
}

export default SetFixedSize;