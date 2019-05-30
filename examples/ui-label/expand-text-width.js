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
        this.rexUI.add.label({
            x: 400,
            y: 300,
            width: 300,
            orientation: 'x',

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),
            text: new MyText(this, 0, 0, 'abc'),
            expandTextWidth: true,
            icon: this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT),
            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10
            }
        })
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000);
    }

    update() { }
}

class MyText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style);
        scene.add.existing(this);
    }

    resize(width, height) {
        this.setFixedSize(width, height);
        return this;
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);