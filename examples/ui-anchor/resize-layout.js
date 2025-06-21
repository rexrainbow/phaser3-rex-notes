import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var sizer = this.rexUI.add.fixWidthSizer({
            anchor: {
                left: 'left+50',
                centerY: 'center',
            },
            space: {
                left: 3,
                right: 3,
                top: 3,
                bottom: 3,
                item: 8,
                line: 8,
            },
            width: 300,
        })
            .setOrigin(0.5, 0)
            .addBackground(this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_DARK));
        for (var i = 0; i < 40; i++) {
            sizer.add(this.rexUI.add.label({
                background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 14, COLOR_LIGHT),
                text: this.add.text(0, 0, `${i}`, {
                    fontSize: 18
                }),
                space: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,
                }
            }));
        }
        sizer.layout();

        this.input.once('pointerdown', function () {
            sizer.setMinWidth(200).layout()
        })
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.RESIZE, // ENVELOP
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);