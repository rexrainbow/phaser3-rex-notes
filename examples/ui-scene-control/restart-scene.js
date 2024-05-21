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
        CreateLabel(this, 'Restart scene')
            .setPosition(200, 300)
            .onClick(function () {
                this.scene.restart()
            }, this)

        CreateLabel(this, 'Remove scene')
            .setPosition(500, 300)
            .layout()
            .onClick(function () {
                this.scene.remove();
            }, this)
    }

    update() { }
}

var CreateLabel = function (scene, text) {
    return scene.rexUI.add.label({
        space: { left: 10, right: 10, top: 10, bottom: 10 },
        background: scene.rexUI.add.roundRectangle({ strokeColor: COLOR_LIGHT }),
        text: scene.add.text(0, 0, text),
    })
        .layout()
        .on('destroy', function () {
            console.log('Destroy label')
        })
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