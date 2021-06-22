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

    preload() {
        this.load.image('close', 'assets/images/close.png');
    }

    create() {
        var horizonLabel = this.rexUI.add.label({
            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY).setName('bgH'),
            text: this.add.text(0, 0, 'Left-to-right', {
                fontSize: '24px'
            }),
            icon: this.add.rectangle(0, 0, 40, 40, COLOR_DARK).setName('iconH'),
            action: this.add.image(0, 0, 'close').setTint(COLOR_LIGHT),
            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
                text: 10,
            }
        });

        var verticalLabel = this.rexUI.add.label({
            orientation: 1,
            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY).setName('bgV'),
            text: this.add.text(0, 0, 'Top-to-bottom', {
                fontSize: '24px'
            }),
            icon: this.rexUI.add.roundRectangle(0, 0, 2, 2, 80, COLOR_DARK).setName('iconV'),
            action: this.add.image(0, 0, 'close').setTint(COLOR_LIGHT),
            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
                text: 10,
            }
        });

        var sizer = this.rexUI.add.sizer(400, 300, {
            orientation: 1
        })
            .add(
                horizonLabel, // Game object
                0, // Proportion
                'center', // Align
                0, // Padding
                true // Expand
            )
            .add(
                verticalLabel, // Game object
                0, // Proportion
                'center', // Align
                {
                    top: 20
                }, // Padding
                true // Expand
            )
            .layout()

        // Draw children's bounds and name
        var debugGraphics = this.add.graphics();
        sizer
            .drawBounds(debugGraphics,
                {
                    color: 0xff00ff,
                    name: {
                        createTextCallback: function (scene) {
                            return scene.add.text(0, 0, '', { color: '#ff0' })
                        },
                        align: 'right-bottom'
                    }

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