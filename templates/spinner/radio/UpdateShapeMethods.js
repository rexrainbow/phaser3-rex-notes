import Circle from '../../../plugins/gameobjects/shape/shapes/geoms/lines/arc/Circle.js';
import Lines from '../../../plugins/gameobjects/shape/shapes/geoms/lines/Lines.js';
import Yoyo from '../utils/Yoyo.js';

const Linear = Phaser.Math.Linear;
const ExpoIn = Phaser.Math.Easing.Expo.In;

export default {
    buildShapes() {
        this.addShape((new Circle()).setName('center'));
        this.addShape((new Lines()).setName('arc0'));
        this.addShape((new Lines()).setName('arc1'));
        this.isInitialize = true;
    },

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var needLayout = this.isInitialize || this.isSizeChanged;

        var centerRadius = (radius * 2) / 6;
        var x = centerX - radius + centerRadius;
        var y = centerY + radius - centerRadius;

        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            var shape = shapes[i];

            var t = (this.value + ((cnt - i) * 0.1)) % 1;
            t = ExpoIn(Yoyo(t));
            var alpha = Linear(0.25, 1, t);

            switch (shape.name) {
                case 'center':
                    shape.fillStyle(this.color, alpha)

                    if (needLayout) {
                        shape
                            .setRadius(centerRadius)
                            .setCenterPosition(x, y);
                    }
                    break;
                case 'arc0':
                    shape.fillStyle(this.color, alpha);

                    if (needLayout) {
                        var radius0 = centerRadius * 2,
                            radius1 = centerRadius * 3;
                        shape
                            .startAt(x, y - radius0)
                            .lineTo(x, y - radius1)
                            .setIterations(8).arc(x, y, radius1, 270, 360)
                            .lineTo(x + radius0, y)
                            .setIterations(6).arc(x, y, radius0, 360, 270, true)
                            .close();
                    }
                    break;
                case 'arc1':
                    shape.fillStyle(this.color, alpha);

                    if (needLayout) {
                        var radius0 = centerRadius * 4,
                            radius1 = centerRadius * 5;
                        shape
                            .startAt(x, y - radius0)
                            .lineTo(x, y - radius1)
                            .setIterations(8).arc(x, y, radius1, 270, 360)
                            .lineTo(x + radius0, y)
                            .setIterations(6).arc(x, y, radius0, 360, 270, true)
                            .close();
                    }
                    break;
            }
        }

        this.isInitialize = false;
    }
}