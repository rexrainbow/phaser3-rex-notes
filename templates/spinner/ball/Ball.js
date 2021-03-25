import Base from '../base/Base.js';
import { Circle } from '../../../plugins/gameobjects/shape/shapes/shape'

const Linear = Phaser.Math.Linear;

class Ball extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerBall';
    }

    buildShapes() {
        for (var i = 0; i < 3; i++) {
            this.addShape(new Circle());
        }
    }

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var ballRadius = radius * 0.1;
        var lineWidth = Math.ceil(ballRadius * 0.25);
        var trackRadius = Linear(0.3, 0.9, Math.abs(0.5 - this.value) * 2) * radius;

        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            var ball = shapes[i];
            var t = i / cnt;
            var angle = Math.PI * 2 * (this.value + t);
            ball
                .lineStyle(lineWidth, this.color)
                .setRadius(ballRadius)
                .setCenterPosition(
                    centerX + Math.cos(angle) * trackRadius,
                    centerY + Math.sin(angle) * trackRadius
                );
        }
    }
}

export default Ball;