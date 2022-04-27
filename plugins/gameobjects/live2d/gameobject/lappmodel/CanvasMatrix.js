import { CubismMatrix44 } from '../../framework/src/math/cubismmatrix44';

const Linear = Phaser.Math.Linear;

class CanvasMatrix extends CubismMatrix44 {
    constructor() {
        super();

        this.setSize(0, 0);
    }

    setSize(width, height) {
        var ratio = (height === 0) ? 0 : width / height;
        this.width = width;
        this.height = height;
        this.left = -ratio;
        this.right = ratio;
        this.bottom = -1;
        this.top = 1;

        this.scale(1, ratio);

        return this;
    }

    toLocalX(x) {
        var t = (this.width === 0) ? 0 : (x / this.width);
        return Linear(this.left, this.right, t);
    }

    toLocalY(y) {
        var t = (this.height === 0) ? 0 : (y / this.height);
        return Linear(this.top, this.bottom, t);
    }
}

export default CanvasMatrix;