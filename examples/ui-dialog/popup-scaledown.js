import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() { }

    create() {
        var dialog = CreateDialog(this)
            .setPosition(400, 300)

        var button = this.add.text(0, 300, 'Open')
            .setInteractive()
            .on('pointerdown', function () {
                OpenDialog(dialog);
            })

    }

    update() { }
}

var OpenDialog = function (dialog) {
    if (dialog.scaleX > 0) {
        return;
    }

    // Scale up from `0` to **current scale** of game object.
    dialog
        .setScale(1)
        .popUp(1000)

}

var CreateDialog = function (scene, onClickButton) {
    var dialog = scene.rexUI.add.dialog({
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),

        title: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x003c8f),
            text: scene.add.text(0, 0, 'Title', {
                fontSize: '24px'
            }),
            space: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 10
            }
        }),

        content: scene.add.text(0, 0, 'Do you want to build a snow man?', {
            fontSize: '24px'
        }),

        actions: [
            CreateLabel(scene, 'Yes'),
            CreateLabel(scene, 'No')
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
            actions: 'right', // 'center'|'left'|'right'
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
        })

    dialog
        .on('button.click', function (button, groupName, index, pointer, event) {
            dialog.scaleDown(1000)

            if (onClickButton) {
                onClickButton(button, index)
            }
        })

    dialog
        .layout()
        .setScale(0);

    return dialog;
}

var CreateLabel = function (scene, text) {
    return scene.rexUI.add.label({
        // width: 40,
        // height: 40,

        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),

        text: scene.add.text(0, 0, text, {
            fontSize: '24px'
        }),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        }
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