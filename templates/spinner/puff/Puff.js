import Base from '../base/Base.js';
import { Circle } from '../../../plugins/gameobjects/shape/shapes/shape'


class Puff extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerPuff';
    }

    buildShapes() {
        this.addShape(new Circle());
    }

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var puffRadius = radius * this.value;
        var lineWidth = Math.ceil(radius / 25);
        var alpha = 1 - (Math.abs(0.5 - this.value) * 2);

        var puff = this.getShapes()[0];
        puff
            .lineStyle(lineWidth, this.color, alpha)
            .setRadius(puffRadius)
            .setCenterPosition(centerX, centerY)
    }
}

export default Puff;