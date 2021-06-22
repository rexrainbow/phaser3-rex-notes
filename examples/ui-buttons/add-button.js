import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';

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
        var align = 'center';
        var buttons = this.rexUI.add.buttons({
            x: 400, y: 300,
            width: 300,
            orientation: 'x',

            buttons: [
                createButton(this, 'A'), // Add button in constructor
            ],

            align: align
        })
            .addButton(createButton(this, 'B')) // Add a button
            .addButton([ // Add buttons
                createButton(this, 'C'),
                createButton(this, 'D')
            ])
            //.clearButtons(true)
            //.addButton([
            //    createButton(this, 'E'),
            //    createButton(this, 'F')
            //])
            .removeButton('C', true)
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000)

        buttons
            .on('button.click', function (button, index, pointer, event) {
                console.log(`Click button-${button.text}`);
            })

    }

    update() { }
}

var createButton = function (scene, text) {
    return scene.rexUI.add.label({
        width: 40,
        height: 40,
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),
        space: {
            left: 10,
            right: 10,
        },
        align: 'center',
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