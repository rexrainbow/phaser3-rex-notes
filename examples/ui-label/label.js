import UIPlugin from 'rexTemplates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {}

    create() {
        var sizer = this.rexUI.add.sizer(400, 300, {
                orientation: 1
            })
            .add(
                this.rexUI.add.label({
                    background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0x1a237e),
                    text: this.add.text(0, 0, 'Left-to-right', {
                        fontSize: '24px'
                    }),
                    icon: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0x534bae),
                    space: {
                        left: 20,
                        right: 20,
                        top: 20,
                        bottom: 20,
                        icon: 10
                    }
                }), // Game object
                0, // Proportion
                'center', // Align
                0, // Padding
                true // Expand
            )
            .add(
                this.rexUI.add.label({
                    orientation: 1,
                    background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0x1a237e),
                    text: this.add.text(0, 0, 'Top-to-bottom', {
                        fontSize: '24px'
                    }),
                    icon: this.rexUI.add.roundRectangle(0, 0, 2, 2, 80, 0x534bae),
                    space: {
                        left: 20,
                        right: 20,
                        top: 20,
                        bottom: 20,
                        icon: 10
                    }
                }), // Game object
                0, // Proportion
                'center', // Align
                {
                    top: 20
                }, // Padding
                true // Expand
            )
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