import Equal from '../../utils/math/fuzzy/Equal.js';
import AngleNormalize from '../../utils/math/angle/Normalize.js';

var IsInCone = function (targetTileXY) {
    if (this.cone === undefined) {
        return true;
    }
    var board = this.board;
    var myTileXYZ = this.chessData.tileXYZ;
    if (this.coneMode === 0) { // Direction
        var targetDirection = board.directionBetween(myTileXYZ, targetTileXY, false);
        var deltaDirection = Math.abs(targetDirection - this.face);
        deltaDirection = Math.min(deltaDirection, board.grid.directions - deltaDirection);
        return (deltaDirection <= this.halfConeRad);
    } else { // Angle
        var targetAngle = board.angleBetween(myTileXYZ, targetTileXY); // -PI~PI
        targetAngle = AngleNormalize(targetAngle); // 0~2PI
        var deltaAngle = Math.abs(targetAngle - this.faceAngle);
        deltaAngle = Math.min(deltaAngle, PI2 - deltaAngle);
        return Equal(deltaAngle, this.halfConeRad) || (deltaAngle < this.halfConeRad);
    }
}

const PI = Math.PI;
const PI2 = Math.PI * 2;
export default IsInCone;