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
        var panel = this.rexUI.add.sizer({
            x: 400, y: 300,
            orientation: 'y'
        })

        var names = ['A', 'BB', 'CCC', 'DDDD', 'EEEEE', 'FFFFFF', 'GGGGGGG', 'HHHHHHHH'];
        for (var i = 0, cnt = names.length; i < cnt; i++) {
            panel.add(
                CreateLabel(this, 200, 40, `${names[i]} say hello`),
            )
        }

        panel.layout()
    }

    update() { }
}

var CreateLabel = function (scene, width, height, text) {
    return scene.rexUI.add.label({
        width: width,
        height: height,

        space: {
            left: 5, right: 5, top: 5, bottom: 5
        },

        background: scene.rexUI.add.roundRectangle({
            strokeColor: COLOR_LIGHT
        }),

        text: scene.rexUI.add.BBCodeText(0, 0, text, { valign: 'center' }),

        adjustTextFontSize: true
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