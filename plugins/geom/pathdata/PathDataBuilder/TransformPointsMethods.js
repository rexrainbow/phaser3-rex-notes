import RotateAround from '../RotateAround.js';
import Scale from '../Scale.js';
import Offset from '../Offset.js';

import { Math as PhaserMath } from 'phaser';
const DegToRad = PhaserMath.DegToRad;
const PointRotateAround = PhaserMath.RotateAround;

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
            var point = { x: this.lastCX, y: this.lastCY };
            PointRotateAround(point, centerX, centerY, angle);
            this.lastCX = point.x;
            this.lastCY = point.y;
        }

        return this;
    },

    scale(centerX, centerY, scaleX, scaleY) {
        if (this.pathData.length === 0) {
            return this;
        }

        Scale(centerX, centerY, scaleX, scaleY, this.pathData);
        var pathDataCnt = this.pathData.length;
        this.lastPointX = this.pathData[pathDataCnt - 2];
        this.lastPointY = this.pathData[pathDataCnt - 1];

        if (this.lastCX !== undefined) {
            this.lastCX = ((this.lastCX - centerX) * scaleX) + centerX;
            this.lastCY = ((this.lastCY - centerY) * scaleY) + centerY;
        }

        return this;
    },

    offset(x, y) {
        if (this.pathData.length === 0) {
            return this;
        }

        Offset(x, y, this.pathData);
        var pathDataCnt = this.pathData.length;
        this.lastPointX = this.pathData[pathDataCnt - 2];
        this.lastPointY = this.pathData[pathDataCnt - 1];

        if (this.lastCX !== undefined) {
            this.lastCX += x;
            this.lastCY += y;
        }

        return this;
    }

}
