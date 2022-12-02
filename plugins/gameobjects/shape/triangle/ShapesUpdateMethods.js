import { Lines } from '../shapes/geoms';

const DegToRad = Phaser.Math.DegToRad;
const Rad120 = DegToRad(120);
const Wrap = Phaser.Math.Wrap;
const Linear = Phaser.Math.Linear;

export default {
    buildShapes() {
        this
            .addShape(new Lines().setName('triangle'))
    },

    updateShapes() {
        var right = this.width, left = 0,
            bottom = this.height, top = 0;
        var centerX = right / 2,
            centerY = bottom / 2;

        var triangle = this.getShape('triangle')
            .fillStyle(this.fillColor, this.fillAlpha)
            .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)

        if (this.shapeMode === 0) {
            var padding = this.padding;
            right -= padding.right;
            left += padding.left;
            bottom -= padding.bottom;
            top += padding.top;

            var pointsMapping = {
                0: {  // right
                    a: { x: left, y: top }, b: { x: left, y: bottom }, c: { x: right, y: centerY }
                },
                1: {  // down
                    a: { x: right, y: top }, b: { x: left, y: top }, c: { x: centerX, y: bottom }
                },
                2: {  // left
                    a: { x: right, y: bottom }, b: { x: right, y: top }, c: { x: left, y: centerY }
                },
                3: {  // up
                    a: { x: left, y: bottom }, b: { x: right, y: bottom }, c: { x: centerX, y: top }
                }
            }

            var wrapDirection = Wrap((this.verticeAngle / 90), 0, 4);
            var indexT0 = Math.floor(wrapDirection),
                indexT1 = (indexT0 + 1) % 4,
                t = wrapDirection - indexT0;
            var pointsT0 = pointsMapping[indexT0],
                pointsT1 = pointsMapping[indexT1];
            var pointAx = Linear(pointsT0.a.x, pointsT1.a.x, t);
            var pointAy = Linear(pointsT0.a.y, pointsT1.a.y, t);
            var pointBx = Linear(pointsT0.b.x, pointsT1.b.x, t);
            var pointBy = Linear(pointsT0.b.y, pointsT1.b.y, t);
            var pointCx = Linear(pointsT0.c.x, pointsT1.c.x, t);
            var pointCy = Linear(pointsT0.c.y, pointsT1.c.y, t);

            triangle
                .startAt(pointAx, pointAy).lineTo(pointBx, pointBy).lineTo(pointCx, pointCy)
                .close()

        } else {
            var radius = Math.min(centerX, centerY) * this.radius,
                verticeRotation = this.verticeRotation;

            triangle
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
}