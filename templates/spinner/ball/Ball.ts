import Base from '../base/Base';
import UpdateShapeMethods from './UpdateShapeMethods';

class Ball extends Base {
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexSpinnerBall';
    }
}

Object.assign(
    Ball.prototype,
    UpdateShapeMethods,
)

export default Ball;