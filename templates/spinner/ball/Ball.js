import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

class Ball extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerBall';
    }
}

Object.assign(
    Ball.prototype,
    UpdateShapeMethods,
)

export default Ball;