import phaser from 'phaser/src/phaser.js';
import TextPagePlugin from '../../plugins/textpage-plugin.js'
import TextTypingPlugin from '../../plugins/texttyping-plugin.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;

class LineTypingText extends Phaser.GameObjects.Text {
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

            if (this.page.isFirstLine) {
                // Typing from 1st line to page end
                this.typing.start(txt);
            } else {
                var lines = txt.split('\n');
                lines.pop();
                var skipText = lines.join('\n');
                this.typing.start(txt, undefined, skipText.length + 1);
            }
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
        var content = 'Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.';

        var txt = new LineTypingText(this, 100, 100, '', {
            wordWrap: {
                width: 300
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