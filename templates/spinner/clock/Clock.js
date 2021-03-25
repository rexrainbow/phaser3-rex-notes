import Base from '../base/Base.js';
import { Circle, Line } from '../../../plugins/gameobjects/shape/shapes/shape'

const RadToDeg = Phaser.Math.RadToDeg;
const WrapDegrees = Phaser.Math.Angle.WrapDegrees;
const ShortestBetween = Phaser.Math.Angle.ShortestBetween;
const DegToRad = Phaser.Math.DegToRad;

class Clock extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerClock';

        this.minuteHandAngle = 0;
        this.hourHandAngle = 0;
    }

    buildShapes() {
        this.addShape((new Circle()).setName('border'));
        this.addShape((new Line()).setName('minuteHand'));
        this.addShape((new Line()).setName('hourHand'));
    }

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var lineWidth = Math.ceil(radius / 25);
        var minuteHandLength = radius * 0.8;
        var hourHandLength = radius * 0.5;

        var prevMinuteHandAngle = this.minuteHandAngle;
        this.minuteHandAngle = Math.PI * 2 * this.value;
        var angle0 = WrapDegrees(RadToDeg(prevMinuteHandAngle));
        var angle1 = WrapDegrees(RadToDeg(this.minuteHandAngle));
        var deltaAngle = ShortestBetween(angle0, angle1);
        this.hourHandAngle += DegToRad(deltaAngle) / 60;

        this.getShape('border')
            .lineStyle(lineWidth, this.color)
            .setRadius(radius)
            .setCenterPosition(centerX, centerY);

        this.getShape('minuteHand')
            .lineStyle(lineWidth, this.color)
            .setP0(centerX, centerY)
            .setP1(
                centerX + (Math.cos(this.minuteHandAngle) * minuteHandLength),
                centerY + (Math.sin(this.minuteHandAngle) * minuteHandLength)
            )

        this.getShape('hourHand')
            .lineStyle(lineWidth, this.color)
            .setP0(centerX, centerY)
            .setP1(
                centerX + (Math.cos(this.hourHandAngle) * hourHandLength),
                centerY + (Math.sin(this.hourHandAngle) * hourHandLength)
            )
    }
}

export default Clock;