import 'phaser';
import QuestPlugin from '../../plugins/quest-plugin.js';

const csvString = `type,name
q,Q0
,Z
,X
,C
q,Q1
,Z
,X
,C
q,Q2
,Z
,X
,C`;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.txt;
    }

    preload() { }

    create() {
        this.print = this.add.text(0, 0, '');

        this.plugins.get('rexQuest').add({
            questions: csvString,
            quest: {
                shuffleQuestions: true,
                shuffleOptions: true,
            }
        })
            .on('quest', function (question, questionManager, quest) {
                // Show question and options
                var options = question.options;
                this.print.text += `${question.name}:${options[0].name}, ${options[1].name}, ${options[2].name} ? `;

                // Register input event
                var onKeyDown = function (event) {
                    var keyName = event.key.toUpperCase();
                    if ((keyName === 'Z') ||
                        (keyName === 'X') ||
                        (keyName === 'C')) {
                        this.print.text += keyName + '\n';
                        questionManager.setData(question.name, keyName);

                        if (questionManager.isLastQuestion()) {
                            this.print.text += JSON.stringify(questionManager.getData()) + '\n';
                            questionManager.emit('complete', questionManager, quest); // User defined event
                        } else {
                            questionManager.getNextQuestion();
                        }
                    } else {
                        // Register input event again
                        this.input.keyboard.once('keydown', onKeyDown);
                    }
                }.bind(this);
                this.input.keyboard.once('keydown', onKeyDown);

            }, this)
            .on('complete', function (questionManager, quest) {
                console.log(quest.getData());
            }, this)
            .getNextQuestion();
    }

    update() {
    }
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
        global: [{
            key: 'rexQuest',
            plugin: QuestPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);