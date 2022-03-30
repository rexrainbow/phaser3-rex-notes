var SetCrop = function (x, y, width, height) {
    if (x === undefined) {
        this.isCropped = false;
    } else {
        this.isCropped = true;
        this.cropX = x;
        this.cropY = y;
        this.cropWidth = width;
        this.cropHeight = height;
    }
    return this;
}

export default SetCrop;