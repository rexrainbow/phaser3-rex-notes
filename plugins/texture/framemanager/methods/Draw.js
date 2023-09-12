var Draw = function (frameName, callback, scope) {
    var index = this.getFrameIndex(frameName);
    if (index === -1) {
        index = this.getFrameIndex(undefined);
    }
    if (index === -1) {
        console.warn('Does not have free space.');
        return this;
    }

    var tl = this.getTopLeftPosition(index),
        x = tl.x,
        y = tl.y;

    var frameSize = {
        width: this.cellWidth,
        height: this.cellHeight
    }

    var drawCallback = (this.useDynamicTexture) ? DrawDynamicTexture : DrawCanvasTexture;
    drawCallback.call(this, x, y, frameSize, callback, scope);
    // frameSize might be changed

    this.texture.add(frameName, 0, x, y, frameSize.width, frameSize.height);
    this.addFrameName(index, frameName);

    return this;
}

var DrawCanvasTexture = function (x, y, frameSize, callback, scope) {
    var context = this.context;
    context.save();
    context.translate(x, y);

    // Clear cell
    context.clearRect(0, 0, frameSize.width, frameSize.height);

    // Draw cell
    if (scope) {
        callback.call(scope, this.canvas, context, frameSize);
    } else {
        callback(this.canvas, context, frameSize);
    }
    // frameSize might be changed

    context.restore();
}

var DrawDynamicTexture = function (x, y, frameSize, callback, scope) {
    var texture = this.texture;

    // Clear cell : ??
    texture.fill(0x0, 1, x, y, frameSize.width, frameSize.height);

    // Draw cell
    texture.camera.setScroll(-x, -y);
    if (scope) {
        callback.call(scope, texture, frameSize);
    } else {
        callback(texture, frameSize);
    }
    texture.camera.setScroll(0, 0);
    // frameSize might be changed
}

export default Draw;