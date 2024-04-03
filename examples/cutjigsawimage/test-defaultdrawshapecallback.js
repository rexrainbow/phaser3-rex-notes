import phaser from 'phaser/src/phaser.js';
import DefaultDrawShapeCallback from '../../plugins/actions/CutJigsawImage/generateframes/jigsawpiece/DefaultDrawShapeCallback';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var graphics = this.add.graphics(
            {
                lineStyle: {
                    width: 1,
                    color: 0xff0000,
                    alpha: 1
                },
                fillStyle: {
                    color: 0x550000,
                    alpha: 1
                }
            }
        )

        DefaultDrawShapeCallback(
            graphics,
            130, 130,
            15, 15,
            { left: 0, right: 1, top: 0, bottom: 1 }
        )

        graphics.strokePath()
    }

    update() { }
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