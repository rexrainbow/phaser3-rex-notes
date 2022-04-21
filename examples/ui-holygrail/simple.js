import phaser from 'phaser/src/phaser.js';
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
        this.rexUI.add.holyGrail({
            x: 400, y: 300,
            width: 800 - 20, height: 600 - 20,

            header: this.add.rectangle(0, 0, 10, 60, COLOR_PRIMARY), // Fixed height
            leftSide: this.add.rectangle(0, 0, 200, 10, COLOR_LIGHT), // Fixed width
            content: this.add.rectangle(0, 0, 300, 200, COLOR_DARK),
            rightSide: this.add.rectangle(0, 0, 100, 10, COLOR_LIGHT), // Fixed width
            footer: this.add.rectangle(0, 0, 10, 30, COLOR_PRIMARY),// Fixed height

            space: {
                header: 10,
                footer: 10,
                leftSide: 10,
                rightSide: 10
            }
        })
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