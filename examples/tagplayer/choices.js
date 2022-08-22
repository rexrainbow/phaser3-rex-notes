import Phaser from 'phaser/src/phaser.js';
import TagPlayerPlugin from '../../plugins/tagplayer-plugin.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

var content = `
[question=A]Question
    [choice=a,0]Choice0[/choice]
    [choice=a,10]Choice1[/choice]
    [choice=a,3]Choice2[/choice]
[/question]
`

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var tagPlayer = this.plugins.get('rexTagPlayerPlugin').add(this, {
            sprites: false,
            texts: false,
        });

        OnQuestionTag(tagPlayer);

        tagPlayer
            .on('question', function (question) {
                console.log(question);
            })
            .play(content)

    }

    update() { }
}

var OnQuestionTag = function (tagPlayer) {
    var question;
    var lastChoice;

    tagPlayer
        // Build question
        .on('+question', function (parser, id) {
            question = {
                id: id,
                choices: []
            };

            tagPlayer.setContentCallback(function (content) {
                question.title = content.trimEnd();
            })
        })
        .on('-question', function (parser) {
            if (!question) {
                return
            }

            tagPlayer.setContentCallback();
            tagPlayer.emit('question', question);
            question = undefined;
        })
        // Build question.choices
        .on('+choice', function (parser, key, value) {
            if (!question) {
                return
            }

            lastChoice = {
                key: key,
                value: value,
            };
            question.choices.push(lastChoice);

            tagPlayer.setContentCallback(function (content) {
                lastChoice.title = content.trimEnd();
            })
        })
        .on('-choice', function (parser) {
            if (!lastChoice) {
                return
            }

            tagPlayer.setContentCallback();
            lastChoice = undefined;
        })


    return tagPlayer;

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
            key: 'rexTagPlayerPlugin',
            plugin: TagPlayerPlugin,
            start: true
        }],
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);