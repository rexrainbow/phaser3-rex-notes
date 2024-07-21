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
        var sizer = this.rexUI.add.sizer({
            x: 400, y: 300,
            width: 120, height: 120,
            orientation: 'y',
            space: { left: 10, right: 10, top: 10, bottom: 10, item: 5 }
        })
            .addBackground(
                this.rexUI.add.roundRectangle({ strokeColor: 0xffffff })
            )
            .add(
                this.rexUI.add.roundRectangle({ color: COLOR_DARK, width: 60, height: 60 }),
            )
            .add(
                this.rexUI.fontSizeExpandText(
                    this.add.text(0, 0, 'BBBB', { backgroundColor: '#4e342e', testString: 'BBBB' })
                ),
                { proportion: 1, expand: true }
            )
            .layout()

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
    dom: {
        createContainer: true
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