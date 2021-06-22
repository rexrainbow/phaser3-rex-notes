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
            id: 'myNumberInput',
            type: 'number',
            text: '0',
            fontSize: '12px',
        })
            .resize(100, 100)
            .setOrigin(0.5)
            .on('textchange', function (inputText) {
                printText.text = inputText.text;
            })

        inputText.node.addEventListener("keypress", function (evt) {
            if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
                evt.preventDefault();
            }
        });

        printText.text = inputText.text;

        // this.input.keyboard.addKey('ENTER').on('down', function (event) {
        //     console.log('enter');
        // });

        var style = document.createElement('style');
        style.innerHTML = `
        #myNumberInput::-webkit-inner-spin-button, 
        #myNumberInput::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }`;
        document.head.appendChild(style);
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