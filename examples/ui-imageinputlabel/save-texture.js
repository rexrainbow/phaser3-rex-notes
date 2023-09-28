import phaser from 'phaser/src/phaser.js';
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
        var label = this.rexUI.add.imageInputLabel({
            orientation: 'y',
            x: 400, y: 300,
            width: 240,
            space: { left: 20, right: 20, top: 20, bottom: 20, icon: 20, text: 20 },

            iconWidth: 200, iconHeight: 200,

            background: this.rexUI.add.roundRectangle({
                radius: 20,
                strokeColor: COLOR_DARK,
                strokeWidth: 3
            }),

            iconBackground: this.add.rectangle(0, 0, 1, 1, COLOR_DARK),

            // Editable text input
            text: CreateCanvasInput(this),
            expandTextWidth: true,

            // 'Save' button 
            action: this.add.text(0, 0, 'Save'),

            canvas: {
                fill: 'grey'
            },

            clickTarget: 'icon',

            domButton: true, // false
        })
            .layout()

        var gameObject;

        label
            .on('select', function (file, label) {
                console.log(file);
                label.setText(label.getFileName(file));
            })
            .onClick(label.getElement('action'), function () {
                var key = label.text;
                label.saveTexture(key);
                console.log(`Save texture ${key}`)

                // Display new texture
                if (!gameObject) {
                    gameObject = this.add.image(0, 0, '').setOrigin(0);
                }
                gameObject.setTexture(key);
            }, this)

        // label.setClickOpenEnable(false);

    }

    update() { }
}

var CreateCanvasInput = function (scene) {
    return scene.rexUI.add.canvasInput({
        background: {
            'focus.stroke': 'red',
        },

        style: {
            fontSize: 16,
            backgroundBottomY: 3,
            backgroundHeight: 20,

            'cursor.color': 'black',
            'cursor.backgroundColor': 'white',
        },

        text: 'Click icon',

        selectAll: true
    })
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);