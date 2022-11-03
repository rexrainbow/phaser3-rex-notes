import RotateAround from '../RotateAround.js';
import Offset from '../Offset.js';

const DegToRad = Phaser.Math.DegToRad;
const PointRotateAround = Phaser.Math.RotateAround;

export default {
    rotateAround(centerX, centerY, angle) {
        if (this.pathData.length === 0) {
            return this;
        }

        angle = DegToRad(angle);

        RotateAround(centerX, centerY, angle, this.pathData);

        var pathDataCnt = this.pathData.length;
        this.lastPointX = this.pathData[pathDataCnt - 2];
        this.lastPointY = this.pathData[pathDataCnt - 1];
        if (this.lastCX !== undefined) {
            var point = {
                x: this.lastCX,
                y: this.lastCY
            }
            PointRotateAround(point, centerX, centerY, angle);
            this.lastCX = point.x;
            this.lastCY = point.y;
        }
        return this;
    },

    offset(x, y) {
        Offset(x, y, this.pathData);
        return this;
    }

}