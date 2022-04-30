import { CubismMatrix44 } from '../../framework/src/math/cubismmatrix44';

// const AngleWrap = Phaser.Math.Angle.Wrap;

class ViewMatrix extends CubismMatrix44 {
    copyFrom(matrix) {
        this.setMatrix(matrix.getArray());
        return this;
    }

    rotate(angle) {
        // Do nothing if angle = 0
        if (angle === 0) {
            return;
        }

        // angle = AngleWrap(angle);
        var cosR = Math.cos(angle);
        var sinR = Math.sin(angle);
        const tr1 = new Float32Array([
            cosR,
            sinR,
            0.0,
            0.0,
            -sinR,
            cosR,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0
        ]);

        CubismMatrix44.multiply(tr1, this._tr, this._tr);
    }
}

export default ViewMatrix;