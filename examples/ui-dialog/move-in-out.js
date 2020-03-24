import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() { }

    create() {
        var dialog = CreateAlert('A message')
            .layout()
            // .drawBounds(this.add.graphics(), 0xff0000)
            .popUp(1000);

        this.print = this.add.text(0, 0, '');
        dialog
            .on('button.click', function (button, groupName, index, pointer, event) {
                this.print.text += index + ': ' + button.text + '\n';
            }, this)
            .on('button.over', function (button, groupName, index, pointer, event) {
                button.getElement('background').setStrokeStyle(1, 0xffffff);
            })
            .on('button.out', function (button, groupName, index, pointer, event) {
                button.getElement('background').setStrokeStyle();
            });
    }

    update() { }
}

var CreateAlertDialog = function (scene, x, y) {
    var dialog = scene.rexUI.add.dialog({
        x: x, y: y,
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),

        title: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x003c8f),
            text: scene.add.text(0, 0, '', {
                fontSize: '24px'
            }),
            space: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 10
            }
        }),

        content: scene.add.text(0, 0, '', {
            fontSize: '24px'
        }),

        actions: [
            scene.rexUI.add.label({
                background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),

                text: scene.add.text(0, 0, 'OK', {
                    fontSize: '24px'
                }),

                space: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10
                }
            })
        ],

        space: {
            title: 25,
            content: 25,
            action: 15,

            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
        },

        align: {
            actions: 'center', // 'center'|'left'|'right'
        },

        expand: {
            content: false,  // Content is a pure text object
        }
    })
        .on('button.over', function (button, groupName, index, pointer, event) {
            button.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('button.out', function (button, groupName, index, pointer, event) {
            button.getElement('background').setStrokeStyle();
        });

    return dialog;
}

var SetAlertDialog = function (dialog, title, content) {
    if (title === undefined) {
        title = '';
    }
    if (content === undefined) {
        content = '';
    }
    dialog.getElement('title').text = title;
    dialog.getElement('content').text = content;
    dialog.layout();
    return dialog;
}

var AlertDialog;
var Alert = function(title, content) {
    if (!AlertDialog) {
        AlertDialog = CreateAlertDialog()
    }
    SetAlertDialog(AlertDialog, title, content)
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