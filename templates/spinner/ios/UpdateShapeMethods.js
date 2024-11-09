import Line from '../../../plugins/gameobjects/shape/shapes/geoms/lines/Line.js';

const Linear = Phaser.Math.Linear;

export default {
    buildShapes() {
        for (var i = 0; i < 12; i++) {
            this.addShape(new Line());
        }
        this.isInitialize = true;
    },

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var needLayout = this.isInitialize || this.isSizeChanged;

        var radius = this.radius;
        var startRadius = radius / 2;
        var lineWidth = Math.ceil(radius / 20);
        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            var line = shapes[i];
            var t = i / cnt;
            var angle = Math.PI * 2 * t;
            var alpha = Linear(0.25, 1, (1 - this.value + t) % 1);
            line.lineStyle(lineWidth, this.color, alpha);

            if (needLayout) {
                line
                    .setP0(
                        centerX + Math.cos(angle) * startRadius,
                        centerY + Math.sin(angle) * startRadius
                    )
                    .setP1(
                        centerX + Math.cos(angle) * radius,
                        centerY + Math.sin(angle) * radius
                    )
            }
        }

        this.isInitialize = false;
    }
}