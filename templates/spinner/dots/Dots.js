import BaseSpinner from '../base/BaseSpinner.js';
import { Circle } from '../../../plugins/gameobjects/shape/shapes/shape'
import Fold from '../utils/Fold.js';


const Linear = Phaser.Math.Linear;

class Puff extends BaseSpinner {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerPuff';
    }

    buildShapes() {
        for (var i = 0; i < 3; i++) {
            var dot = new Circle();
            this.addShape(dot);
        }
    }

    updateShapes() {
        var centerY = this.centerY;
        var radius = this.radius;
        var cellWidth = (radius * 2) / 3;
        var dotRadiuse = cellWidth / 2;

        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            var dot = shapes[i];
            var t = Fold(i / (cnt - 1)) / 2;
            t = (this.value + t) % 1;
            t = Fold(t);
            dot
                .fillStyle(this.color, Linear(0.25, 1, t))
                .setRadius(dotRadiuse * Linear(0.5, 1, t))
                .setCenterPosition(
                    cellWidth * (i + 0.5),
                    centerY
                )
        }
    }
}

export default Puff;