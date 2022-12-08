import phaser from 'phaser/src/phaser.js';
import InputTextPlugin from '../../plugins/inputtext-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var printText = this.add.text(100, 200, '', {
            fontSize: '12px',
            fixedWidth: 100,
            fixedHeight: 100,
        }).setOrigin(0);
        var inputText = this.add.rexInputText(100, 400, 100, 100, {
            type: 'textarea',
            text: 'hello world',
            fontSize: '12px',
            backgroundColor: 'grey'
        })
            .setOrigin(0)
            .on('textchange', function (inputText) {
                printText.text = inputText.text;
            })
        printText.text = inputText.text;

        this.add.text(0, 0, 'Full screen')
            .setInteractive()
            .on('pointerdown', function () {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                    // On stop fulll screen
                } else {
                    this.scale.startFullscreen();
                    // On start fulll screen
                    debugger
                }
            }, this);
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
    fullscreenTarget: 'phaser-example',
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