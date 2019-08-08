import Blitter from '../../plugins/gameobjects/blitter/blitterbase/Blitter.js';
import CreateRectangleTexture from '../../plugins/utils/texture/CreateRectangleTexture.js';
import LogMaxDelta from '../../plugins/utils/system/LogMaxDelta.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        CreateRectangleTexture(this, 'dot', 16);
        var blitter = new Blitter(this, 400, 300, 'dot');
        this.add.existing(blitter);

        var points = [
            { x: 400, y: 300, color: 0xff0000, scale: 1 },
            { x: 200, y: 200, color: 0x00ff00, scale: 2 },
            { x: 600, y: 400, color: 0x0000ff, scale: 3 },
        ]

        for (var i = 0, cnt = points.length; i < cnt; i++) {
            var point = points[i];
            blitter.create(point.x - blitter.x, point.y - blitter.y)
                .setTint(point.color)
                .setScale(point.scale)
        }

        this.blitter = blitter;
    }

    update(time) {
        this.blitter.rotation += 0.01;
        LogMaxDelta(time);
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