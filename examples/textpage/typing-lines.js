import phaser from 'phaser/src/phaser.js';
import TextPagePlugin from '../../plugins/textpage-plugin.js'
import TextTypingPlugin from '../../plugins/texttyping-plugin.js';
import BBCodeText from '../../plugins/bbcodetext.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;

class LineTypingText extends BBCodeText {
    constructor(scene, x, y, text, config) {
        super(scene, x, y, text, config);

        this.page = scene.plugins.get('rexTextPage').add(this, GetFastValue(config, 'page', undefined));
        this.typing = scene.plugins.get('rexTextTyping').add(this, GetFastValue(config, 'type', undefined));

        this.typing.on('complete', this.typeNextLine, this);
    }

    start(text, speed) {
        this.page.setText(text);
        if (speed !== undefined) {
            this.typing.setTypingSpeed(speed);
        }
        this.typeNextLine();
    }

    typeNextLine() {
        if (!this.page.isLastLine) {
            var txt = this.page.getPageOfNextLine();

            var startLineIndex;
            if (this.page.isFirstLine) {
                // Typing from 1st line to page end
                startLineIndex = 0;
            } else {
                startLineIndex = this.page.pageLinesCount - 1;
            }
            this.typing.startFromLine(txt, startLineIndex);

        } else {
            this.emit('complete');
        }
    }

}
// LineTypingText class

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var content = '[color=gray]Phaser is a fast, free, and [color=yellow]fun open source [color=blue]HTML5 game framework that offers [color=brown]WebGL and Canvas rendering across [color=green]desktop and mobile web browsers. [color=blue]Games can be compiled to iOS, [color=red]Android and native apps by using 3rd party tools. [color=green]You can use JavaScript or TypeScript for development.';

        var txt = new LineTypingText(this, 100, 100, '', {
            fontSize: 30,
            wordWrap: {
                width: 500
            },
            maxLines: 3
        });
        this.add.existing(txt);
        txt.once('complete', function () {
            console.log('done');
        }).start(content, 50);

    }

    update() { }
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
            key: 'rexTextPage',
            plugin: TextPagePlugin,
            start: true
        },
        {
            key: 'rexTextTyping',
            plugin: TextTypingPlugin,
            start: true
        }
        ]
    }
};

var game = new Phaser.Game(config);