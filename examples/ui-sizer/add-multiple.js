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
        var background = this.add.rectangle(0, 0, 0, 0, 0x880000);

        var gameObjects = [];
        for (var i = 0; i < 5; i++) {
            gameObjects.push(this.add.rectangle(0, 0, 50, 50, 0x005555));
        }

        this.rexUI.add.sizer({
            x: 400, y: 300,
            space: { left: 10, right: 10, top: 10, bottom: 10 }
        })
            .addBackground(background)
            .addMultiple(
                gameObjects,
                { padding: { left: 5, right: 5, top: 5, bottom: 5 } }
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