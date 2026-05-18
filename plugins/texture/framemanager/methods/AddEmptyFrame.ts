var AddEmptyFrame = function(frameName?: any, width?: any, height?: any) {
    if (width === undefined) {
        width = this.cellWidth;
    }
    if (height === undefined) {
        height = this.cellHeight;
    }

    var drawCallback;
    if (this.useDynamicTexture) {
        drawCallback = function(texture?: any, frameSize?: any) {
            frameSize.width = width;
            frameSize.height = height;
        }
    } else {
        drawCallback = function(canvas?: any, context?: any, frameSize?: any) {
            frameSize.width = width;
            frameSize.height = height;
        }
    }
    this.draw(frameName, drawCallback);

    return this;
}

export default AddEmptyFrame;