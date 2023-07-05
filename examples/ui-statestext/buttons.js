import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() { }

    create() {
        var textStyle = {
            fontSize: 24,
            padding: { left: 10, right: 10, top: 10, bottom: 10 },

            backgroundColor: '#260e04',
            'active.backgroundColor': '#7b5e57',

            color: '#FFFFFF',
            'active.color': '#000000',
            'active.fontStyle': 'bold',
        }

        var buttons = this.rexUI.add.buttons({
            x: 400, y: 300,
            width: 200,
            orientation: 'y',

            buttons: [
                createButton(this, 'AAA', textStyle),
                createButton(this, 'BBB', textStyle),
                createButton(this, 'CCC', textStyle),
                createButton(this, 'DDD', textStyle),
            ],

            space: { item: 8 },

            buttonsType: 'radio'

        })
            .layout()
            .on('button.statechange', function (button, index, value, previousValue) {
                button.getElement('text').setActiveState(value);
            })
            .on('button.over', function (button, index, pointer, event) {
                button.getElement('text').setHoverState(true);
            })
            .on('button.out', function (button, index, pointer, event) {
                button.getElement('text').setHoverState(false);
            })


    }

    update() { }
}

var createButton = function (scene, text, textStyle) {
    return scene.rexUI.add.label({
        text: scene.rexUI.add.statesText(textStyle).setText(text),
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