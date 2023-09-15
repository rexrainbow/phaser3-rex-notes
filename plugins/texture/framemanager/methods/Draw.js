import DynamicTextureClearRectangle from '../../../utils/texture/DynamicTextureClearRectangle.js';

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
        outerX = tl.x,
        outerY = tl.y,
        cellPadding = this.cellPadding,
        innerX = outerX + cellPadding,
        innerY = outerY + cellPadding;

    ClearFrame.call(this, outerX, outerY, this.outerCellWidth, this.outerCellHeight);

    var frameSize = {
        width: this.cellWidth,
        height: this.cellHeight
    }

    var drawCallback = (this.useDynamicTexture) ? DrawDynamicTexture : DrawCanvasTexture;
    drawCallback.call(this, innerX, innerY, frameSize, callback, scope);
    // frameSize might be changed

    this.texture.add(frameName, 0, innerX, innerY, frameSize.width, frameSize.height);
    this.addFrameName(index, frameName);

    return this;
}

var ClearFrame = function (x, y, width, height) {
    if (this.useDynamicTexture) {
        DynamicTextureClearRectangle(this.texture, x, y, width, height);
    } else {
        this.context.clearRect(x, y, width, height);
    }
}

var DrawCanvasTexture = function (x, y, frameSize, callback, scope) {
    var context = this.context;

    context.save();
    context.translate(x, y);

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