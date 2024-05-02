import phaser from 'phaser/src/phaser.js';
import CreateMonitorPanel from '../../templates/markdownvisualnovel/monitor/CreateMonitorPanel.js';

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var style = {
            width: 340,
            colors: {
                main: 0x424242,
                light: 0x6d6d6d,
                dark: 0x1b1b1b
            }
        }

        var memory = {
            coin: 10,
            charA: {
                hp: 100,
                mp: 100
            }
        }

        // Formatter of text
        var textFormat = function (value) { return value.toFixed(0); }
        var properties = [
            { $key: 'coin', max: 100, min: 10, format: textFormat },
            {
                $type: 'folder', title: 'CharA',
                $key: 'charA',
                $properties: [
                    { $key: 'hp', format: textFormat },
                    { $key: 'mp', format: textFormat }
                ]
            }
        ]

        var centerX = 1024 / 2;
        var centerY = 768 / 2;
        var panel0 = CreateMonitorPanel(this, style, memory, properties)
            .setPosition(centerX - 220, centerY)
            .layout()

        var panel1 = CreateMonitorPanel(this, style, memory, properties)
            .setPosition(centerX + 220, centerY)
            .layout()

    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1024,
    height: 768,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);