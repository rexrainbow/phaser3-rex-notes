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
        var properties = [
            { $key: 'coin', max: 100, min: 10, step: 1 },
            {
                $type: 'folder', title: 'CharA',
                $key: 'charA',
                $properties: [
                    { $key: 'hp', int: true },
                    { $key: 'mp', int: true }
                ]
            }
        ]

        var viewport = this.scale.getViewPort();
        var panel0 = CreateMonitorPanel(this, style, memory, properties)
            .setPosition(viewport.centerX - 220, viewport.centerY)
            .layout()

        var panel1 = CreateMonitorPanel(this, style, memory, properties)
            .setPosition(viewport.centerX + 220, viewport.centerY)
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