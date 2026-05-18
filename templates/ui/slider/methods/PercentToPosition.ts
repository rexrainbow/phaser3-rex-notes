import { Math as PhaserMath } from 'phaser';
const Linear = PhaserMath.Linear;

var PercentToPosition = function(t?: any, startPoint?: any, endPoint?: any, out?: any) {
    if (out === undefined) {
        out = tmpOut;
    }
    out.x = Linear(startPoint.x, endPoint.x, t);
    out.y = Linear(startPoint.y, endPoint.y, t);
    return out;
}
var tmpOut = {};

export default PercentToPosition;