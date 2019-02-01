import BBCodeText from '../../plugins/bbcodetext.js';
import TextPage from '../../plugins/textpage.js'
import TextTyping from '../../plugins/texttyping.js';

const BaseTextClass = BBCodeText;
const GetValue = Phaser.Utils.Objects.GetValue;

class PageTypingText extends BaseTextClass {
    constructor(scene, x, y, text, config) {
        super(scene, x, y, text, config);
        scene.add.existing(this);

        this.page = new TextPage(this, GetValue(config, 'page', undefined));
        this.typing = new TextTyping(this, GetValue(config, 'type', undefined));

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
        var content = `[b][i][size=24][color=red]Phaser[/color] is a [color=yellow]fast[/color], [color=pink]free[/color], and [color=green]fun[/color] open source HTML5 game framework[/size][/b][/i] [size=20]that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.

[color=red]Phaser[/color] is available in two versions: [color=yellow]Phaser 3[/color] and [color=blue]Phaser CE[/color] - The Community Edition. [color=blue]Phaser CE[/color] is a community-lead continuation of the [color=blue]Phaser 2[/color] codebase and is hosted on a separate repo. [color=yellow]Phaser 3[/color] is the next generation of [color=red]Phaser[/color].
        
Along with the fantastic open source community, [color=red]Phaser[/color] is actively developed and maintained by Photon Storm. As a result of rapid support, and a developer friendly API, [color=red]Phaser[/color] is currently one of the most starred game frameworks on GitHub.
        
Thousands of developers from indie and multi-national digital agencies, and universities worldwide use [color=red]Phaser[/color]. You can take a look at their incredible games.
        
Visit: The [color=red]Phaser[/color] website and follow on Twitter (#phaserjs)
Learn: API Docs, Support Forum and StackOverflow
Code: 700+ Examples (source available in this repo)
Read: Weekly [color=red]Phaser[/color] World Newsletter
Chat: Slack and Discord
Extend: With [color=red]Phaser[/color] Plugins
Be awesome: Support the future of [color=red]Phaser[/color]

Grab the source and join the fun!`;

        var txt = new PageTypingText(this, 100, 100, '', {
            fontSize: '24px',
            wrap: {
                mode: 'word',
                width: 500
            },
            maxLines: 7,
            page: {
                //wrap: false
            }
        });

        txt
            .once('complete', function () {
                console.log('done');
            })
            .start(content, 50);

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
    scene: Demo
};

var game = new Phaser.Game(config);