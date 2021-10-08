import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
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
        this.rexUI.add.overlapSizer(400, 300, 300, 300, { space: 10 })
            // .addBackground(this.rexUI.add.roundRectangle(0, 0, 0, 0, 0, 0xffffff))
            .add(
                this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_PRIMARY), // child
                'main' // key
            )
            .add(
                this.rexUI.add.roundRectangle(0, 0, 40, 0, 20, COLOR_DARK), // child
                {
                    key: 'right',
                    align: 'right',
                    expand: { height: true }
                },
            )
            .add(
                this.rexUI.add.roundRectangle(0, 0, 40, 40, 10, COLOR_LIGHT), // child
                {
                    key: 'bottom',
                    align: 'center-bottom',
                    offsetX: -100,
                    offsetY: -10,
                    expand: false,
                },
            )
            .add(
                this.rexUI.add.label({
                    background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_DARK),
                    icon: this.rexUI.add.roundRectangle(0, 0, 24, 24, 10, COLOR_LIGHT),
                    text: this.add.text(0, 0, 'Start'),
                    space: {
                        left: 20, right: 20, top: 20, bottom: 20,
                        icon: 10
                    }
                }), // child
                {
                    key: 'center',
                    align: 'center',
                    expand: false
                },
            )
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000)
    }

    update() { }
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);