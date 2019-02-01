import TextPagePlugin from '../../plugins/textpage-plugin.js'
import TextTypingPlugin from '../../plugins/texttyping-plugin.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;

class PageTypingText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, config) {
        super(scene, x, y, text, config);

        this.page = scene.plugins.get('rexTextPage').add(this, GetFastValue(config, 'page', undefined));
        this.typing = scene.plugins.get('rexTextTyping').add(this, GetFastValue(config, 'type', undefined));

        this.typing.on('complete', this.typeNextPage, this);
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
        } else {
            this.emit('complete');
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

    preload() {}

    create() {
        var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.

Phaser is available in two versions: Phaser 3 and Phaser CE - The Community Edition. Phaser CE is a community-lead continuation of the Phaser 2 codebase and is hosted on a separate repo. Phaser 3 is the next generation of Phaser.
        
Along with the fantastic open source community, Phaser is actively developed and maintained by Photon Storm. As a result of rapid support, and a developer friendly API, Phaser is currently one of the most starred game frameworks on GitHub.
        
Thousands of developers from indie and multi-national digital agencies, and universities worldwide use Phaser. You can take a look at their incredible games.
        
Visit: The Phaser website and follow on Twitter (#phaserjs)
Learn: API Docs, Support Forum and StackOverflow
Code: 700+ Examples (source available in this repo)
Read: Weekly Phaser World Newsletter
Chat: Slack and Discord
Extend: With Phaser Plugins
Be awesome: Support the future of Phaser

Grab the source and join the fun!`;

        var txt = new PageTypingText(this, 100, 100, '', {
            wordWrap: {
                width: 500
            },
            maxLines: 7
        });
        this.add.existing(txt);
        txt.once('complete', function () {
            console.log('done');
        }).start(content, 50);

    }

    update() {}
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