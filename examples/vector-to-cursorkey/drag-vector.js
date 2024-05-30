import phaser from 'phaser/src/phaser.js';
import VectorToCursorKeys from '../../plugins/utils/input/VectorToCursorKeys';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var vector2CursorKeys = new VectorToCursorKeys({
            forceMin: 0
        });

        var graphics = this.add.graphics();

        this.input
            .on('pointerup', function () {
                graphics.clear();
                vector2CursorKeys.clearVector();
            })
            .on('pointermove', function (pointer) {
                graphics.clear();
                if (!pointer.isDown) {
                    vector2CursorKeys.clearVector();
                    return;
                }

                vector2CursorKeys.setVector(pointer.downX, pointer.downY, pointer.x, pointer.y);

                graphics.lineStyle(3, 0xff0000).lineBetween(pointer.downX, pointer.downY, pointer.x, pointer.y);
            });


        this.cursorKeys = vector2CursorKeys.createCursorKeys();
        this.print = this.add.text(0, 0, '')
    }

    update() {
        var s = 'Key down: ';
        for (var name in this.cursorKeys) {
            if (this.cursorKeys[name].isDown) {
                s += `${name} `;
            }
        }

        this.print.setText(s);
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
    scene: Demo
};

var game = new Phaser.Game(config);