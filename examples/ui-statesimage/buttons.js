import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
        this.load.image('pause', 'assets/images/pause.png');
        this.load.image('play', 'assets/images/play.png');
    }

    create() {
        var iconStyle = {
            key: 'pause',
            'active.key': 'play',

            scale: 1,
            'hover.scale': 1.5,

            'hover.tint': 0xff0000,
        }

        var buttons = this.rexUI.add.buttons({
            x: 400, y: 300,
            orientation: 'y',

            buttons: [
                createButton(this, 'AAA', iconStyle),
                createButton(this, 'BBB', iconStyle),
                createButton(this, 'CCC', iconStyle),
                createButton(this, 'DDD', iconStyle),
            ],

            space: { item: 8 },

            buttonsType: 'radio'

        })
            .layout()
            .on('button.statechange', function (button, index, value, previousValue) {
                button.getElement('icon').setActiveState(value);
            })
            .on('button.over', function (button, index, pointer, event) {
                button.getElement('icon').setHoverState(true);
            })
            .on('button.out', function (button, index, pointer, event) {
                button.getElement('icon').setHoverState(false);
            })


    }

    update() { }
}

var createButton = function (scene, text, iconStyle) {
    return scene.rexUI.add.label({
        icon: scene.rexUI.add.statesImage(iconStyle),
        space: { left: 10, right: 10, top: 10, bottom: 10 },
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