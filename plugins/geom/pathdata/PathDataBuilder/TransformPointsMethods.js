import RotateAround from '../RotateAround.js';
import Scale from '../Scale.js';
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
        return this;
    },

    scale(centerX, centerY, scaleX, scaleY) {
        if (this.pathData.length === 0) {
            return this;
        }

        Scale(centerX, centerY, scaleX, scaleY, this.pathData);
        this.lastPointX = this.pathData[pathDataCnt - 2];
        this.lastPointY = this.pathData[pathDataCnt - 1];
        return this;
    },

    offset(x, y) {
        Offset(x, y, this.pathData);
        return this;
    }

}