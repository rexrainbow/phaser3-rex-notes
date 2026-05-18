import AngleNormalize from '../../../utils/math/angle/Normalize';
import Equal from '../../../utils/math/fuzzy/Equal';

var IsAngleInCone = function(chessA?: any, chessB?: any, face?: any, cone?: any) {
    var tileXYA = this.chessToTileXYZ(chessA);
    var tileXYB = this.chessToTileXYZ(chessB);
    var targetAngle = this.angleBetween(tileXYA, tileXYB); // -PI~PI
    targetAngle = AngleNormalize(targetAngle); // 0~2PI
    var deltaAngle = Math.abs(targetAngle - face);
    deltaAngle = Math.min(deltaAngle, PI2 - deltaAngle);
    var halfCone = cone / 2;
    return Equal(deltaAngle, halfCone) || (deltaAngle < halfCone);
}

const PI = Math.PI;
const PI2 = Math.PI * 2;
export default IsAngleInCone;