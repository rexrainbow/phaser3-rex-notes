var SetFixedSize = function (width, height) {
    if (width === undefined) {
        width = 0;
    }
    if (height === undefined) {
        height = 0;
    }

    if ((width > 0) && (height > 0)) {
        if ((this.fixedWidth !== width) || (this.fixedHeight !== height)) {
            this.dirty = true;
        }
    } else {
        this.dirty = true;
    }

    this.fixedWidth = width;
    this.fixedHeight = height;

    if (width > 0) {
        this.width = width;
    }
    if (height > 0) {
        this.height = height;
    }

    return this;
}

export default SetFixedSize;