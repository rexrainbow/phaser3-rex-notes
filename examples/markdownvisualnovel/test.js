import phaser from 'phaser/src/phaser.js';
import MarkdownVisualNovelPlugin from '../../templates/markdownvisualnovel/markdownvisualnovel-plugin.js';

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.text('eventSheet0', 'assets/markedeventsheet/command-executor/command-executor.md');

        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.image('road', 'assets/images/backgrounds/road.png');

        this.load.image('nextPage', 'assets/images/arrow-down-left.png');

        this.load.atlas('characters', 'assets/images/characters/characters.png', 'assets/images/characters/characters.json');

        this.load.audio('theme0', [
            'assets/audio/oedipus_wizball_highscore.ogg',
            'assets/audio/oedipus_wizball_highscore.mp3'
        ]);
        this.load.audio('theme1', [
            'assets/audio/jungle.ogg',
            'assets/audio/jungle.mp3'
        ]);
        this.load.audio('explosion', [
            'assets/audio/soundeffect/explosion.mp3'
        ]);
    }

    create() {
        var print = this.add.text(0, 570, '', { fontSize: 20, backgroundColor: 'grey' }).setDepth(100);
        print.text = 'Any click to start';

        var eventSheetManager = this.plugins.get('rexMarkdownVisualNovel').add(this, {
            styles: {
                TEXTBOX: TextBoxStyle,
                CHOICE: ChoiceStyle,
            }
        })
            .addEventSheet(this.cache.text.get('eventSheet0'))

        eventSheetManager
            .on('pause.input', function () {
                print.text = 'Wait any click to continue';
            })
            .on('resume.input', function () {
                print.text = '';
            })
            .on('complete', function () {
                print.text = 'Complete';
                console.log(eventSheetManager.memory)
            })

        this.input.once('pointerdown', function () {
            print.text = '';
            eventSheetManager.start();
        })

    }

    update() { }
}

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var TextBoxStyle = {
    space: {
        innerLeft: 20, innerRight: 20, innerTop: 20, innerBottom: 20,

        titleLeft: 40,
        icon: 10, text: 10,
    },

    innerBackground: { color: COLOR_MAIN, strokeColor: COLOR_LIGHT, strokeWidth: 2, radius: 20, },

    icon: { width: 120, height: 120, color: COLOR_DARK },

    action: { tint: COLOR_LIGHT, alpha: 0, },

    text: { fontSize: 30, maxLines: 4 },

    title: {
        $type: 'label',

        width: 200,
        space: {
            left: 10, right: 10, top: 10, bottom: 10,
            icon: 10,
            text: 10,
        },

        background: {
            radius: { tl: 10, tr: 10 },
            color: COLOR_DARK,
            strokeColor: COLOR_LIGHT, strokeWidth: 2
        },
        text: { fontSize: 36 },

        icon: null,
        action: null,

        align: 'center',
        alpha: 0,
    }
}

var ChoiceStyle = {
    space: {
        left: 20, right: 20, top: 20, bottom: 20,
        title: 20,
        content: 30,
        choices: 30, choice: 10,
    },

    background: { color: COLOR_MAIN, strokeColor: COLOR_LIGHT, radius: 20, },

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
            key: 'rexMarkdownVisualNovel',
            plugin: MarkdownVisualNovelPlugin,
            start: true
        }],
    }
};

var game = new Phaser.Game(config);