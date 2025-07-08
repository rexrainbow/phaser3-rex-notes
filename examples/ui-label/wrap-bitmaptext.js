import phaser from '../../../phaser/src/phaser.js';
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

    preload() {
        this.load.bitmapFont('gothic', 'assets/fonts/gothic.png', 'assets/fonts/gothic.xml');
    }

    create() {
        var contentA = 'Phaser'
        var contentB = 'Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers.';

        var labelA = CreateLabel(this, contentA)
            .setPosition(400, 100)
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000)

        var labelB = CreateLabel(this, contentB)
            .setPosition(400, 400)
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000)
    }

    update() { }
}

var CreateLabel = function (scene, text) {
    return scene.rexUI.add.label({
        // orientation:'y',
        width: 600,
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_MAIN),
        text: scene.add.bitmapText(0, 0, 'gothic', text, 30),
        wrapText: true,
    });
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