const GetRandom = Phaser.Utils.Array.GetRandom;
const GetValue = Phaser.Utils.Objects.GetValue;

class BitmapZone {
    constructor(canvasObject, config) {
        this.data = [];
        this.setSource(canvasObject, config);
    }

    setSource(canvasObject, config) {
        var canvas = canvasObject.canvas;

        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        var width = GetValue(config, 'width', canvas.width);
        var height = GetValue(config, 'height', canvas.height);

        var context = canvas.getContext('2d');
        var imgData = context.getImageData(x, y, (x + width), (y + height)).data;
        var data = this.data;
        data.length = 0;
        for (var i = 0, cnt = (imgData.length / 4); i < cnt; i++) {
            if (imgData[(i * 4) + 3] > 0) {
                data.push(i);
            }
        }

        this.width = width;
        this.height = height;
        var offsetX = GetValue(config, 'offsetX', -canvasObject.displayOriginX);
        var offsetY = GetValue(config, 'offsetY', -canvasObject.displayOriginY);
        this.setOffset(offsetX, offsetY);

        return this;
    }

    setOffset(offsetX, offsetY) {
        if (typeof (offsetX) !== 'number') {
            var canvasObject = offsetX;
            offsetX = -canvasObject.displayOriginX;
            offsetY = -canvasObject.displayOriginY;
        }
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        return this;
    }

    contains(x, y) {
        x = Math.floor(x - this.offsetX);
        y = Math.floor(y - this.offsetY);
        return (this.data.indexOf((y * this.width) + x) !== -1)
    }

    getRandomPoint(out) {
        if (out === undefined) {
            out = {};
        }
        if (this.data.length > 0) {
            var index = GetRandom(this.data);
            var x = index % this.width;
            var y = (index - x) / this.width;
            out.x = x;
            out.y = y;
        } else {
            out.x = 0;
            out.y = 0;
        }
        out.x += this.offsetX;
        out.y += this.offsetY;
        return out;
    }
}

export default BitmapZone;