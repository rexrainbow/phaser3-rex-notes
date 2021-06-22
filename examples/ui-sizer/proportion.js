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
        var leftProportion = 1, rightProportion = 3;
        this.rexUI.add.sizer({
            x: 400, y: 300,
            width: 400, height: 40,
            orientation: 'x',
        })
            .addBackground(
                this.rexUI.add.roundRectangle(0, 0, 1, 1, 0, COLOR_PRIMARY)
            )
            .add(
                this.add.zone(),             // child
                leftProportion,              // proportion, fixed width
                'center'                     // align vertically
            )
            .add(
                this.add.text(0, 0, 'A'),// child
                0,                           // proportion, fixed width
                'center'                     // align vertically
            )
            .add(
                this.add.zone(),             // child
                rightProportion,             // proportion, fixed width
                'center'                     // align vertically
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