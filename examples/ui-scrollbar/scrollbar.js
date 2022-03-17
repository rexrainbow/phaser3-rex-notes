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
        var bar0 = CreateHorizontalScrollBar(this)
            .setPosition(400, 550)
            .layout()

        var txt0 = this.add.text(200, 500, '').setText(bar0.value);
        bar0.on('valuechange', function (newValue, oldValue, scrollBar) {
            txt0.text = newValue;
        })

        var bar1 = CreateVerticalScrollBar(this)
            .setPosition(650, 300)
            .layout()

        var txt1 = this.add.text(600, 50, '').setText(bar1.value);
        bar1.on('valuechange', function (newValue, oldValue, scrollBar) {
            txt1.text = newValue;
        })
    }

    update() { }
}

var CreateHorizontalScrollBar = function (scene) {
    return scene.rexUI.add.scrollBar({
        width: 400,
        orientation: 'x',

        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_DARK),

        buttons: {
            left: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_PRIMARY),
            right: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_PRIMARY),
        },

        slider: {
            thumb: scene.rexUI.add.roundRectangle(0, 0, 40, 20, 10, COLOR_LIGHT),
        },

        space: {
            left: 10, right: 10, top: 10, bottom: 10
        }
    })
}


var CreateVerticalScrollBar = function (scene) {
    return scene.rexUI.add.scrollBar({
        height: 400,
        orientation: 'y',

        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_DARK),

        buttons: {
            left: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_PRIMARY),
            right: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_PRIMARY),
        },

        slider: {
            thumb: scene.rexUI.add.roundRectangle(0, 0, 20, 40, 10, COLOR_LIGHT),
        },

        space: {
            left: 10, right: 10, top: 10, bottom: 10
        }
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