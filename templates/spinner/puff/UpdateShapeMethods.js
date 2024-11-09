import Circle from '../../../plugins/gameobjects/shape/shapes/geoms/lines/arc/Circle.js';
import Yoyo from '../utils/Yoyo.js';

export default {
    buildShapes() {
        this.addShape(new Circle());
    },

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var puffRadius = radius * this.value;
        var lineWidth = Math.ceil(radius / 25);
        var alpha = Yoyo(this.value);

        this.getShapes()[0]
            .lineStyle(lineWidth, this.color, alpha)
            .setRadius(puffRadius)
            .setCenterPosition(centerX, centerY)
    }
}