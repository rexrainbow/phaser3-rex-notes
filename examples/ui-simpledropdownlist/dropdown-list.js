import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import SimpleDropDownList from '../../templates/ui/simpledropdownlist/SimpleDropDownList.js';

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
        var stringOption = false;
        var options;
        if (stringOption) {
            options = ['A', 'BB', 'CCC', 'DDDD'];
        } else {
            options = [
                { text: 'A', value: 0 },
                { text: 'BB', value: 10 },
                { text: 'CCC', value: 100 },
                { text: 'DDDD', value: 1000 },
            ]
        }

        var style = {
            label: {
                space: { left: 10, right: 10, top: 10, bottom: 10 },
                background: {
                    color: COLOR_PRIMARY
                },
                text: {
                    fixedWidth: 150
                },
            },

            button: {
                space: { left: 10, right: 10, top: 10, bottom: 10 },
                background: {
                    color: COLOR_DARK,
                    strokeWidth: 0,
                    'hover.strokeColor': 0xffffff,
                    'hover.strokeWidth': 2,
                },
                text: {
                    fontSize: 20
                },
            }
        }

        var dropDownList = new SimpleDropDownList(this, style)
        this.add.existing(dropDownList);

        dropDownList
            .resetDisplayContent('-- Select --')
            .setOptions(options)
            .setPosition(400, 300)
            .layout()

    }

    update() { }
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