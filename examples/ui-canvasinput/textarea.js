import phaser from '../../../phaser/src/phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var print = this.add.text(0, 0, '');

        var dialog = CreateFeedbackDialog(this)
            .setPosition(400, 300)
            .layout()
            .popUp(500)
            .on('send', function (content) {
                print.text = `Send: '${content}'`;
            })
            .on('close', function () {
                dialog.scaleDownDestroy(500);
            })

    }

    update() { }
}

var CreateFeedbackDialog = function (scene, config) {
    var dialog = scene.rexUI.add.dialog({
        space: {
            left: 20, right: 20, top: 20, bottom: -20,
            title: 10,
            content: 10,
            action: 30

        },

        background: scene.rexUI.add.roundRectangle({
            radius: 20, color: COLOR_MAIN
        }),

        title: CreateTitle(scene).setText('Feedback'),

        content: CreateCanvasInput(scene),

        actions: [
            CreateButton(scene).setText('Send'),
            CreateButton(scene).setText('Close'),
        ],

        expand: {
            title: false,
        }
    })

    dialog
        .on('action.click', function (button, index, pointer, event) {
            if (index === 0) { // Send button                
                var content = dialog.getElement('content').text;
                dialog.emit('send', content);
            }

            dialog.emit('close');
        });

    dialog.getElement('content').open();

    return dialog;
}

var CreateCanvasInput = function (scene) {
    return scene.rexUI.add.canvasInput({
        width: 400, height: 300,
        background: {
            color: '#260e04',

            stroke: null,
            'focus.stroke': '#7b5e57',
        },

        style: {
            fontSize: 20,
            backgroundBottomY: 1,
            backgroundHeight: 20,

            'cursor.color': 'black',
            'cursor.backgroundColor': 'white',
        },

        selectAll: true,
        textArea: true,
        maxLength: 500,
    })
}

var CreateTitle = function (scene) {
    return scene.rexUI.add.label({
        // space: { left: 10, right: 10, top: 10, bottom: 10, },

        // background: scene.rexUI.add.roundRectangle({
        //     radius: 10, color: COLOR_LIGHT
        // }),

        text: scene.add.text(0, 0, '', { fontSize: 30 }),
    })
}

var CreateButton = function (scene) {
    return scene.rexUI.add.label({
        space: { left: 10, right: 10, top: 10, bottom: 10, },

        background: scene.rexUI.add.roundRectangle({
            radius: 10, color: COLOR_DARK, strokeColor: COLOR_LIGHT
        }),

        text: scene.add.text(0, 0, '', { fontSize: 20 }),
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