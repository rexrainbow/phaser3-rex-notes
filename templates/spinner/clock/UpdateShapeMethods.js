import Circle from '../../../plugins/gameobjects/shape/shapes/geoms/lines/arc/Circle.js';
import Line from '../../../plugins/gameobjects/shape/shapes/geoms/lines/Line.js';

const RadToDeg = Phaser.Math.RadToDeg;
const WrapDegrees = Phaser.Math.Angle.WrapDegrees;
const WrapRad = Phaser.Math.Angle.Wrap;
const ShortestBetween = Phaser.Math.Angle.ShortestBetween;
const DegToRad = Phaser.Math.DegToRad;
const Rad270 = Phaser.Math.DegToRad(270);

export default {
    buildShapes() {
        this.addShape((new Circle()).setName('border'));
        this.addShape((new Line()).setName('minuteHand'));
        this.addShape((new Line()).setName('hourHand'));

        this.minuteHandAngle = 0;
        this.hourHandAngle = 0;
    },

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var lineWidth = Math.ceil(radius / 25);
        var borderRadius = radius - (lineWidth / 2);
        var minuteHandLength = radius * 0.8;
        var hourHandLength = radius * 0.5;

        var prevMinuteHandAngle = this.minuteHandAngle;
        this.minuteHandAngle = Math.PI * 2 * this.value;
        var angle0 = WrapDegrees(RadToDeg(prevMinuteHandAngle));
        var angle1 = WrapDegrees(RadToDeg(this.minuteHandAngle));
        var deltaAngle = ShortestBetween(angle0, angle1);
        this.hourHandAngle = WrapRad(this.hourHandAngle + (DegToRad(deltaAngle) / 12))

        this.getShape('border')
            .lineStyle(lineWidth, this.color)
            .setRadius(borderRadius)
            .setCenterPosition(centerX, centerY);

        var angle = this.minuteHandAngle + Rad270;
        this.getShape('minuteHand')
            .lineStyle(lineWidth, this.color)
            .setP0(centerX, centerY)
            .setP1(
                centerX + (Math.cos(angle) * minuteHandLength),
                centerY + (Math.sin(angle) * minuteHandLength)
            )

        var angle = this.hourHandAngle + Rad270;
        this.getShape('hourHand')
            .lineStyle(lineWidth, this.color)
            .setP0(centerX, centerY)
            .setP1(
                centerX + (Math.cos(angle) * hourHandLength),
                centerY + (Math.sin(angle) * hourHandLength)
            )
    }
}