import CreateRectangleTexture from '../../plugins/utils/texture/CreateRectangleTexture.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        CreateRectangleTexture(this, 'banner', 400, 400, 0x008800);
        this.debugGraphics = this.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xff0000,
                alpha: 0.5
            },
        }).setDepth(1)
        this.rope = this.add.rope(400, 300, 'banner', null, 20)
            .setDebug(this.debugGraphics)

        this.count = 0;

        // UpdateRope.call(this);
    }

    update() {

        UpdateRope.call(this);
    }
}

var UpdateRope = function () {
    this.debugGraphics.clear();

    this.count += 0.1;

    let points = this.rope.points;

    for (let i = 0; i < points.length; i++) {
        points[i].y = Math.sin(i * 0.5 + this.count) * 32;
        // points[i].x += ((i%3) - 1)* 30
        this.debugGraphics
            .fillStyle(0xff0000, 1)
            .fillPoint(
                (points[i].x + this.rope.x),
                (points[i].y + this.rope.y),
                10
            )
    }

    this.rope.setDirty();
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);