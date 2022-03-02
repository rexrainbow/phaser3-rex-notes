const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class CanvasFrames {
    constructor(scene, key, width, height, cellWidth, cellHeight) {
        if (IsPlainObject(key)) {
            var config = key;
            key = GetValue(config, 'key');
            width = GetValue(config, 'width');
            height = GetValue(config, 'height');
            cellWidth = GetValue(config, 'cellWidth');
            cellHeight = GetValue(config, 'cellHeight');
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

        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.columnCount = Math.floor(width / cellWidth);
        this.rowCount = Math.floor(height / cellHeight);

        this.freeIndexes = [];
        for (var i = 0, cnt = this.columnCount * this.rowCount; i < cnt; i++) {
            this.freeIndexes.push(i);
        }

    }

    get isFull() {
        return this.freeIndexes.length === 0;
    }

    add(gameObject, frameName) {
        if (this.isFull) {
            console.warn('Does not have free space.');
            return this;
        }
        var srcCanvas = gameObject.canvas;
        if (!srcCanvas) {
            console.warn(`Can't get canvas of game object.`);
            return this;
        }

        var index = this.freeIndexes.pop();
        var columnIndex = index % this.columnCount;
        var rowIndex = Math.ceil(index / this.rowCount);
        var tlx = columnIndex * this.cellWidth;
        var tly = rowIndex * this.cellHeight;

        var destCtx = this.canvas.getContext('2d');
        destCtx.clearRect(tlx, tly, this.cellWidth, this.cellHeight);
        destCtx.drawImage(srcCanvas, tlx, tly, srcCanvas.width, srcCanvas.height);

        this.texture.add(frameName, 0, tlx, tly, srcCanvas.width, srcCanvas.height);

        return this;
    }

    updateTexture() {
        this.texture.refresh();
        return this;
    }
}

export default CanvasFrames;