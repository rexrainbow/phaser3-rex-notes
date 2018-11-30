import {
    qr2x,
    qr2y,
    qr2z
} from './CubeTransfer.js';
import QuickAbs from '../../math/QuickAbs.js';

var GetDistance = function (tileA, tileB, roughMode) {
    var mode = this.mode;
    var q0 = tileA.x,
        r0 = tileA.y,
        q1 = tileB.x,
        r1 = tileB.y;
    var dx = qr2x(mode, q1, r1) - qr2x(mode, q0, r0);
    var dy = qr2y(mode, q1, r1) - qr2y(mode, q0, r0);
    var dz = qr2z(mode, q1, r1) - qr2z(mode, q0, r0);
    return (QuickAbs(dx) + QuickAbs(dy) + QuickAbs(dz)) / 2;
}
export default GetDistance;