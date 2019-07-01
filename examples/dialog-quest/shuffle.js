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
            quest: {
                shuffleQuestions: true,
                shuffleOptions: true,
            },
        })
            .on('update-choice', function (choice, option, quest) {
                choice
                    .setText(option.key)
                    .setData('option', option);
            })
            .on('update-dialog', function (dialog, question, quest) {
                dialog.getElement('title').setText(question.key);
                quest
                    .setData('question', question)
                    .setData('option', undefined);
                dialog
                    .clearChoices()
                    .layout();

                print.text += `${question.key}:`;
            })
            .on('click-choice', function (choice, dialog, quest) {
                dialog.clearChoices();
                choice.getElement('background').setStrokeStyle(1, 0xffffff);
                quest.setData('option', choice.getData('option'));
            })
            .on('click-action', function (action, dialog, quest) {
                var question = quest.getData('question');
                var option = quest.getData('option');
                if (option === undefined) {
                    return;
                }
                var isCorrect = (question.answer === option.key);

                // Clear option reference
                quest
                    .setData('question', undefined)
                    .setData('option', undefined);
                dialog.forEachChoice(function (choice) {
                    choice.setData('option', undefined);
                });
                print.text += `${option.key} -> ${(isCorrect) ? 'O' : 'X'}\n`;

                if (!quest.isLast()) {
                    quest.next();
                } else {
                    print.text += 'Done\n';
                    quest.emit('complelte', quest);
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

const Questions = `type,key,answer
q,Q0,A0
,A0,
,A1,
,A2,
q,Q1,A0
,A0,
,A1,
,A2,
q,Q2,A0
,A0,
,A1,
,A2,`;

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