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
        var print = this.add.text(0, 0, '');

        var panel = this.rexUI.add.sides({
            x: 400, y: 300,
            width: 300, height: 400,

            // Side menu is above panel
            panel: CreatePanel(this),
            rightSide: CreateSideMenu(this, ['A', 'B', 'C']),

            // Callbacks
            showChildCallback: 'fade'
        })
            .layout()
            .reset()
            .drawBounds(this.add.graphics(), 0xff0000);

        panel.getElement('panel')
            .setInteractive()
            .on('pointerup', function () {
                panel.toggleRightSide();
            })

        panel.getElement('rightSide')
            .on('button.click', function (button) {
                print.text += `${button.text}\n`;
            })
    }

    update() { }
}

var CreatePanel = function (scene) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_PRIMARY),
        text: scene.add.text(0, 0, 'Panel'),
    });
}

var CreateSideMenu = function (scene, items) {
    // Background is above buttons
    var background = scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_DARK);
    var buttons = [];
    for (var i = 0, cnt = items.length; i < cnt; i++) {
        buttons.push(
            scene.rexUI.add.label({
                text: scene.add.text(0, 0, items[i]),
            })
        );
    }

    return scene.rexUI.add.buttons({
        width: 80,
        orientation: 'y',

        background: background,
        buttons: buttons
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