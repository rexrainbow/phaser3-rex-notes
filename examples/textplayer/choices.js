import phaser from 'phaser/src/phaser.js';
import TextPlayerPlugin from '../../plugins/textplayer-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var content = `
Prelogue... Prelogue... Prelogue...[r]

[question=A]Question
    [choice=a,0]Choice0[/choice]
    [choice=a,10]Choice1[/choice]
    [choice=a,3]Choice2[/choice]
[/question]

Postlogue... Postlogue... Postlogue...
`

        var text = this.add.rexTextPlayer(
            {
                x: 400, y: 450,
                width: 600, height: 200,  // Fixed width and height

                background: {
                    stroke: 'white',
                    cornerRadius: 20
                },

                innerBounds: {
                    stroke: '#A52A2A'
                },

                padding: 20,

                style: {
                    fontSize: '16px',
                    stroke: 'green',
                    strokeThickness: 3,

                    shadowColor: 'red',
                    shadowOffsetX: 5,
                    shadowOffsetY: 5,
                    shadowBlur: 3
                },

                wrap: {
                    maxLines: 5,
                    padding: { bottom: 10 },
                },

                typing: {
                    speed: 30,  // 0: no-typing
                },

                clickTarget: this,
                nextPageInput: 'click|2000'
            }
        )

        // Parse custom tag, execute custom tag
        OnParseQuestionTag(text);

        var print = this.add.text(0, 0, '');
        var scene = this;
        text.on('question', function (question) {
            print.text += JSON.stringify(question, null, 2) + '\n'
            // Popup dialog for this question data

            // Wait for input
            text.pauseTyping();
            print.text += 'Pause, wait pointerdown\n';
            scene.input.once('pointerdown', function () {
                text.resume();
                print.text += 'Resume\n';
            });
        })


        text.play(content);
    }

    update() { }
}

var OnParseQuestionTag = function (textPlayer) {
    var question;
    var lastChoice;

    textPlayer
        // Build question
        .on('parser.+question', function (parser, id) {
            // Content between [question]...[/question] will be ignored
            parser.setContentOutputEnable(false);
            question = {
                id: id,
                choices: []
            };
        })
        .on('parser.+question#content', function (parser, content) {
            if (!question) {
                return
            }

            question.title = content.trimEnd();
        })
        .on('parser.-question', function (parser, param) {
            parser.setContentOutputEnable(true);
            if (!question) {
                return
            }

            // Pass question to 'tag.-question' event            
            param.push(question);
            question = undefined;
        })
        .on('tag.-question', function (question) {
            // Execute [/question] tag
            textPlayer.emit('question', question);
        })

        // Build question.choices
        .on('parser.+choice', function (parser, key, value) {
            if (!question) {
                return
            }

            lastChoice = {
                key: key,
                value: value,
            }
        })
        .on('parser.+choice#content', function (parser, content) {
            if (!lastChoice) {
                return
            }

            lastChoice.title = content.trimEnd();
        })
        .on('parser.-choice', function (parser) {
            if (!lastChoice) {
                return
            }

            question.choices.push(lastChoice);
            lastChoice = undefined;
        })


    return textPlayer;

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
            key: 'rexTextPlayer',
            plugin: TextPlayerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);