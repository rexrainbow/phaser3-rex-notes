var Draw = function(frameName?: any, callback?: any, scope?: any) {
    var index = this.getFrameIndex(frameName);
    if (index === -1) {
        index = this.getFrameIndex(undefined);
    }
    if (index === -1) {
        console.warn('Does not have free space.');
        return this;
    }

    // Clear frame space
    var tl = this.getTopLeftPosition(index),
        outerX = tl.x,
        outerY = tl.y,
        cellPadding = this.cellPadding,
        innerX = outerX + cellPadding,
        innerY = outerY + cellPadding;

    ClearFrame.call(this, outerX, outerY, this.outerCellWidth, this.outerCellHeight);

    // Draw frame
    var frameSize = {
        width: this.cellWidth,
        height: this.cellHeight
    }

    var drawCallback = (this.useDynamicTexture) ? DrawDynamicTexture : DrawCanvasTexture;
    drawCallback.call(this, innerX, innerY, frameSize, callback, scope);
    // frameSize might be changed

    this.texture.add(frameName, 0, innerX, innerY, frameSize.width, frameSize.height);
    this.addFrameName(index, frameName);
    this.dirty = true;

    return this;
}

var ClearFrame = function(x?: any, y?: any, width?: any, height?: any) {
    if (this.useDynamicTexture) {
        this.texture.clear(x, y, width, height);
    } else {
        this.context.clearRect(x, y, width, height);
    }
}

var DrawCanvasTexture = function(x?: any, y?: any, frameSize?: any, callback?: any, scope?: any) {
    var context = this.context;

    context.save();
    context.translate(x, y);

    // Draw cell
    if (scope?: any) {
        callback.call(scope, this.canvas, context, frameSize);
    } else {
        callback(this.canvas, context, frameSize);
    }
    // frameSize might be changed

    context.restore();
}

var DrawDynamicTexture = function(x?: any, y?: any, frameSize?: any, callback?: any, scope?: any) {
    var texture = this.texture;

    // Draw cell
    texture.camera.setScroll(-x, -y);

    if (scope?: any) {
        callback.call(scope, texture, frameSize);
    } else {
        callback(texture, frameSize);
    }
    // frameSize might be changed

    texture.render();

    texture.camera.setScroll(0, 0);

}

export default Draw;