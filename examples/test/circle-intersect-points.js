class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var shape0 = CreateShape.call(this, 150, 150, 100);
        var shape1 = CreateShape.call(this, 250, 250, 100);
        DrawIntersectPoints.call(this, shape0.getData('geom'), shape1.getData('geom'));

        var shape2 = CreateShape.call(this, 550, 300, 100);
        var shape3 = CreateShape.call(this, 650, 300, 100);
        DrawIntersectPoints.call(this, shape2.getData('geom'), shape3.getData('geom'));
    }

    update() { }
}

var CreateShape = function (x, y, radius) {
    var shape = this.add.circle(x, y, radius).setStrokeStyle(1, 0x00ff00);
    shape.setData('geom', new Phaser.Geom.Circle(x, y, radius));
    return shape;
}

var DrawIntersectPoints = function (circle0, circle1) {
    var out = Phaser.Geom.Intersects.GetCircleToCircle(circle0, circle1);
    for (var i = 0, cnt = out.length; i < cnt; i++) {
        this.add.circle(out[i].x, out[i].y, 8, 0xff0000);
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