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
        var printText = this.add.text(400, 200, '', {
            fontSize: '12px',
            fixedWidth: 100,
            fixedHeight: 100,
        }).setOrigin(0.5);
        var inputText = this.add.rexInputText(400, 400, 10, 10, {
            type: 'textarea',
            text: 'hello world',
            fontSize: '12px',
        })
            .resize(100, 100)
            .setOrigin(0.5)
            .on('textchange', function (inputText) {
                printText.text = inputText.text;
            })
            .on('focus', function (inputText) {
                console.log('On focus');
            })
            .on('blur', function (inputText) {
                console.log('On blur');
            })
            .on('click', function (inputText) {
                console.log('On click');
            })
            .on('dblclick', function (inputText) {
                console.log('On dblclick');
            })
            .on('pointermove', function (inputText) {
                console.log('On pointermove');
            })
            .on('keydown', function (inputText, e) {
                //console.log(`Keydown ${e.which} : ${e.code}`)
            })
            .on('keypress', function (inputText, e) {
                //console.log(`keypress ${e.which} : ${e.code}`)
            })

        printText.text = inputText.text;

        // this.input.keyboard.addKey('ENTER').on('down', function (event) {
        //     console.log('enter');
        // });

        this.input.on('pointerdown', function () {
            inputText.setBlur();
            console.log('pointerdown outside');
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