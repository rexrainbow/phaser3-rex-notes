import phaser from 'phaser/src/phaser.js';
import QuestPlugin from '../../plugins/quest-plugin.js';

/*
A --> |Z| B
A --> |X| C
B --> |Z| D
B --> |X| E
C --> |Z| F
C --> |X| G
D --> |Z| H
D --> |X| I
E --> |Z| J
E --> |X| K
F --> |Z| L
F --> |X| M
*/

const yamlString = `
key: A
options:
  - next: B
  - next: C
---
key: B
options:
  - next: D
  - next: E
---
key: C
options:
  - next: F
  - next: G
---
key: D
options:
  - next: H
  - next: I
---
key: E
options:
  - next: J
  - next: K
---
key: F
options:
  - next: L
  - next: M
---
key: G
end: true
---
key: H
end: true
---
key: I
end: true
---
key: J
end: true
---
key: K
end: true
---
key: L
end: true
---
key: M
end: true
`;

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
            questions: yamlString,
            format: 'yaml',
            quest: true
        })
            .on('quest', function (question, questionManager, quest) {
                if (question.end) {
                    questionManager.setData('endAt', question.key);
                    questionManager.emit('complete', questionManager, quest); // User defined event
                    return;
                }

                // Show question and options
                var options = question.options;
                this.print.text += `${question.key}: ${options[0].next}(Z), ${options[1].next}(X) ? `;

                // Register input event
                var onKeyDown = function (event) {
                    var keyName = event.key.toUpperCase();
                    if ((keyName === 'Z') ||
                        (keyName === 'X')) {
                        var nextKey = (keyName === 'Z') ? options[0].next : options[1].next;
                        this.print.text += `${nextKey}\n`;
                        questionManager.getNextQuestion(nextKey);
                    } else {
                        // Register input event again
                        this.input.keyboard.once('keydown', onKeyDown);
                    }
                }.bind(this);
                this.input.keyboard.once('keydown', onKeyDown);

            }, this)
            .on('complete', function (questionManager, quest) {
                this.print.text += `End at ${questionManager.getData('endAt')}\n`;
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