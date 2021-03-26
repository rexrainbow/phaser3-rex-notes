import BaseSpinner from '../base/BaseSpinner.js';
import { Arc, Circle } from '../../../plugins/gameobjects/shape/shapes/shape'


class Oval extends BaseSpinner {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerOval';
    }

    buildShapes() {
        this.addShape((new Circle()).setName('track'));
        this.addShape((new Arc()).setName('arc'));
    }

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var lineWidth = Math.ceil(radius / 25);
        var maxRadius = radius - lineWidth;

        this.getShape('track')
            .lineStyle(lineWidth, this.color, 0.5)
            .setRadius(maxRadius)
            .setCenterPosition(centerX, centerY);

        var startAngle = this.value * 360;
        var endAngle = startAngle + 60;
        this.getShape('arc')
            .lineStyle(lineWidth, this.color, 1)
            .setRadius(maxRadius)
            .setCenterPosition(centerX, centerY)
            .setAngle(startAngle, endAngle);

    }
}

export default Oval;