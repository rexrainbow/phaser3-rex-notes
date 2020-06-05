import TextObjectToBitMap from '../../data/canvasdata/TextObjectToBitMap.js';

const GetRandom = Phaser.Utils.Array.GetRandom;

class TextZone {
    constructor(textObject) {
        this.width = 0;
        this.height = 0;
        this.data = [];
        this.setTextObject(textObject);
    }

    get pointsCount() {
        return this.bitMapList.length;
    }

    setTextObject(textObject) {
        this.textObject = textObject;
        this.update();
        return this;
    }

    update() {
        var textBitMap = TextObjectToBitMap(this.textObject);
        this.width = textBitMap.width;
        this.height = textBitMap.height;

        var width = this.width;
        var data = this.data;
        data.length = 0;
        textBitMap.forEachNonZero(function (value, x, y) {
            data.push((y * width) + x);
        });
        return this;
    }

    contains(x, y) {
        x = Math.floor(x + this.textObject.originX);
        y = Math.floor(y + this.textObject.originY);
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
            out.x = x - this.textObject.displayOriginX;
            out.y = y - this.textObject.displayOriginY;
        } else {
            out.x = 0;
            out.y = 0;
        }
        return out;
    }
}

export default TextZone;