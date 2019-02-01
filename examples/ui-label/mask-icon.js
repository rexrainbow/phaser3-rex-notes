import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {}

    create() {
        this.rexUI.add.label({
                x: 400,
                y: 300,

                background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0x1a237e),
                text: this.add.text(0, 0, 'Circle mask', {
                    fontSize: '24px'
                }),
                icon: this.rexUI.add.roundRectangle(0, 0, 40, 40, 0, 0x534bae), // Rectangle shape
                iconMask: true,
                space: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,
                    icon: 10
                }
            })
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000)
    }

    update() {}
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