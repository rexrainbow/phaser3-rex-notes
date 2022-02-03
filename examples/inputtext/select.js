import 'phaser';
import InputTextPlugin from '../../plugins/inputtext-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var printText = this.add.text(400, 200, '', {
            fontSize: '12px',
            fixedWidth: 100,
            fixedHeight: 100,
        }).setOrigin(0.5);

        var inputText = this.add.rexInputText(400, 400, 10, 10, {
            text: 'hello world',
            fontSize: '12px',
        })
            .selectText(2, 10)
            .resize(100, 100)
            .setOrigin(0.5)
            .on('select', function (inputText) {
                printText.text = inputText.selectedText;
            })
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
    dom: {
        createContainer: true
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexInputText',
            plugin: InputTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);