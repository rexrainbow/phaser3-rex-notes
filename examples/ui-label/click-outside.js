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

    preload() {
    }

    create() {
        var ui = CreatePanel(this)
            .setPosition(400, 300)
            .layout()
            .setVisible(false)

        var button = this.add.text(0, 300, 'Open', { fontSize: 30 })
            .setOrigin(0, 0.5)
            .setInteractive()
            .on('pointerup', function () {
                ui.setVisible(true);
            })
    }

    update() { }
}

var CreatePanel = function (scene) {
    var panel = scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_MAIN),
        text: scene.add.text(0, 0, 'Phaser', { fontSize: 30 }),
        space: {
            left: 20, right: 20, top: 20, bottom: 20
        }
    })

    panel.onClickOutside(function () {
        panel.setVisible(false);
    });

    return panel;
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