import phaser from 'phaser/src/phaser.js';
import VirtualJoyStickPlugin from '../../plugins/virtualjoystick-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var controller = this.plugins.get('rexVirtualJoyStick').addVectorToCursorKeys({
            dir: '8dir',
            forceMin: 16
        });

        var graphics = this.add.graphics();

        this.input
            .on('pointerup', function () {
                graphics.clear();
                controller.clearVector();
            })
            .on('pointermove', function (pointer) {
                graphics.clear();
                if (!pointer.isDown) {
                    controller.clearVector();
                    return;
                }

                controller.setVector(pointer.downX, pointer.downY, pointer.x, pointer.y);

                graphics.lineStyle(3, 0xff0000).lineBetween(pointer.downX, pointer.downY, pointer.x, pointer.y);
            });


        this.cursorKeys = controller.createCursorKeys();
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexVirtualJoyStick',
            plugin: VirtualJoyStickPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);