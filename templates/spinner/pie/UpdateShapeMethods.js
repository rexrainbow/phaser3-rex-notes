import Arc from '../../../plugins/gameobjects/shape/shapes/geoms/lines/arc/Arc.js';

const Linear = Phaser.Math.Linear;

export default {
    buildShapes() {
        for (var i = 0; i < 4; i++) {
            var pie = (new Arc()).setPie();
            this.addShape(pie);

            pie.setData('speed', Linear(180, 360, Math.random()));
        }
        this.prevValue = undefined;
    },

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;

        var deltaValue;
        if (this.prevValue !== undefined) {
            deltaValue = this.value - this.prevValue;
            if (this.prevValue > this.value) {
                deltaValue += 1;
            }
        }

        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            var pie = shapes[i];
            var pieAlpha = (i + 1) / cnt;

            if (this.prevValue === undefined) {
                var startAngle = (i / cnt) * 360;
                var endAngle = startAngle + 90;
                pie
                    .fillStyle(this.color, pieAlpha)
                    .setRadius(radius)
                    .setCenterPosition(centerX, centerY)
                    .setAngle(startAngle, endAngle)
                    .setData('angle', startAngle);
            } else {
                var startAngle = pie.getData('angle') + pie.getData('speed') * deltaValue;
                startAngle = startAngle % 360;
                var endAngle = startAngle + 90;
                pie
                    .fillStyle(this.color, pieAlpha)
                    .setRadius(radius)
                    .setCenterPosition(centerX, centerY)
                    .setAngle(startAngle, endAngle)
                    .setData('angle', startAngle);

            }

        }

        this.prevValue = this.value;

    }
}