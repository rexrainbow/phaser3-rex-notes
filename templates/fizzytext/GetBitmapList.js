import TextObjectToBitMap from '../../plugins/data/canvasdata/TextObjectToBitMap.js';

var GetBitmapList = function (textObject, out) {
    if (out === undefined) {
        out = [];
    }
    globTextBitmap = TextObjectToBitMap(textObject, globTextBitmap);
    globTextBitmap.forEachNonZero(function (value, x, y) {
        out.push(`${x},${y}`);
    })
    return out;
}

var globTextBitmap;

export default GetBitmapList;