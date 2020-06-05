import TextObjectToBitMap from '../../data/canvasdata/TextObjectToBitMap.js';

const GetRandom = Phaser.Utils.Array.GetRandom;

class TextZone {
    constructor(textObject) {
        this.bitMapList = [];
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
        var bitMapList = this.bitMapList;
        bitMapList.length = 0;
        globBitMap = TextObjectToBitMap(this.textObject, globBitMap);
        globBitMap.forEachNonZero(function (value, x, y) {
            bitMapList.push(`${x},${y}`);
        });
        return this;
    }

    contains(x, y) {
        x = Math.floor(x + this.textObject.originX);
        y = Math.floor(y + this.textObject.originY);
        return (this.bitMapList.indexOf(`${x},${y}`) !== -1)
    }

    getRandomPoint(out) {
        if (out === undefined) {
            out = {};
        }
        if (this.bitMapList.length > 0) {
            var p = GetRandom(this.bitMapList).split(',');
            out.x = p[0] - this.textObject.displayOriginX;
            out.y = p[1] - this.textObject.displayOriginY;
        } else {
            out.x = 0;
            out.y = 0;
        }
        return out;
    }
}

var globBitMap;

export default TextZone;