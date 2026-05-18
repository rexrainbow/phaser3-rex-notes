var SetFixedSize = function(width?: any, height?: any) {
    if (width === undefined) {
        width = 0;
    }
    if (height === undefined) {
        height = 0;
    }

    this.fixedWidth = width;
    this.fixedHeight = height;

    return this;
}

export default SetFixedSize;