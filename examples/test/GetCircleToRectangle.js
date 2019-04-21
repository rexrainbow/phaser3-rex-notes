class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var graphics = this.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xffffff,
                alpha: 1
            },
            fillStyle: {
                color: 0xff0000,
                alpha: 1
            },
        });
        var shape0 = CreateCircle(graphics, 150, 150, 100);
        var shape1 = CreateRectangle(graphics, 200, 200, 100, 100);
        DrawIntersectPoints(graphics, shape0, shape1);
    }

    update() { }
}

var CreateCircle = function (graphics, x, y, radius) {
    var geom = new Phaser.Geom.Circle(x, y, radius);
    graphics.strokeCircleShape(geom);
    return geom;
}

var CreateRectangle = function (graphics, x, y, width, height) {
    var geom = new Phaser.Geom.Rectangle(x, y, width, height);
    graphics.strokeRectShape(geom);
    return geom;
}

var DrawIntersectPoints = function (graphics, circle, rect) {
    var out = Phaser.Geom.Intersects.GetCircleToRectangle(circle, rect);
    for (var i = 0, cnt = out.length; i < cnt; i++) {
        graphics.fillPointShape(out[i], 10);
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
};

var game = new Phaser.Game(config);