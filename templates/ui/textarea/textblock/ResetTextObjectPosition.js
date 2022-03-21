var ResetTextObjectPosition = function () {
    var config = this.textObject.rexSizer;
    this.textObject.y += (config.offsetY - config.preOffsetY);
    config.preOffsetY = config.offsetY;
    this.resetChildPositionState(this.textObject);

    CropTextObject.call(this);
}

var CropTextObject = function () {
    var offsetY = this.textObject.rexSizer.offsetY;
    var cropY, cropHeight;
    if (offsetY <= 0) {
        cropY = -offsetY;
        cropHeight = this.height;
    } else {
        cropY = 0;
        cropHeight = this.height - offsetY;
    }
    this.textObject.setCrop(
        0,
        cropY,
        this.width,
        cropHeight
    )
}

export default ResetTextObjectPosition;