import TextObjectToBitMap from '../../data/canvasdata/TextObjectToBitMap.js';

const GetRandom = Phaser.Utils.Array.GetRandom;

const GetValue = Phaser.Utils.Objects.GetValue;

class TextZone {
    constructor(textObject, config) {
        this.data = [];
        this.setTextObject(textObject, config);
    }

    get pointsCount() {
        return this.bitMapList.length;
    }

    setTextObject(textObject, config) {
        var textBitMap = TextObjectToBitMap(textObject);
        this.width = textBitMap.width;
        this.height = textBitMap.height;

        var width = this.width;
        var data = this.data;
        data.length = 0;
        textBitMap.forEachNonZero(function (value, x, y) {
            data.push((y * width) + x);
        });

        var offsetX = GetValue(config, 'offsetX', textObject.displayOriginX);
        var offsetY = GetValue(config, 'offsetY', textObject.displayOriginY);
        this.setOffset(offsetX, offsetY);

        return this;
    }

    setOffset(offsetX, offsetY) {
        if (typeof (offsetX) !== 'number') {
            var textObject = offsetX;
            offsetX = textObject.displayOriginX;
            offsetY = textObject.displayOriginY;
        }
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        return this;
    }

    contains(x, y) {
        x = Math.floor(x + this.offsetX);
        y = Math.floor(y + this.offsetY);
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
            out.x = x - this.offsetX;
            out.y = y - this.offsetY;
        } else {
            out.x = 0;
            out.y = 0;
        }
        return out;
    }
}

export default TextZone;