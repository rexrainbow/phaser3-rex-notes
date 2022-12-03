const Wrap = Phaser.Math.Wrap;
const Linear = Phaser.Math.Linear;

var DrawFitTriangle = function () {
    var triangle = this.getShape('triangle');

    var padding = this.padding;
    var right = this.width - padding.right;
    var left = 0 + padding.left;
    var bottom = this.height - padding.bottom;
    var top = 0 + padding.top;
    var centerX = (left + right) / 2;
    var centerY = (top + bottom) / 2;

    var points = {
        0: {  // right
            a: { x: left, y: top }, b: { x: left, y: bottom }, c: { x: right, y: centerY }
        },
        1: {  // down
            a: { x: left, y: top }, b: { x: right, y: top }, c: { x: centerX, y: bottom }
        },
        2: {  // left
            a: { x: right, y: top }, b: { x: right, y: bottom }, c: { x: left, y: centerY }
        },
        3: {  // up
            a: { x: left, y: bottom }, b: { x: right, y: bottom }, c: { x: centerX, y: top }
        }
    }

    if (this.previousDirection === undefined) {
        var currentTrianglePoints = points[this.direction];
        var pa = currentTrianglePoints.a,
            pb = currentTrianglePoints.b,
            pc = currentTrianglePoints.c;

        triangle
            .startAt(pa.x, pa.y).lineTo(pb.x, pb.y).lineTo(pc.x, pc.y)
            .close();

    } else {
        var p0 = points[this.previousDirection];
        var p1 = points[this.direction];
        var t = this.easeDirectionProgress;
        var pax = Linear(p0.a.x, p1.a.x, t);
        var pay = Linear(p0.a.y, p1.a.y, t);
        var pbx = Linear(p0.b.x, p1.b.x, t);
        var pby = Linear(p0.b.y, p1.b.y, t);
        var pcx = Linear(p0.c.x, p1.c.x, t);
        var pcy = Linear(p0.c.y, p1.c.y, t);

        triangle
            .startAt(pax, pay).lineTo(pbx, pby).lineTo(pcx, pcy)
            .close();

    }

}
export default DrawFitTriangle;