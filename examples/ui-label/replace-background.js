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
        var ui = CreateLabel(this, 'Hello world').setPosition(400, 300);

        var newBackground = this.rexUI.add.roundRectangle({
            radius: -20,
            color: COLOR_DARK,
            strokeColor: COLOR_LIGHT,
        })
        ReplaceBackground(ui, newBackground);
    }

    update() { }
}

var CreateLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle({
            radius: 20,
            color: COLOR_PRIMARY,
            strokeColor: COLOR_LIGHT,
        }),
        text: scene.add.text(0, 0, text, {
            fontSize: '24px'
        }),
        space: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
            icon: 10
        }
    })
        .layout();
}

var ReplaceBackground = function (ui, newChild) {
    var child = ui.getElement('background');
    child.displayList.moveBelow(newChild, child)

    ui
        .removeBackground(child, true)
        .addBackground(newChild, 'background')        
        .layout()
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