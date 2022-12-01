import { Lines } from '../shapes/geoms';

const DegToRad = Phaser.Math.DegToRad;
const Rad120 = DegToRad(120);

export default {
    buildShapes() {
        this
            .addShape(new Lines().setName('triangle'))
    },

    updateShapes() {
        var centerX = this.width / 2,
            centerY = this.height / 2,
            radius = Math.min(centerX, centerY) * this.radius;

        var verticeRotation = this.verticeRotation;
        var triangle = this.getShape('triangle')
            .fillStyle(this.fillColor, this.fillAlpha)
            .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
            .startAt(
                centerX + radius * Math.cos(verticeRotation),
                centerY + radius * Math.sin(verticeRotation)
            )
            .lineTo(
                centerX + radius * Math.cos(verticeRotation + Rad120),
                centerY + radius * Math.sin(verticeRotation + Rad120)
            )
            .lineTo(
                centerX + radius * Math.cos(verticeRotation - Rad120),
                centerY + radius * Math.sin(verticeRotation - Rad120)
            )
            .close()

    }
}