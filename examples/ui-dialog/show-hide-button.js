import UIPlugin from '../../templates/ui/ui-plugin.js';

const GetValue = Phaser.Utils.Objects.GetValue;

const data = {
    title: 'Question 1',
    content: '1 + 1 + 1 + 1 = ',
    choices: [3, 4, 5],
};

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() { }

    create() {
        this.print = this.add.text(0, 0, '');

        var dialog = createDialog(this)
            .layout()
            .on('button.click', function (button, groupName, index, pointer, event) {
                this.print.text += index + ': ' + button.text + '\n';
            }, this)
            .on('button.over', function (button, groupName, index, pointer, event) {
                button.getElement('background').setStrokeStyle(1, 0xffffff);
            })
            .on('button.out', function (button, groupName, index, pointer, event) {
                button.getElement('background').setStrokeStyle();
            })

        this.input.once('pointerdown', function () {
            setDialog(dialog, data).layout();
        });

        this.add.text(0, 580, 'Click to reset buttons');
    }

    update() { }
}

var createDialog = function (scene) {
    return scene.rexUI.add.dialog({
        x: 400,
        y: 300,
        width: 360,

        background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x3e2723),

        title: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x1b0000),
            text: scene.add.text(0, 0, ' ', {
                fontSize: '24px'
            }),
            space: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 10
            }
        }),

        content: scene.add.text(0, 0, ' ', {
            fontSize: '24px'
        }),

        choices: [
            createLabel(scene, ' ', 0x6a4f4b),
            createLabel(scene, ' ', 0x6a4f4b),
            createLabel(scene, ' ', 0x6a4f4b),
            createLabel(scene, ' ', 0x6a4f4b),
            createLabel(scene, ' ', 0x6a4f4b)
        ], // Support 5 choices

        actions: [
            createLabel(scene, 'Submit', 0x1b0000),
        ],

        space: {
            title: 25,
            content: 25,
            choices: 20,
            choice: 15,
            action: 15,

            left: 25,
            right: 25,
            top: 25,
            bottom: 25,
        },

        expand: {
            content: false,  // Content is a pure text object
        }
    });
}
var createLabel = function (scene, text, backgroundColor) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, backgroundColor),

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

var setDialog = function (dialog, config) {
    // Set title
    dialog.getElement('title').text = GetValue(config, 'title', ' ');
    // Set content
    dialog.getElement('content').text = GetValue(config, 'content', ' ');
    // Set choices
    var choiceTextArray = GetValue(config, 'choices', []),
        choiceText;
    var choices = dialog.getElement('choices');
    for (var i = 0, cnt = choices.length; i < cnt; i++) {
        choiceText = choiceTextArray[i];
        if (choiceText != null) {
            dialog.showChoice(i);
            choices[i].text = choiceText;
        } else {
            dialog.hideChoice(i);
        }
    }
    return dialog;
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