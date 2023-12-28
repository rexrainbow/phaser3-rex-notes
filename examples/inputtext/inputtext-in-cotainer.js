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
        var inputText = this.add.rexInputText(0, 0, 200, 100, {
            type: 'textarea',
            text: 'hello world',
            fontSize: '30px',
        })
            .setOrigin(0.5)

        this.add.container(400, 300, [inputText])
            //.setVisible(false)
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