import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
        this.load.image('bg', 'assets/images/ninepatch/nine-patch.png');
    }

    create() {
        var bgStyle = {
            key: 'bg',
            leftWidth: 20, rightWidth: 20,
            topHeight: 20, bottomHeight: 20,

            'active.shineSpeed': 1,
            'active.hue': 180,

            'hover.glowColor': 0xff0000,
        };

        var buttons = this.rexUI.add.buttons({
            x: 400, y: 300,
            orientation: 'y',

            buttons: [
                createButton(this, 'AAA', bgStyle),
                createButton(this, 'BBB', bgStyle),
                createButton(this, 'CCC', bgStyle),
                createButton(this, 'DDD', bgStyle),
            ],

            space: { item: 8 },

            buttonsType: 'radio'

        })
            .layout()
            .on('button.statechange', function (button, index, value, previousValue) {
                button.getElement('background').setActiveState(value);
            })
            .on('button.over', function (button, index, pointer, event) {
                button.getElement('background').setHoverState(true);
            })
            .on('button.out', function (button, index, pointer, event) {
                button.getElement('background').setHoverState(false);
            })


    }

    update() { }
}

var createButton = function (scene, text, bgStyle) {
    return scene.rexUI.add.label({
        width: 150, height: 50,
        background: scene.rexUI.add.statesNineSlice(bgStyle),
        text: scene.add.text(0, 0, text, { color: 'black' }),
        space: { left: 10, right: 10, top: 10, bottom: 10 },
        align: 'center',
        name: text
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