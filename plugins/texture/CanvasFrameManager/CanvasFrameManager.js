const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class CanvasFrameManager {
    constructor(scene, key, width, height, cellWidth, cellHeight, fillColor) {
        if (IsPlainObject(key)) {
            var config = key;
            key = GetValue(config, 'key');
            width = GetValue(config, 'width');
            height = GetValue(config, 'height');
            cellWidth = GetValue(config, 'cellWidth');
            cellHeight = GetValue(config, 'cellHeight');
            fillColor = GetValue(config, 'fillColor');
        }

        if (width === undefined) {
            width = 4096;
        }
        if (height === undefined) {
            height = 4096;
        }
        if (cellWidth === undefined) {
            cellWidth = 64;
        }
        if (cellHeight === undefined) {
            cellHeight = 64;
        }

        this.texture = scene.textures.createCanvas(key, width, height);
        this.canvas = this.texture.getCanvas();
        this.context = this.texture.getContext();

        if (fillColor !== undefined) {
            var context = this.context;
            context.fillStyle = fillColor;
            context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.columnCount = Math.floor(width / cellWidth);
        this.rowCount = Math.floor(height / cellHeight);

        this.freeIndexes = [];
        for (var i = 0, cnt = this.columnCount * this.rowCount; i < cnt; i++) {
            this.freeIndexes.push(i);
        }

        this.frame2Index = {};

    }

    get isFull() {
        return this.freeIndexes.length === 0;
    }

    getFreeFrameIndex() {
        return this.freeIndexes.pop();
    }

    getTopLeftPosition(frameIndex, out) {
        if (out === undefined) {
            out = {};
        }

        var columnIndex = frameIndex % this.columnCount;
        var rowIndex = Math.floor(frameIndex / this.rowCount);
        out.x = columnIndex * this.cellWidth;
        out.y = rowIndex * this.cellHeight;
        return out;
    }

    draw(frameName, callback, scope) {
        var index = this.getFreeFrameIndex();
        if (index === undefined) {
            console.warn('Does not have free space.');
            return this;
        }

        var tl = this.getTopLeftPosition(index);
        var frameSize = {
            width: this.cellWidth,
            height: this.cellHeight
        }

        var context = this.context;
        context.save();
        context.translate(tl.x, tl.y);
        context.clearRect(0, 0, frameSize.width, frameSize.height);

        if (scope) {
            callback.call(scope, this.canvas, context, frameSize);
        } else {
            callback(this.canvas, context, frameSize);
        }
        // frameSize might be changed

        context.restore();

        this.texture.add(frameName, 0, tl.x, tl.y, frameSize.width, frameSize.height);
        this.frame2Index[frameName] = index;

        return this;
    }

    paste(frameName, gameObject) {
        var srcCanvas = gameObject.canvas;
        if (!srcCanvas) {
            console.warn(`Can't get canvas of game object.`);
            return this;
        }

        var srcWidth = srcCanvas.width,
            srcHeight = srcCanvas.height;
        this.draw(frameName, function (canvas, context, frameSize) {
            context.drawImage(srcCanvas, 0, 0, srcWidth, srcHeight);

            frameSize.width = srcWidth;
            frameSize.height = srcHeight;
        })

        return this;
    }

    updateTexture() {
        this.texture.refresh();
        return this;
    }

    remove(frameName) {
        if (!this.frame2Index.hasOwnProperty(frameName)) {
            return this;
        }

        var index = this.frame2Index[frameName];
        this.freeIndexes.push(index);
        delete this.frame2Index[frameName];

        this.texture.remove(frameName);

        // Don't clear canvas

        return this;
    }
}

export default CanvasFrameManager;