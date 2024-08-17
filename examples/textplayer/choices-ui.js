import phaser from 'phaser/src/phaser.js';
import TextPlayerPlugin from '../../plugins/textplayer-plugin.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('dude', 'assets/images/phaser-dude.png');
    }

    create() {
        var content = `
[sprite.dude=dude]
[sprite.dude.x=600]
[sprite.dude.y=300][sprite.dude.y.yoyo=100,300,-1]

Prelogue... Prelogue... Prelogue...[r]

[content.off]
[question=A]Question
    [choice=a,0]Choice0[/choice]
    [choice=a,10]Choice1[/choice]
    [choice=a,3]Choice2[/choice]
[/question]
[content.on]

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
            console.log(question);

            text.pauseTyping();
            var dialog = CreateChoiceDialog(scene, question, function (data) {
                text.resumeTyping();
                console.log(data.value);

                print.text += JSON.stringify(data.value, null, 2) + '\n'                
            })
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

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var CreateChoiceDialog = function (scene, question, onClose) {
    var style = {
        width: 300,
        space: {
            left: 20, right: 20, top: 20, bottom: 20,
            title: 20,
            content: 30,
            choices: 30, choice: 10,
        },

        background: {
            color: COLOR_MAIN,
            strokeColor: COLOR_LIGHT,
            radius: 20,
        },

        title: {
            space: { left: 5, right: 5, top: 5, bottom: 5 },
            text: {
                fontSize: 24
            },
            background: {
                color: COLOR_DARK
            }
        },

        content: {
            space: { left: 5, right: 5, top: 5, bottom: 5 },
            text: {
                fontSize: 20
            },
        },

        choicesType: 'radio',
        choice: {
            space: { left: 10, right: 10, top: 10, bottom: 10 },
            background: {
                color: COLOR_DARK,
                strokeWidth: 0,
                radius: 10,

                'hover.strokeColor': 0xffffff,
                'hover.strokeWidth': 2,
                'active.color': COLOR_LIGHT,
            }
        },

        align: {
            actions: 'right'
        },
    }

    var dialog = scene.rexUI.add.confirmDialog(style)
        .setPosition(400, 300)
        .resetDisplayContent({
            title: question.title,
            content: null,
            choices: question.choices.map(function (option) {
                return { text: option.title, value: option, }
            })
        })
        .layout()
        .modal(onClose)

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
        global: [{
            key: 'rexTextPlayer',
            plugin: TextPlayerPlugin,
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