class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var debugGraphics = this.add.graphics({
            lineStyle: {
                color: 0x26418f
            },
            fillStyle: {
                color: 0x8e99f3
            }
        })

        addCurve(new Phaser.Curves.Line([
            200, 100,
            400, 200
        ]), 'getPoints', debugGraphics);
        addCurve(new Phaser.Curves.Line([
            200 + 400, 100,
            400 + 400, 200
        ]), 'getSpacedPoints', debugGraphics);

        addCurve(new Phaser.Curves.Ellipse(300, 350,
            100, 50),
            'getPoints', debugGraphics);
        addCurve(new Phaser.Curves.Ellipse(300 + 400, 350,
            100, 50),
            'getSpacedPoints', debugGraphics);

        addCurve(new Phaser.Curves.QuadraticBezier([
            200, 500,
            500, 600,
            200, 700
        ]), 'getPoints', debugGraphics);
        addCurve(new Phaser.Curves.QuadraticBezier([
            200 + 400, 500,
            500 + 400, 600,
            200 + 400, 700
        ]), 'getSpacedPoints', debugGraphics);
    }

    update(time, delta) {
    }
}

var addCurve = function (curve, getPointsMethodName, graphics) {
    curve.draw(graphics);
    var points = curve[getPointsMethodName](20);
    for (var i = 0, cnt = points.length; i < cnt; i++) {
        graphics.fillPointShape(points[i], 4)
    }
    return curve;
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1024,
    height: 768,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);