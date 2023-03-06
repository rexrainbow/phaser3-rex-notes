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
        var style = {
            background: {
                radius: 10,

                color: COLOR_DARK,
                'active.color': COLOR_PRIMARY,

                strokeWidth: 0,
                'hover.strokeColor': 0xffffff,
                'hover.strokeWidth': 2
            },
            text: {
                fontSize: 18
            },
            space: { left: 10, right: 10, top: 10, bottom: 10 },
        }

        var buttons = this.rexUI.add.buttons({
            x: 400, y: 300,
            width: 200,
            orientation: 'y',

            buttons: [
                createButton(this, style, 'AAA'),
                createButton(this, style, 'BBB'),
                createButton(this, style, 'CCC'),
                createButton(this, style, 'DDD'),
            ],

            space: { item: 8 },

            buttonsType: 'radio'

        })
            .layout()
            .on('button.statechange', function (button, index, value, previousValue) {
                button.setActiveState(value);
            })
            .on('button.over', function (button, index, pointer, event) {
                button.setHoverState(true);
            })
            .on('button.out', function (button, index, pointer, event) {
                button.setHoverState(false);
            })


    }

    update() { }
}

var createButton = function (scene, style, text) {
    return scene.rexUI.add.simpleLabel(style)
        .resetDisplayContent(text)
        .setName(text);
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