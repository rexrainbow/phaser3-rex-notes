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
        var shape0 = CreateLine(graphics, 150, 200, 350, 300);
        var shape1 = CreateRectangle(graphics, 200, 200, 100, 100);
        DrawIntersectPoints(graphics, shape0, shape1);
    }

    update() { }
}

var CreateLine = function (graphics, x0, y0, x1, y1) {
    var geom = new Phaser.Geom.Line(x0, y0, x1, y1);
    graphics.strokeLineShape(geom);
    return geom;
}

var CreateRectangle = function (graphics, x, y, width, height) {
    var geom = new Phaser.Geom.Rectangle(x, y, width, height);
    graphics.strokeRectShape(geom);
    return geom;
}

var DrawIntersectPoints = function (graphics, line, rect) {
    var out = Phaser.Geom.Intersects.GetLineToRectangle(line, rect);
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