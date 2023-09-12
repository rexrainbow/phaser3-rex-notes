var AddEmptyFrame = function (frameName, width, height) {
    if (width === undefined) {
        width = this.cellWidth;
    }
    if (height === undefined) {
        height = this.cellHeight;
    }

    var drawCallback;
    if (this.useDynamicTexture) {
        drawCallback = function (texture, frameSize) {
            frameSize.width = width;
            frameSize.height = height;
        }
    } else {
        drawCallback = function (canvas, context, frameSize) {
            frameSize.width = width;
            frameSize.height = height;
        }
    }
    this.draw(frameName, drawCallback);

    return this;
}

export default AddEmptyFrame;