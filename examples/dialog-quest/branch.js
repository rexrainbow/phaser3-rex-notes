import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import DialogQuest from '../../templates/dialog-quest/DialogQuest.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() { }

    create() {
        var print = this.add.text(0, 0, '');

        var dialog = CreateDialog(this)
            .layout();
        dialog.clearChoices = function () {
            dialog.forEachChoice(function (choice) {
                choice.getElement('background').setStrokeStyle();
            });
            return dialog;
        }

        var quest = new DialogQuest({
            dialog: dialog,
            questions: Questions,
        })
            .on('update-choice', function (choice, option, quest) {
                choice
                    .setText(option.key)
                    .setData('option', option);
            })
            .on('update-dialog', function (dialog, question, quest) {
                dialog.getElement('title').setText(question.key);
                dialog.getElement('actions')[0].setText((question.end) ? 'End' : 'Next');
                quest.setData('nextKey', null);
                dialog
                    .clearChoices()
                    .layout();

                print.text += `${question.key}`;
                if (question.end) {
                    print.text += ' (End)\n';
                }
            })
            .on('click-choice', function (choice, dialog, quest) {
                dialog.clearChoices();
                choice.getElement('background').setStrokeStyle(1, 0xffffff);
                quest.setData('option', choice.getData('option'));
            })
            .on('click-action', function (action, dialog, quest) {
                if (action.text === 'Next') {
                    var option = quest.getData('option');
                    var nextKey = option.next;
                    var optionKey = option.key;
                    print.text += ` --> |${optionKey}| ${nextKey}\n`;

                    // Clear option reference
                    quest.setData('option', undefined);
                    dialog.forEachChoice(function (choice) {
                        choice.setData('option', undefined);
                    });

                    // Next question
                    if (nextKey !== null) {
                        quest.next(nextKey);
                    } else {
                        quest.emit('complete', quest);
                    }
                }
            })
            .start();
    }

    update() { }
}

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var CreateDialog = function (scene) {
    return scene.rexUI.add.dialog({
        x: scene.cameras.main.width / 2,
        y: scene.cameras.main.height / 2,
        width: 360,

        background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, COLOR_PRIMARY),

        title: CreateTitle(scene, ' ', COLOR_DARK),

        content: scene.add.text(0, 0, ' ', {
            fontSize: '24px'
        }),

        choices: [
            CreateButton(scene, ' ', COLOR_LIGHT),
            CreateButton(scene, ' ', COLOR_LIGHT),
            CreateButton(scene, ' ', COLOR_LIGHT),
            CreateButton(scene, ' ', COLOR_LIGHT),
            CreateButton(scene, ' ', COLOR_LIGHT)
        ], // Support 5 choices

        actions: [
            CreateButton(scene, 'Next', COLOR_DARK),
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

var CreateTitle = function (scene, text, backgroundColor) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, backgroundColor),
        text: scene.add.text(0, 0, text, {
            fontSize: '24px'
        }),
        space: {
            left: 15,
            right: 15,
            top: 10,
            bottom: 10
        }
    });
};

var CreateButton = function (scene, text, backgroundColor) {
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

/*
A --> |R| B
A --> |L| C
B --> |R| D
B --> |L| E
C --> |R| F
C --> |L| G
D --> |R| H
D --> |L| I
E --> |R| J
E --> |L| K
F --> |R| L
F --> |L| M
*/

const Questions = `type,key,next,end
q,A,,
,R,B,
,L,C,
q,B,,
,R,D,
,L,E,
q,C,,
,R,F,
,L,G,
q,D,,
,R,H,
,L,I,
q,E,,
,R,J,
,L,K,
q,F,,
,R,L,
,L,M,
q,G,,1
q,H,,1
q,I,,1
q,J,,1
q,K,,1
q,L,,1
q,M,,1`;

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