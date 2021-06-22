import 'phaser';
import TextPagePlugin from '../../plugins/textpage-plugin.js'
import TextTypingPlugin from '../../plugins/texttyping-plugin.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;

class PageTypingText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, config) {
        super(scene, x, y, text, config);

        this.page = scene.plugins.get('rexTextPage').add(this, GetFastValue(config, 'page', undefined));
        this.typing = scene.plugins.get('rexTextTyping').add(this, GetFastValue(config, 'type', undefined));

        this.typing.on('complete', this.typeNextPage, this);

        this.contents = [];
    }

    start(text, speed) {
        this.page.setText(text);
        if (speed !== undefined) {
            this.typing.setTypeSpeed(speed);
        }
        this.typeNextPage();
    }

    typeNextPage() {
        if (!this.page.isLastPage) {
            var txt = this.page.getNextPage();
            this.typing.start(txt);
        } else if (this.contents.length === 0) {
            this.emit('complete');
        }
    }

    appendContent(content, speed) {
        this.contents.push([content, speed]);
        if (!this.typing.isTyping) {
            this.startNext();
        }
    }

    startNext() {
        if (this.contents.length > 0) {
            var cmd = this.contents.shift();
            this.start(cmd[0], cmd[1]);
        }
    }

}
// PageTypingText class

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var txt = new PageTypingText(this, 100, 100, '', {
            wordWrap: {
                width: 500
            },
            maxLines: 7
        });
        this.add.existing(txt);

        txt.appendContent('hellohellohello', 50);
        txt.appendContent('worldworldworld', 100);
        txt.appendContent('goodbye', 300);
        txt.setInteractive().on('pointerup', function () {
            txt.startNext()
        })
        txt.once('complete', function () {
            console.log('done');
        })
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